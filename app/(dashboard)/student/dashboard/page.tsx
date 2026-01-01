"use client";

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
} from "lucide-react";
import Link from "next/link";
import { mockCourses, mockAssignments, mockPayments, mockResults } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function StudentDashboardPage() {
  // Mock stats
  const stats = [
    {
      title: "Enrolled Courses",
      value: "5",
      icon: BookOpen,
      href: "/student/courses",
      color: "text-blue-500",
    },
    {
      title: "Pending Assignments",
      value: "3",
      icon: FileText,
      href: "/student/assignments",
      color: "text-orange-500",
    },
    {
      title: "Payment Status",
      value: "Verified",
      icon: DollarSign,
      href: "/student/payments",
      color: "text-green-500",
    },
    {
      title: "Current CGPA",
      value: "4.5",
      icon: Trophy,
      href: "/student/results",
      color: "text-purple-500",
    },
  ];

  // Get recent items
  const recentCourses = mockCourses.slice(0, 3);
  const recentAssignments = mockAssignments.slice(0, 3);

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
            <div className="grid gap-3 md:grid-cols-3">
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
                {recentCourses.map((course) => (
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
                ))}
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
                {recentAssignments.map((assignment) => {
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
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Payment Verified</p>
                  <p className="text-sm text-muted-foreground">
                    Your tuition fee payment has been verified
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium">Assignment Reminder</p>
                  <p className="text-sm text-muted-foreground">
                    CSC 401 assignment due in 3 days
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">New Course Material</p>
                  <p className="text-sm text-muted-foreground">
                    Lecture slides uploaded for Database Systems
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
