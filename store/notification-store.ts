import { create } from "zustand";
import {
  notificationService,
  type Notification,
} from "@/lib/services";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error?: string;
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  removeNotification: (id: string) => Promise<void>;
  clearAll: () => void;
}

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Failed to load notifications";

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: undefined,

  fetchNotifications: async () => {
    set({ loading: true, error: undefined });
    try {
      const data = await notificationService.getNotifications();
      const list = Array.isArray(data) ? data : [];
      const unread = list.filter((n) => !n.isRead).length;
      set({ notifications: list, unreadCount: unread, loading: false });
    } catch (error) {
      set({ loading: false, error: getErrorMessage(error) });
    }
  },

  fetchUnreadCount: async () => {
    try {
      const count = await notificationService.getUnreadCount();
      set({ unreadCount: count });
    } catch (error) {
      set({ error: getErrorMessage(error) });
    }
  },

  markAsRead: async (id) => {
    const { notifications, unreadCount } = get();
    const wasUnread = notifications.some((n) => n.id === id && !n.isRead);

    set({
      notifications: notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: wasUnread ? Math.max(0, unreadCount - 1) : unreadCount,
    });

    try {
      await notificationService.markAsRead(id);
    } catch (error) {
      set({ notifications, unreadCount, error: getErrorMessage(error) });
    }
  },

  markAllAsRead: async () => {
    const { notifications } = get();
    const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);

    set({
      notifications: notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    });

    try {
      await Promise.all(unreadIds.map((id) => notificationService.markAsRead(id)));
    } catch (error) {
      set({ notifications, unreadCount: unreadIds.length, error: getErrorMessage(error) });
    }
  },

  removeNotification: async (id) => {
    const { notifications, unreadCount } = get();
    const wasUnread = notifications.some((n) => n.id === id && !n.isRead);
    const updated = notifications.filter((n) => n.id !== id);

    set({
      notifications: updated,
      unreadCount: wasUnread ? Math.max(0, unreadCount - 1) : unreadCount,
    });

    try {
      await notificationService.deleteNotification(id);
    } catch (error) {
      set({ notifications, unreadCount, error: getErrorMessage(error) });
    }
  },

  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));
