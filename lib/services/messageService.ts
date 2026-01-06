import { api } from './apiClient';
import { Message } from '../types';

// Types
export interface SendMessageRequest {
  recipientId: string;
  subject: string;
  body: string;
}

const messageService = {
  // Get unread messages count
  async getUnreadCount(): Promise<number> {
    const response = await api.get<{ count: number }>('/messages/unread/count');
    return response.data.count;
  },

  // Get all messages
  async getMessages(params?: { page?: number; limit?: number }): Promise<{ messages: Message[]; total: number }> {
    const response = await api.get<{ messages: Message[]; total: number }>('/messages', { params });
    return response.data;
  },

  // Send a message
  async sendMessage(data: SendMessageRequest): Promise<Message> {
    const response = await api.post<Message>('/messages', data);
    return response.data;
  },

  // Get message by ID
  async getMessage(id: string): Promise<Message> {
    const response = await api.get<Message>(`/messages/${id}`);
    return response.data;
  },

  // Delete message
  async deleteMessage(id: string): Promise<void> {
    await api.delete(`/messages/${id}`);
  },

  // Mark message as read
  async markAsRead(id: string): Promise<void> {
    await api.put(`/messages/${id}/read`);
  },
};

export default messageService;