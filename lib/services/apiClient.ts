import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// API Base Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://university-portal-backend-1.onrender.com/api/v1';

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage or cookie
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Set default Authorization header from existing token
if (typeof window !== 'undefined') {
  const existingToken = localStorage.getItem('auth_token');
  if (existingToken) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`;
  }
}

// Small client used for refresh calls (no interceptors)
const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // in case backend uses httpOnly refresh cookies
});

// Refresh handling queue
let isRefreshing = false;
let refreshSubscribers: Array<(token: string | null) => void> = [];

const subscribeTokenRefresh = (cb: (token: string | null) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string | null) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

// Response interceptor - Handle responses, refresh tokens, and retry failed requests
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Response] ${response.config.url}`, response.data);
    }

    return response;
  },
  (error: AxiosError<ApiError>) => {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[API Error] ${error.config?.url}`, {
        status: error.response?.status,
        data: error.response?.data,
      });
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle responses with a server response
    if (error.response) {
      const status = error.response.status;
      const statusText = error.response.statusText;
      const errorData = error.response.data;

      // Handle Unauthorized with automatic refresh + retry
      if (status === 401) {
        // Avoid infinite loop if refresh endpoint itself returns 401
        if (originalRequest && originalRequest.url && originalRequest.url.includes('/auth/refresh-token')) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            window.dispatchEvent(new CustomEvent('auth:unauthorized'));
          }
          return Promise.reject(errorData || { success: false, error: { code: 'HTTP_401', message: 'Unauthorized' } });
        }

        // If we've already retried this request, do not attempt again
        if (originalRequest && originalRequest._retry) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            window.dispatchEvent(new CustomEvent('auth:unauthorized'));
          }
          return Promise.reject(errorData || { success: false, error: { code: 'HTTP_401', message: 'Unauthorized' } });
        }

        // Queue requests while refreshing
        if (originalRequest) {
          originalRequest._retry = true;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              subscribeTokenRefresh((token) => {
                if (token) {
                  originalRequest.headers = originalRequest.headers || {};
                  (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
                  resolve(apiClient.request(originalRequest));
                } else {
                  reject(error);
                }
              });
            });
          }

          isRefreshing = true;

          return new Promise((resolve, reject) => {
            // Try to read refresh token stored locally (if backend returns it in login response)
            const storedRefresh = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;

            refreshClient
              .post<ApiResponse<{ token: string }>>('/auth/refresh-token', { refreshToken: storedRefresh })
              .then((res) => {
                // Safely extract token from different possible response shapes
                const responseData = res?.data as ApiResponse<{ token?: string }> | undefined;
                const newToken = responseData?.data?.token ?? (res?.data as unknown as { token?: string })?.token;

                if (res && res.data && newToken) {
                  // Persist token and update default header
                  setAuthToken(newToken);
                  onRefreshed(newToken);

                  // Retry original request with new token
                  originalRequest.headers = originalRequest.headers || {};
                  (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${newToken}`;
                  resolve(apiClient.request(originalRequest));
                } else {
                  // Refresh failed - notify app to log out
                  onRefreshed(null);
                  removeAuthToken();
                  removeRefreshToken();
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('auth:unauthorized'));
                  }
                  reject(error);
                }
              })
              .catch((err) => {
                onRefreshed(null);
                removeAuthToken();
                removeRefreshToken();
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('auth:unauthorized'));
                }
                reject(err);
              })
              .finally(() => {
                isRefreshing = false;
              });
          });
        }
      }

      // Other status codes handling (preserve original behavior)
      switch (status) {
        case 403:
          // Forbidden - show error
          console.error('Access forbidden:', errorData?.error?.message);
          break;

        case 404:
          // Not found
          console.error('Resource not found:', errorData?.error?.message);
          break;

        case 422:
          // Validation error
          console.error('Validation error:', errorData?.error?.details);
          break;

        case 500:
          // Server error
          console.error('Server error:', errorData?.error?.message);
          break;

        default:
          console.error('API Error:', errorData?.error?.message);
      }

      const fallbackError: ApiError = {
        success: false,
        error: {
          code: `HTTP_${status}`,
          message:
            (errorData && typeof errorData === 'object' && 'message' in errorData
              ? String((errorData as { message: string }).message)
              : undefined) ||
            errorData?.error?.message ||
            statusText ||
            'Request failed',
          details: errorData?.error?.details,
        },
      };

      return Promise.reject(errorData || fallbackError);
    } else if (error.request) {
      // Request made but no response
      console.error('No response from server');
      return Promise.reject({
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Unable to connect to server. Please check your internet connection.',
        },
      });
    } else {
      // Something else happened
      console.error('Request error:', error.message);
      return Promise.reject({
        success: false,
        error: {
          code: 'REQUEST_ERROR',
          message: error.message,
        },
      });
    }
  }
);

// Helper functions for common HTTP methods
export const api = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    return apiClient.get(url, config).then((res: AxiosResponse<ApiResponse<T>>) => res.data);
  },

  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    return apiClient.post(url, data, config).then((res: AxiosResponse<ApiResponse<T>>) => res.data);
  },

  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    return apiClient.put(url, data, config).then((res: AxiosResponse<ApiResponse<T>>) => res.data);
  },

  patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    return apiClient.patch(url, data, config).then((res: AxiosResponse<ApiResponse<T>>) => res.data);
  },

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    return apiClient.delete(url, config).then((res: AxiosResponse<ApiResponse<T>>) => res.data);
  },
};

// Auth token management
export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Refresh token management (stored locally unless using httpOnly cookies)
export const setRefreshToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('refresh_token', token);
  }
};

export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refresh_token');
  }
  return null;
};

export const removeRefreshToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('refresh_token');
  }
};

export default apiClient;
