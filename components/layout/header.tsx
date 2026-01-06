"use client";

import { Bell, Menu, Moon, Sun, LogOut, User, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";
import { useNotificationStore } from "@/store/notification-store";
import { getInitials } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const {
    notifications,
    unreadCount,
    fetchNotifications,
    fetchUnreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    removeNotification,
    error,
  } = useNotificationStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, [fetchNotifications, fetchUnreadCount]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Notification error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-2 md:px-6">
      {/* Left: Menu Button (Mobile) */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:block">
          <h2 className="text-lg font-semibold">
            Welcome back, {user?.firstName || "User"}!
          </h2>
          <p className="text-sm text-muted-foreground">
            {user?.role && user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-5 w-5 p-0 text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 rounded-lg border border-border bg-card p-4 shadow-lg">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline disabled:opacity-50"
                    disabled={loading || unreadCount === 0}
                    onClick={() => markAllAsRead()}
                  >
                    Mark all as read
                  </button>
                  <Link
                    href="/student/notifications"
                    className="text-sm text-primary hover:underline"
                    onClick={() => setShowNotifications(false)}
                  >
                    View all
                  </Link>
                </div>
              </div>
              <div className="space-y-2">
                {loading ? (
                  <p className="text-sm text-muted-foreground">Loading notifications...</p>
                ) : notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground">You are all caught up.</p>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className="rounded-md border border-border/60 bg-muted/50 p-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <Badge variant="secondary" className="text-[10px]">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{new Date(notification.timestamp).toLocaleString()}</span>
                        <div className="flex items-center gap-1">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => markAsRead(notification.id)}
                              aria-label="Mark notification as read"
                              disabled={loading}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => removeNotification(notification.id)}
                            aria-label="Delete notification"
                            disabled={loading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {error && (
                  <p className="text-xs text-destructive">{error}</p>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{unreadCount} unread</span>
                  <Link
                    href="/student/notifications"
                    className="text-primary hover:underline"
                    onClick={() => setShowNotifications(false)}
                  >
                    View all
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg p-2 hover:bg-accent">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.firstName} />
                <AvatarFallback>
                  {user ? getInitials(`${user.firstName} ${user.lastName}`) : "U"}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm font-normal text-muted-foreground">
                  {user?.email}
                </p>
                {user?.studentId && (
                  <p className="text-sm font-normal text-muted-foreground">
                    {user.studentId}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
