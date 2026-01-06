"use client";

import { useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useApi } from "@/hooks/use-api";
import { lecturerService, LecturerDashboardStats } from "@/lib/services/lecturerService";

export default function LecturerDashboardPage() {
  const { data: dashboardData, isLoading, execute } = useApi<LecturerDashboardStats>();

  useEffect(() => {
    execute(() => lecturerService.getDashboard(), {
      errorMessage: "Failed to load dashboard"
    });
  }, [execute]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!dashboardData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-muted-foreground">Dashboard data not available</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const stats = [
    {
      title: "My Courses",
      value: dashboardData.assignedCourses.toString(),
      icon: BookOpen,
      href: "/lecturer/courses",
    },
    {
      title: "Total Students",
      value: dashboardData.totalStudents.toString(),
      icon: Users,
      href: "/lecturer/students",
    },
    {
      title: "Assignments",
      value: dashboardData.pendingSubmissions.toString(),
      icon: FileText,
      href: "/lecturer/assignments",
    },
    {
      title: "Quizzes",
      value: dashboardData.pendingQuizzes.toString(),
      icon: TrendingUp,
      href: "/lecturer/quizzes",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/lecturer/courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Courses
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/lecturer/assignments/create">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Assignment
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/lecturer/results">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Enter Results
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/lecturer/analytics">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Analytics
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Classes */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Classes</CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardData.upcomingClasses.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No upcoming classes</p>
              ) : (
                <div className="space-y-3">
                  {dashboardData.upcomingClasses.map((classItem) => (
                    <div key={classItem.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">{classItem.courseCode} - {classItem.courseTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(classItem.date).toLocaleDateString()} • {classItem.time}
                        </p>
                        <p className="text-sm text-muted-foreground">{classItem.venue}</p>
                      </div>
                      <Badge variant="outline">{classItem.type}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-blue-500/10 p-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">New Assignment Submission</p>
                    <p className="text-sm text-muted-foreground">
                      John Doe submitted CSC 401 assignment
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-green-500/10 p-2">
                    <Users className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">New Student Enrolled</p>
                    <p className="text-sm text-muted-foreground">
                      Jane Smith enrolled in CSC 301
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-purple-500/10 p-2">
                    <BarChart3 className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium">Results Submitted</p>
                    <p className="text-sm text-muted-foreground">
                      CSC 201 results pending HOD approval
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
