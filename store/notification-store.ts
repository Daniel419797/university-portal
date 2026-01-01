import { create } from "zustand";
import { Notification } from "@/lib/types";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    {
      id: "1",
      userId: "1",
      type: "info",
      title: "New Assignment Posted",
      message: "CSC 401 - Data Structures assignment has been posted",
      link: "/student/assignments/1",
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      userId: "1",
      type: "warning",
      title: "Payment Reminder",
      message: "School fees payment deadline is in 3 days",
      link: "/student/payments",
      read: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "3",
      userId: "1",
      type: "success",
      title: "Result Published",
      message: "Your results for CSC 301 have been published",
      link: "/student/results",
      read: true,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ],
  unreadCount: 2,

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          read: false,
        },
        ...state.notifications,
      ],
      unreadCount: state.unreadCount + 1,
    })),

  markAsRead: (id) =>
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id);
      if (notification && !notification.read) {
        return {
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        };
      }
      return state;
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  removeNotification: (id) =>
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id);
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: notification && !notification.read 
          ? Math.max(0, state.unreadCount - 1)
          : state.unreadCount,
      };
    }),

  clearAll: () =>
    set({ notifications: [], unreadCount: 0 }),
}));
