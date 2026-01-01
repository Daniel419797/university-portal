"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  UserPlus,
  Settings,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Total Students",
      value: "2,547",
      change: "+12%",
      icon: Users,
      href: "/admin/users?role=student",
      color: "text-blue-500",
    },
    {
      title: "Total Courses",
      value: "156",
      change: "+3",
      icon: BookOpen,
      href: "/admin/courses",
      color: "text-green-500",
    },
    {
      title: "Revenue (This Month)",
      value: "₦45.2M",
      change: "+18%",
      icon: DollarSign,
      href: "/admin/financial",
      color: "text-purple-500",
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "Excellent",
      icon: TrendingUp,
      href: "/admin/settings",
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
          {stats.map((stat) => {
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
                {[
                  { name: "John Doe", id: "STU/2024/001", dept: "Computer Science", time: "2 hours ago" },
                  { name: "Jane Smith", id: "STU/2024/002", dept: "Engineering", time: "5 hours ago" },
                  { name: "Bob Johnson", id: "STU/2024/003", dept: "Medicine", time: "1 day ago" },
                ].map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.id}</p>
                      <p className="text-xs text-muted-foreground">{student.dept}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {student.time}
                    </div>
                  </div>
                ))}
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
                      45 payments awaiting verification
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">High Priority</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Result Approval Needed</p>
                    <p className="text-sm text-muted-foreground">
                      12 course results pending HOD approval
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Medium Priority</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">System Update Available</p>
                    <p className="text-sm text-muted-foreground">
                      Version 2.1.0 ready for installation
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Low Priority</p>
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
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="font-medium">Dr. Michael Anderson</p>
                  <p className="text-sm text-muted-foreground">
                    Submitted CSC 401 results for 45 students
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">10 min ago</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="font-medium">Bursary Office</p>
                  <p className="text-sm text-muted-foreground">
                    Verified 23 tuition fee payments
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="font-medium">System Administrator</p>
                  <p className="text-sm text-muted-foreground">
                    Created 15 new student accounts
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">3 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
