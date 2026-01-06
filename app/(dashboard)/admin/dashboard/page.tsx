"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  TrendingUp,
  UserPlus,
  Settings,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useApi } from "@/hooks/use-api";
import { adminService, type AdminDashboardStats } from "@/lib/services";

export default function AdminDashboardPage() {
  const { data: dashboardData, isLoading, execute } = useApi<AdminDashboardStats>();

  useEffect(() => {
    execute(() => adminService.getDashboard(), {
      errorMessage: "Failed to load dashboard",
    });
  }, [execute]);

  const stats = [
    {
      title: "Total Students",
      value: dashboardData?.users?.students?.toLocaleString() || "0",
      change: "+12%",
      icon: Users,
      href: "/admin/users?role=student",
      color: "text-blue-500",
    },
    {
      title: "Total Courses",
      value: dashboardData?.courses?.total?.toLocaleString() || "0",
      change: "-",
      icon: BookOpen,
      href: "/admin/courses",
      color: "text-green-500",
    },
    {
      title: "Total Lecturers",
      value: dashboardData?.users?.lecturers?.toLocaleString() || "0",
      change: "+5",
      icon: Users,
      href: "/admin/users?role=lecturer",
      color: "text-purple-500",
    },
    {
      title: "Total Users",
      value: dashboardData?.users?.total?.toLocaleString() || "0",
      change: "All Roles",
      icon: TrendingUp,
      href: "/admin/users",
      color: "text-orange-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              System overview and management
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/users/create">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading && (
            <Card className="col-span-full">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Loading dashboard...</p>
              </CardContent>
            </Card>
          )}
          {!isLoading && stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.title} href={stat.href}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change} from last month</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Manage Courses
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/analytics">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  System Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Registrations */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Registrations</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/users?filter=recent">View all</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.recentUsers && dashboardData.recentUsers.length > 0 ? (
                  dashboardData.recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">{user.role}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(user.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent registrations.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>System Alerts</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/alerts">View all</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Payment Verification Pending</p>
                    <p className="text-sm text-muted-foreground">
                      {dashboardData?.payments?.pending?.count ?? 0} payments awaiting verification
                      {dashboardData?.payments?.pending?.amount ? ` — ${dashboardData.payments.pending.amount}` : ''}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">High Priority</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Payments Verified</p>
                    <p className="text-sm text-muted-foreground">
                      {dashboardData?.payments?.verified?.count ?? 0} payments verified (total {dashboardData?.payments?.verified?.amount ?? 0})
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Unread Notifications</p>
                    <p className="text-sm text-muted-foreground">{dashboardData?.unreadNotifications ?? 0} unread</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <p className="text-sm text-muted-foreground">Loading activities...</p>}
            {!isLoading && (!dashboardData?.recentActivities || dashboardData.recentActivities.length === 0) && (
              <p className="text-sm text-muted-foreground">No recent activity.</p>
            )}
            <div className="space-y-3">
              {dashboardData?.recentActivities?.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </span>
                </div>
              ))}

            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
