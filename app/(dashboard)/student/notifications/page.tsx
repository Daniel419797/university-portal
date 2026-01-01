"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Bell, BookOpen, CreditCard, Award, MessageSquare, Settings, Trash2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NotificationsPage() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const notifications = [
    {
      id: 1,
      type: "assignment",
      title: "New Assignment Posted",
      message: "Dr. Michael Chen has posted a new assignment for CSC 401 - Artificial Intelligence",
      timestamp: new Date("2025-01-28T10:30:00"),
      isRead: false,
      icon: BookOpen,
    },
    {
      id: 2,
      type: "grade",
      title: "Grade Published",
      message: "Your grade for 'Final Project Report' has been published: 85/100 (A)",
      timestamp: new Date("2025-01-27T15:45:00"),
      isRead: false,
      icon: Award,
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Deadline Reminder",
      message: "Your school fees payment is due in 5 days. Amount remaining: ₦150,000",
      timestamp: new Date("2025-01-26T09:00:00"),
      isRead: true,
      icon: CreditCard,
    },
    {
      id: 4,
      type: "announcement",
      title: "Semester Break Announcement",
      message: "The semester break will commence from February 10th to March 3rd, 2025",
      timestamp: new Date("2025-01-25T14:20:00"),
      isRead: true,
      icon: MessageSquare,
    },
    {
      id: 5,
      type: "quiz",
      title: "Quiz Available",
      message: "A new quiz 'Mid-Semester Test' is now available for CSC 301 - Data Structures",
      timestamp: new Date("2025-01-24T08:15:00"),
      isRead: false,
      icon: BookOpen,
    },
    {
      id: 6,
      type: "grade",
      title: "Assignment Graded",
      message: "Your submission for 'Database Design Assignment' has been graded: 92/100 (A)",
      timestamp: new Date("2025-01-23T16:30:00"),
      isRead: true,
      icon: Award,
    },
    {
      id: 7,
      type: "announcement",
      title: "Campus Security Update",
      message: "Please note the new security protocols for campus access effective February 1st",
      timestamp: new Date("2025-01-22T11:00:00"),
      isRead: true,
      icon: MessageSquare,
    },
    {
      id: 8,
      type: "assignment",
      title: "Assignment Due Soon",
      message: "Reminder: 'Research Paper' for CSC 401 is due in 2 days",
      timestamp: new Date("2025-01-21T13:45:00"),
      isRead: false,
      icon: BookOpen,
    },
  ];

  const [notificationList, setNotificationList] = useState(notifications);

  const handleMarkAsRead = (id: number) => {
    setNotificationList(
      notificationList.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
    toast({
      title: "Marked as Read",
      description: "Notification has been marked as read.",
    });
  };

  const handleMarkAllAsRead = () => {
    setNotificationList(
      notificationList.map((notif) => ({ ...notif, isRead: true }))
    );
    toast({
      title: "All Marked as Read",
      description: "All notifications have been marked as read.",
    });
  };

  const handleDelete = (id: number) => {
    setNotificationList(notificationList.filter((notif) => notif.id !== id));
    toast({
      title: "Notification Deleted",
      description: "The notification has been removed.",
    });
  };

  const handleDeleteAll = () => {
    setNotificationList([]);
    toast({
      title: "All Deleted",
      description: "All notifications have been cleared.",
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

  const unreadCount = notificationList.filter((n) => !n.isRead).length;

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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
              <Check className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" onClick={handleDeleteAll} disabled={notificationList.length === 0}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | "unread" | "read")} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All ({notificationList.length})</TabsTrigger>
                  <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
                  <TabsTrigger value="read">Read ({notificationList.length - unreadCount})</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No notifications to display</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <Card key={notif.id} className={!notif.isRead ? "border-l-4 border-l-primary" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${getNotificationColor(notif.type)}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold">{notif.title}</h3>
                          {!notif.isRead && (
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            {formatTimestamp(notif.timestamp)}
                          </p>
                          <div className="flex gap-2">
                            {!notif.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(notif.id)}
                              >
                                <Check className="mr-1 h-3 w-3" />
                                Mark Read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(notif.id)}
                            >
                              <Trash2 className="h-3 w-3" />
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
