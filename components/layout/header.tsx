"use client";

import { Bell, Menu, Moon, Sun, LogOut, User } from "lucide-react";
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
import { useNotificationStore } from "@/store/notification-store";
import { getInitials } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { unreadCount } = useNotificationStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-6">
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
                <Link
                  href="/student/notifications"
                  className="text-sm text-primary hover:underline"
                  onClick={() => setShowNotifications(false)}
                >
                  View all
                </Link>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  You have {unreadCount} unread notifications
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setShowNotifications(false)}
                  asChild
                >
                  <Link href="/student/notifications">View All Notifications</Link>
                </Button>
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
