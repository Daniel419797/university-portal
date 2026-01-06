import { api, ApiResponse } from './apiClient';
import { User } from '@/lib/types';

// User service types
export interface UpdateProfileRequest {
  // Basic Information
  firstName?: string;
  lastName?: string;
  
  // Contact Information
  phoneNumber?: string;
  address?: string;
  
  // Personal Information
  dateOfBirth?: string; // ISO date string
  nationality?: string;
  stateOfOrigin?: string;
  bloodGroup?: string;
  
  // Emergency Contact (as nested object)
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
  
  // Profile
  avatar?: string;
  bio?: string; // If the API supports it
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface DeactivateAccountRequest {
  password: string;
  reason: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  language: string;
  twoFactorEnabled: boolean;
  notifyAssignments: boolean;
  notifyResults: boolean;
  notifyMessages: boolean;
  notifyPayments: boolean;
  compactMode: boolean;
  showAnimations: boolean;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  students: number;
  lecturers: number;
  admins: number;
  hods: number;
  bursaryStaff: number;
}

export interface SearchUsersRequest {
  query?: string;
  role?: string;
  department?: string;
  level?: string;
  page?: number;
  limit?: number;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  department?: string;
  level?: string;
  phoneNumber?: string;
  isActive?: boolean;
}

export interface ChangeUserPasswordRequest {
  newPassword: string;
}

export interface ActivateUserRequest {
  isActive: boolean;
}

export interface ChangeUserRoleRequest {
  role: string;
}

// User Service
export const userService = {
  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    const response = await api.get<User>('/users/profile');
    
    // Update local storage with fresh user data
    if (response.success && typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  },

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    const response = await api.put<User>('/users/profile', data);
    
    // Update local storage
    if (response.success && typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  },

  /**
   * Change password
   */
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await api.put('/users/password', data);
  },

  /**
   * Deactivate account
   */
  async deactivateAccount(data: DeactivateAccountRequest): Promise<void> {
    await api.delete('/users/account', { data });
    
    // Clear local storage after deactivation
    if (typeof window !== 'undefined') {
      localStorage.clear();
      window.location.href = '/login';
    }
  },

  /**
   * Get user settings
   */
  async getSettings(): Promise<UserSettings> {
    const response = await api.get<UserSettings>('/settings');
    return response.data;
  },

  /**
   * Update user settings
   */
  async updateSettings(data: Partial<UserSettings>): Promise<UserSettings> {
    const response = await api.put<UserSettings>('/settings', data);
    return response.data;
  },

  /**
   * Search users
   */
  async searchUsers(params: SearchUsersRequest): Promise<{ users: User[]; total: number; page: number; limit: number }> {
    const response = await api.get<{ users: User[]; total: number; page: number; limit: number }>('/users/search', { params });
    return response.data;
  },

  /**
   * Get user statistics overview
   */
  async getUserStats(): Promise<UserStats> {
    const response = await api.get<UserStats>('/users/stats/overview');
    return response.data;
  },

  /**
   * Get students by department
   */
  async getStudentsByDepartment(departmentId: string, params?: { page?: number; limit?: number }): Promise<{ students: User[]; total: number; page: number; limit: number }> {
    const response = await api.get<{ students: User[]; total: number; page: number; limit: number }>(`/users/students/by-department/${departmentId}`, { params });
    return response.data;
  },

  /**
   * Get all users
   */
  async getUsers(params?: { page?: number; limit?: number; role?: string; department?: string }): Promise<{ users: User[]; total: number; page: number; limit: number }> {
    const response = await api.get<{ users: User[]; total: number; page: number; limit: number }>('/users', { params });
    return response.data;
  },

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User> {
    const response = await api.get<User>(`/users/${userId}`);
    return response.data;
  },

  /**
   * Update user by ID
   */
  async updateUserById(userId: string, data: UpdateUserRequest): Promise<User> {
    const response = await api.put<User>(`/users/${userId}`, data);
    return response.data;
  },

  /**
   * Delete user by ID
   */
  async deleteUserById(userId: string): Promise<void> {
    await api.delete(`/users/${userId}`);
  },

  /**
   * Update user avatar
   */
  async updateUserAvatar(userId: string, avatar: string): Promise<User> {
    const response = await api.put<User>(`/users/${userId}/avatar`, { avatar });
    return response.data;
  },

  /**
   * Change user password (admin)
   */
  async changeUserPassword(userId: string, data: ChangeUserPasswordRequest): Promise<void> {
    await api.put(`/users/${userId}/password`, data);
  },

  /**
   * Activate/deactivate user
   */
  async activateUser(userId: string, data: ActivateUserRequest): Promise<User> {
    const response = await api.put<User>(`/users/${userId}/activate`, data);
    return response.data;
  },

  /**
   * Change user role
   */
  async changeUserRole(userId: string, data: ChangeUserRoleRequest): Promise<User> {
    const response = await api.put<User>(`/users/${userId}/role`, data);
    return response.data;
  },
};

export default userService;
