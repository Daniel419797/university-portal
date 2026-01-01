"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { mockCourses, mockAssignments } from "@/lib/mock-data";

export default function LecturerDashboardPage() {
  const stats = [
    {
      title: "My Courses",
      value: "3",
      icon: BookOpen,
      href: "/lecturer/courses",
      color: "text-blue-500",
    },
    {
      title: "Total Students",
      value: "145",
      icon: Users,
      href: "/lecturer/students",
      color: "text-green-500",
    },
    {
      title: "Pending Grading",
      value: "8",
      icon: FileText,
      href: "/lecturer/assignments",
      color: "text-orange-500",
    },
    {
      title: "Course Average",
      value: "78%",
      icon: TrendingUp,
      href: "/lecturer/analytics",
      color: "text-purple-500",
    },
  ];

  const myCourses = mockCourses.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Lecturer Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your courses, students, and assessments
          </p>
        </div>

        {/* Stats Cards */}
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
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/lecturer/attendance">
                  <Calendar className="mr-2 h-4 w-4" />
                  Mark Attendance
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
          {/* My Courses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Courses</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/lecturer/courses">View all</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-start justify-between rounded-lg border border-border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{course.code}</p>
                      <p className="text-sm text-muted-foreground">{course.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {course.enrolled} students enrolled
                      </p>
                    </div>
                    <Badge variant="secondary">{course.level} Level</Badge>
                  </div>
                ))}
              </div>
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
