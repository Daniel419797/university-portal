import { api } from './apiClient';
import apiClient from './apiClient';

// File upload types
export interface UploadFileRequest {
  file: string; // base64
  type: 'assignment' | 'material' | 'profile' | 'document';
}

export interface UploadFileResponse {
  fileId: string;
  url: string;
  size: number;
}

// Notification types
export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

// File Service
export const fileService = {
  /**
   * Upload a file
   */
  async uploadFile(data: UploadFileRequest): Promise<UploadFileResponse> {
    const response = await api.post<UploadFileResponse>('/files/upload', data);
    return response.data;
  },

  /**
   * Download a file
   */
  async downloadFile(fileId: string): Promise<Blob> {
    const response = await apiClient.get(`/files/${fileId}`, {
      responseType: 'blob',
    });
    return response.data as Blob;
  },

  /**
   * Delete a file
   */
  async deleteFile(fileId: string): Promise<void> {
    await api.delete(`/files/${fileId}`);
  },

  /**
   * Convert file to base64
   */
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        // Remove data URL prefix
        const base64Data = base64.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  },

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(files: File[], type: UploadFileRequest['type']): Promise<UploadFileResponse[]> {
    const uploadPromises = files.map(async (file) => {
      const base64 = await this.fileToBase64(file);
      return this.uploadFile({ file: base64, type });
    });

    return Promise.all(uploadPromises);
  },
};

// Notification Service
export const notificationService = {
  /**
   * Get all notifications
   */
  async getNotifications(params?: { page?: number; limit?: number; type?: string }): Promise<{ notifications: Notification[]; total: number; unreadCount: number }> {
    const response = await api.get<{ notifications: Notification[]; total: number; unreadCount: number }>('/notifications', { params });
    return response.data;
  },

  /**
   * Get notification by ID
   */
  async getNotificationById(notificationId: string): Promise<Notification> {
    const response = await api.get<Notification>(`/notifications/${notificationId}`);
    return response.data;
  },

  /**
   * Get unread notification count
   */
  async getUnreadCount(): Promise<number> {
    const response = await api.get<{ count: number }>('/notifications/unread-count');
    return response.data.count;
  },

  /**
   * Get recent notifications
   */
  async getRecentNotifications(limit: number = 10): Promise<Notification[]> {
    const response = await api.get<Notification[]>('/notifications/recent', { params: { limit } });
    return response.data;
  },

  /**
   * Get unread notifications count (alternative endpoint)
   */
  async getUnreadCountAlt(): Promise<number> {
    const response = await api.get<{ count: number }>('/notifications/unread/count');
    return response.data.count;
  },

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<void> {
    await api.put(`/notifications/${notificationId}/read`);
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<void> {
    await api.put('/notifications/read-all');
  },

  /**
   * Delete notification
   */
  async deleteNotification(notificationId: string): Promise<void> {
    await api.delete(`/notifications/${notificationId}`);
  },

  /**
   * Clear read notifications
   */
  async clearReadNotifications(): Promise<void> {
    await api.delete('/notifications/clear-read');
  },
};

// Export all shared services
const sharedServices = {
  fileService,
  notificationService,
};

export default sharedServices;
