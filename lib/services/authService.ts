import { api, setAuthToken, removeAuthToken, setRefreshToken, getRefreshToken, removeRefreshToken } from './apiClient';
import { User } from '@/lib/types';

// Auth request/response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  message?: string;
}

type NormalizedAuth = {
  success: boolean;
  message?: string;
  token?: string;
  accessToken?: string;
  user?: User;
  data?: {
    token?: string;
    accessToken?: string;
    user?: User;
  };
};

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  department?: string;
  level?: string;
  matricNumber?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}

// Auth Service
export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<unknown>('/auth/login', credentials);
    const resp = response as NormalizedAuth;

    const token = resp.accessToken ?? resp.token ?? resp.data?.accessToken ?? resp.data?.token;
    const user = resp.user ?? resp.data?.user;

    if (response.success && token && user) {
      setAuthToken(token);
      // Persist refresh token if returned by backend
      const refresh = (resp as unknown as { refreshToken?: string; refresh_token?: string; data?: { refreshToken?: string; refresh_token?: string } }).refreshToken ?? (resp as unknown as { data?: { refreshToken?: string; refresh_token?: string } }).data?.refreshToken ?? (resp as unknown as { refresh_token?: string }).refresh_token ?? (resp as unknown as { data?: { refresh_token?: string } }).data?.refresh_token;

      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
        if (refresh) {
          setRefreshToken(refresh);
        }
      }
      return { token, user, message: response.message };
    }

    throw new Error(response.message || 'Login failed');
  },

  /**
   * Register new user
   */
  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await api.post<unknown>('/auth/register', data);
    const resp = response as NormalizedAuth;

    const token = resp.accessToken ?? resp.token ?? resp.data?.accessToken ?? resp.data?.token;
    const user = resp.user ?? resp.data?.user;

    if (response.success && token && user) {
      setAuthToken(token);
      // Persist refresh token if returned by backend
      const refresh = (resp as unknown as { refreshToken?: string; refresh_token?: string; data?: { refreshToken?: string; refresh_token?: string } }).refreshToken ?? (resp as unknown as { data?: { refreshToken?: string; refresh_token?: string } }).data?.refreshToken ?? (resp as unknown as { refresh_token?: string }).refresh_token ?? (resp as unknown as { data?: { refresh_token?: string } }).data?.refresh_token;

      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
        if (refresh) {
          setRefreshToken(refresh);
        }
      }
      return { token, user, message: response.message };
    }

    throw new Error(response.message || 'Registration failed');
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      // Clear local storage regardless of API response
      removeAuthToken();
      removeRefreshToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  },

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<{ token: string }> {
    const refreshToken = getRefreshToken();
    const response = await api.post<{ token: string }>('/auth/refresh-token', { refreshToken });

    if (response.success && response.data.token) {
      setAuthToken(response.data.token);
      // if the backend returns a renewed refresh token, persist it
      const maybeRefresh = (response as unknown as { data?: { refreshToken?: string }; refreshToken?: string })?.data?.refreshToken ?? (response as unknown as { data?: { refresh_token?: string }; refresh_token?: string })?.data?.refresh_token ?? (response as unknown as { refreshToken?: string })?.refreshToken ?? null;
      if (maybeRefresh) {
        setRefreshToken(maybeRefresh);
      }
    } else {
      // If refresh failed, clean up stored tokens
      removeAuthToken();
      removeRefreshToken();
    }

    return response.data;
  },

  /**
   * Request password reset
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await api.post('/auth/forgot-password', data);
  },

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await api.post('/auth/reset-password', data);
  },

  /**
   * Verify email with token
   */
  async verifyEmail(data: VerifyEmailRequest): Promise<void> {
    await api.post('/auth/verify-email', data);
  },

  /**
   * Resend verification email
   */
  async resendVerificationEmail(data: ResendVerificationRequest): Promise<void> {
    await api.post('/auth/resend-verification', data);
  },

  /**
   * Get current authenticated user info
   */
  async getMe(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (error) {
          console.error('Error parsing user data:', error);
          return null;
        }
      }
    }
    return null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('user');
      return !!(token && user);
    }
    return false;
  },
};

export default authService;
