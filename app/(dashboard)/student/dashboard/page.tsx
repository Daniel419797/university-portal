"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FileText,
  DollarSign,
  Trophy,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { useApi } from "@/hooks/use-api";
import { studentService, DashboardStats } from "@/lib/services";

export default function StudentDashboardPage() {
  const { data: dashboardData, isLoading, execute } = useApi<DashboardStats>();

  useEffect(() => {
    execute(() => studentService.getDashboard(), {
      errorMessage: "Failed to load dashboard data",
    });
  }, [execute]);

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Loading...</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="space-y-0 pb-2">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Stats cards configuration
  const stats = [
    {
      title: "Enrolled Courses",
      value: dashboardData?.enrolledCourses?.toString() || "0",
      icon: BookOpen,
      href: "/student/courses",
      color: "text-blue-500",
    },
    {
      title: "Pending Assignments",
      value: dashboardData?.pendingAssignments?.toString() || "0",
      icon: FileText,
      href: "/student/assignments",
      color: "text-orange-500",
    },
    {
      title: "Payment Status",
      value: dashboardData?.paymentStatus || "Pending",
      icon: DollarSign,
      href: "/student/payments",
      color: "text-green-500",
    },
    {
      title: "Current CGPA",
      value: dashboardData?.cgpa?.toFixed(2) || "0.00",
      icon: Trophy,
      href: "/student/results",
      color: "text-purple-500",
    },
  ];

  // Get recent items from dashboard data
  const recentCourses = dashboardData?.recentCourses || [];
  const recentAssignments = dashboardData?.recentAssignments || [];
  const upcomingEvents = dashboardData?.upcomingEvents || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your student portal</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.title} href={stat.href}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
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
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/student/timetable">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Timetable
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/student/courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Courses
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/student/payments/make-payment">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Make Payment
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/student/id-card">
                  <CreditCard className="mr-2 h-4 w-4" />
                  My ID Card
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Courses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Courses</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/student/courses">View all</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCourses.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No courses enrolled yet
                  </p>
                ) : (
                  recentCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-start justify-between rounded-lg border border-border p-4"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{course.code}</p>
                        <p className="text-sm text-muted-foreground">
                          {course.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {course.lecturer}
                        </p>
                      </div>
                      <Badge variant="secondary">{course.credits} Units</Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pending Assignments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pending Assignments</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/student/assignments">View all</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAssignments.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No pending assignments
                  </p>
                ) : (
                  recentAssignments.map((assignment) => {
                    const isOverdue = assignment.status === "overdue";
                    return (
                      <div
                        key={assignment.id}
                        className="flex items-start justify-between rounded-lg border border-border p-4"
                      >
                        <div className="space-y-1 flex-1">
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {assignment.courseName}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <Clock className="h-3 w-3" />
                            <span className={isOverdue ? "text-destructive" : "text-muted-foreground"}>
                              Due: {formatDate(assignment.dueDate)}
                            </span>
                          </div>
                        </div>
                        <Badge variant={isOverdue ? "destructive" : "secondary"}>
                          {assignment.totalMarks} marks
                        </Badge>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No upcoming events
                </p>
              ) : (
                upcomingEvents.slice(0, 3).map((event) => {
                  const getEventIcon = () => {
                    switch (event.type) {
                      case 'assignment':
                        return <FileText className="h-5 w-5 text-orange-500 mt-0.5" />;
                      case 'quiz':
                      case 'exam':
                        return <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />;
                      case 'class':
                        return <BookOpen className="h-5 w-5 text-blue-500 mt-0.5" />;
                      default:
                        return <Calendar className="h-5 w-5 text-green-500 mt-0.5" />;
                    }
                  };

                  return (
                    <div key={event.id} className="flex items-start gap-3">
                      {getEventIcon()}
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.courseCode && `${event.courseCode} • `}
                          {formatDate(event.date)}
                          {event.time && ` at ${event.time}`}
                          {event.location && ` • ${event.location}`}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
