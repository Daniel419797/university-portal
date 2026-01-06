"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Bell, BookOpen, CreditCard, Award, MessageSquare, Settings, Trash2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { notificationService, type Notification } from "@/lib/services";
import { useApi } from "@/hooks/use-api";

export default function NotificationsPage() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationList, setNotificationList] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { isLoading: isLoadingNotifications, execute: executeNotifications } = useApi<{ notifications: Notification[]; total: number; unreadCount: number } | null>();
  const { execute: executeUnreadCount } = useApi<number | null>();

  const normalizeNotifications = (data: unknown): Notification[] => {
    if (Array.isArray(data)) return data;
    if (data && typeof data === "object" && "notifications" in data) {
      const notifications = (data as { notifications?: unknown }).notifications;
      return Array.isArray(notifications) ? notifications : [];
    }
    return [];
  };

  useEffect(() => {
    executeNotifications(() => notificationService.getNotifications(), {
      errorMessage: "Failed to load notifications",
      onSuccess: (data) => {
        const list = normalizeNotifications(data);
        setNotificationList(list);
        setUnreadCount(list.filter((n) => !n.isRead).length);
      },
    });

    executeUnreadCount(() => notificationService.getUnreadCount(), {
      errorMessage: "Failed to load unread count",
      onSuccess: (count) => setUnreadCount(typeof count === "number" ? count : 0),
    });
  }, [executeNotifications, executeUnreadCount]);

  const handleMarkAsRead = async (id: string) => {
    try {
      const wasUnread = notificationList.some((n) => n.id === id && !n.isRead);
      await notificationService.markAsRead(id);
      setNotificationList((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)));
      if (wasUnread) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
      toast({ title: "Marked as Read", description: "Notification has been marked as read." });
    } catch (error) {
      toast({ title: "Unable to mark as read", description: "Please try again.", variant: "destructive" });
    }
  };

  const handleMarkAllAsRead = () => {
    const unreadIds = notificationList.filter((n) => !n.isRead).map((n) => n.id);
    Promise.all(unreadIds.map((id) => notificationService.markAsRead(id)))
      .then(() => {
        setNotificationList((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
        setUnreadCount(0);
        toast({ title: "All Marked as Read", description: "All notifications have been marked as read." });
      })
      .catch(() => {
        toast({ title: "Unable to mark all", description: "Please try again.", variant: "destructive" });
      });
  };

  const handleDelete = async (id: string) => {
    try {
      const wasUnread = notificationList.some((n) => n.id === id && !n.isRead);
      await notificationService.deleteNotification(id);
      setNotificationList((prev) => prev.filter((notif) => notif.id !== id));
      if (wasUnread) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
      toast({ title: "Notification Deleted", description: "The notification has been removed." });
    } catch (error) {
      toast({ title: "Unable to delete", description: "Please try again.", variant: "destructive" });
    }
  };

  const handleDeleteAll = () => {
    const ids = notificationList.map((n) => n.id);
    Promise.all(ids.map((id) => notificationService.deleteNotification(id)))
      .then(() => {
        setNotificationList([]);
        setUnreadCount(0);
        toast({ title: "All Deleted", description: "All notifications have been cleared." });
      })
      .catch(() => {
        toast({ title: "Unable to clear", description: "Please try again.", variant: "destructive" });
      });
  };

  const filteredNotifications = notificationList.filter((notif) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !notif.isRead) ||
      (filter === "read" && notif.isRead);

    const matchesSearch =
      searchQuery === "" ||
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const readCount = Math.max(notificationList.length - unreadCount, 0);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200";
      case "grade":
        return "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200";
      case "payment":
        return "bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200";
      case "quiz":
        return "bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200";
      default:
        return "bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200";
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Notifications</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleMarkAllAsRead} 
              disabled={unreadCount === 0}
              className="flex-1 sm:flex-none"
            >
              <Check className="mr-1 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Mark All Read</span>
              <span className="sm:hidden">Read All</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDeleteAll} 
              disabled={notificationList.length === 0}
              className="flex-1 sm:flex-none"
            >
              <Trash2 className="mr-1 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Clear All</span>
              <span className="sm:hidden">Clear</span>
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-4 md:pt-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Tabs 
                value={filter} 
                onValueChange={(v) => setFilter(v as "all" | "unread" | "read")} 
                className="w-full sm:w-auto"
              >
                <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                  <TabsTrigger value="all" className="text-xs sm:text-sm">
                    All ({notificationList.length})
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs sm:text-sm">
                    Unread ({unreadCount})
                  </TabsTrigger>
                  <TabsTrigger value="read" className="text-xs sm:text-sm">
                    Read ({readCount})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-3">
          {isLoadingNotifications && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-sm text-muted-foreground">Loading notifications...</p>
              </CardContent>
            </Card>
          )}

          {!isLoadingNotifications && filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground">No notifications to display</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notif) => {
              const iconMap: Record<string, typeof BookOpen> = {
                assignment: BookOpen,
                grade: Award,
                payment: CreditCard,
                announcement: MessageSquare,
                quiz: BookOpen,
              };
              const Icon = iconMap[notif.type] || MessageSquare;
              return (
                <Card key={notif.id} className={!notif.isRead ? "border-l-4 border-l-primary" : ""}>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`p-2 rounded-lg ${getNotificationColor(notif.type)} flex-shrink-0`}>
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1 gap-2">
                          <h3 className="font-semibold text-sm sm:text-base leading-tight">{notif.title}</h3>
                          {!notif.isRead && (
                            <Badge variant="default" className="text-xs flex-shrink-0">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2 break-words">
                          {notif.message}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <p className="text-xs text-muted-foreground">
                            {formatTimestamp(new Date(notif.timestamp))}
                          </p>
                          <div className="flex gap-2">
                            {!notif.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(notif.id)}
                                className="h-8 px-2 sm:px-3"
                              >
                                <Check className="mr-1 h-3 w-3" />
                                <span className="text-xs">Mark Read</span>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(notif.id)}
                              className="h-8 px-2 sm:px-3"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}