"use client";

import { useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Award, BookOpen } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { hodService, DepartmentAnalytics } from "@/lib/services/hodBursaryService";

export default function HODAnalyticsPage() {
  const { data: analytics, isLoading, execute } = useApi<DepartmentAnalytics>();

  useEffect(() => {
    execute(() => hodService.getAnalytics(), {
      errorMessage: "Failed to load department analytics"
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
      title: "Average GPA",
      value: analytics.performanceMetrics.averageGPA.toFixed(2),
      change: `${analytics.performanceMetrics.passRate}% pass rate`,
      icon: Award,
    },
    {
      title: "Excellence Rate",
      value: `${analytics.performanceMetrics.excellenceRate}%`,
      change: "First class students",
      icon: TrendingUp,
    },
    {
      title: "Graduation Rate (4yr)",
      value: `${analytics.graduationRates.fourYearRate}%`,
      change: `${analytics.graduationRates.totalGraduates} graduates`,
      icon: Users,
    },
    {
      title: "Expected Graduates",
      value: analytics.graduationRates.expectedGraduates.toString(),
      change: "This session",
      icon: BookOpen,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Department Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics for Computer Science Department
          </p>
        </div>

        {/* Key Metrics */}
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
                  <p className="text-xs text-green-500">{stat.change} from last year</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Performance by Level */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
            <CardDescription>Enrollment and graduation trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.enrollmentTrends.map((trend) => (
                <div key={trend.period}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{trend.period}</span>
                    <span className="text-muted-foreground">
                      {trend.enrollments} enrollments • {trend.graduations} graduations
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(trend.enrollments / Math.max(...analytics.enrollmentTrends.map(t => t.enrollments))) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Course Success Rate */}
          <Card>
            <CardHeader>
              <CardTitle>Course Success Rate</CardTitle>
              <CardDescription>Pass rate by course level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Chart placeholder - Course success rates
              </div>
            </CardContent>
          </Card>

          {/* Faculty Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Faculty Productivity</CardTitle>
              <CardDescription>Staff performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.staffProductivity.map((staff) => (
                  <div key={staff.staffId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{staff.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {staff.coursesAssigned} courses • {staff.studentsSupervised} students
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        {staff.averageStudentPerformance.toFixed(1)}
                      </p>
                      <p className="text-xs text-muted-foreground">Avg Performance</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Lecturers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Lecturers</CardTitle>
              <CardDescription>Highest rated lecturers this semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Prof. Thompson", rating: 4.9, courses: 2 },
                  { name: "Dr. Martinez", rating: 4.6, courses: 4 },
                ].map((lecturer) => (
                  <div key={lecturer.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{lecturer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {lecturer.courses} courses
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="font-bold">{lecturer.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrollment Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
            <CardDescription>Student enrollment over the past 5 years</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart placeholder - Enrollment trends
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
