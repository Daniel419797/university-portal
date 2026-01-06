"use client";

import { useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, FileText } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { lecturerService, LecturerAnalytics } from "@/lib/services/lecturerService";

export default function LecturerAnalyticsPage() {
  const { data: analytics, isLoading, execute } = useApi<LecturerAnalytics>();

  useEffect(() => {
    execute(() => lecturerService.getAnalytics(), {
      errorMessage: "Failed to load analytics"
    });
  }, [execute]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analytics) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-muted-foreground">Analytics data not available</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const stats = [
    {
      title: "Total Students",
      value: analytics?.studentPerformance?.totalStudents !== undefined ? analytics.studentPerformance.totalStudents.toString() : "-",
      change:
        analytics?.studentPerformance?.averageGPA !== undefined
          ? `GPA: ${analytics.studentPerformance.averageGPA.toFixed(2)}`
          : "GPA: -",
      trend: "up",
      icon: Users,
    },
    {
      title: "Top Performers",
      value: analytics?.studentPerformance?.topPerformers !== undefined ? analytics.studentPerformance.topPerformers.toString() : "-",
      change: "Excellent standing",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Assignments",
      value: analytics?.assignmentStats?.totalAssignments !== undefined ? analytics.assignmentStats.totalAssignments.toString() : "-",
      change: analytics?.assignmentStats?.pendingGrading !== undefined ? `${analytics.assignmentStats.pendingGrading} pending` : "-",
      trend: "up",
      icon: FileText,
    },
    {
      title: "Avg Assignment Score",
      value: analytics?.assignmentStats?.averageScore !== undefined ? `${analytics.assignmentStats.averageScore.toFixed(1)}%` : "-",
      change: analytics?.assignmentStats?.onTimeSubmissions !== undefined ? `${analytics.assignmentStats.onTimeSubmissions}% on time` : "-",
      trend: "up",
      icon: BarChart3,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track student performance and course metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription>{stat.title}</CardDescription>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p
                    className={`text-xs ${
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change} from last semester
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Course Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Course Performance Overview</CardTitle>
            <CardDescription>Student performance across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.isArray(analytics?.coursesOverview) && analytics.coursesOverview.length > 0 ? (
                analytics.coursesOverview.map((course) => (
                  <div key={course.courseCode} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{course.courseCode} - {course.courseTitle}</span>
                      <span className="text-muted-foreground">{course.averageScore.toFixed(1)}% avg</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${course.averageScore}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{course.totalStudents} students</span>
                      <span>{course.passRate.toFixed(1)}% pass rate</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground text-center">No course performance data available.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Overall grade distribution across courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {[
                { grade: "A", count: 45, color: "bg-green-500" },
                { grade: "B", count: 62, color: "bg-blue-500" },
                { grade: "C", count: 35, color: "bg-yellow-500" },
                { grade: "D", count: 10, color: "bg-orange-500" },
                { grade: "F", count: 3, color: "bg-red-500" },
              ].map((item) => (
                <div key={item.grade} className="text-center">
                  <div className={`${item.color} rounded-lg p-4 text-white`}>
                    <div className="text-2xl font-bold">{item.count}</div>
                    <div className="text-sm">Grade {item.grade}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
