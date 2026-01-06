"use client";

import { useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, TrendingUp, Award } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { hodService } from "@/lib/services/hodBursaryService";

export default function HODDepartmentPage() {
  const { data: deptInfo, isLoading: loadingInfo, execute: executeInfo } = useApi<{ id: string; name: string; hod: string; totalStudents: number; totalStaff: number; totalCourses: number; established: string }>();
  const { data: deptStats, isLoading: loadingStats, execute: executeStats } = useApi<{ totalStudents: number; studentsByLevel: Record<string, number>; averageCGPA: number; graduationRate: number; employmentRate: number }>();

  useEffect(() => {
    executeInfo(() => hodService.getDepartmentInfo(), {
      errorMessage: "Failed to load department information"
    });
    executeStats(() => hodService.getDepartmentStatistics(), {
      errorMessage: "Failed to load department statistics"
    });
  }, [executeInfo, executeStats]);

  if (loadingInfo || loadingStats) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading department overview...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!deptInfo || !deptStats) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-muted-foreground">Department data not available</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const departmentStats = [
    { title: "Total Students", value: deptInfo.totalStudents.toString(), icon: Users },
    { title: "Active Courses", value: deptInfo.totalCourses.toString(), icon: BookOpen },
    { title: "Faculty Members", value: deptInfo.totalStaff.toString(), icon: Users },
    { title: "Average CGPA", value: deptStats.averageCGPA.toFixed(2), icon: Award },
  ];

  const coursesByLevel = Object.entries(deptStats.studentsByLevel).map(([level, students]) => ({
    level,
    students,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Department Overview</h1>
          <p className="text-muted-foreground">{deptInfo.name}</p>
          <p className="text-sm text-muted-foreground">Established: {new Date(deptInfo.established).getFullYear()}</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {departmentStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription>{stat.title}</CardDescription>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Students by Level */}
          <Card>
            <CardHeader>
              <CardTitle>Students by Level</CardTitle>
              <CardDescription>Student distribution across levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coursesByLevel.map((level) => (
                  <div key={level.level}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Level {level.level}</span>
                      <span className="text-muted-foreground">
                        {level.students} students
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(level.students / deptStats.totalStudents) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Department Rates */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Graduation Rate</p>
                    <p className="text-sm text-muted-foreground">Students completing on time</p>
                  </div>
                  <Badge className="bg-green-500">{deptStats.graduationRate}%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Employment Rate</p>
                    <p className="text-sm text-muted-foreground">Employed within 6 months</p>
                  </div>
                  <Badge className="bg-blue-500">{deptStats.employmentRate}%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance Trend</CardTitle>
            <CardDescription>Average CGPA over the last 5 sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart placeholder - Department performance trend
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Button variant="outline" className="justify-start">
            <BookOpen className="mr-2 h-4 w-4" />
            Manage Courses
          </Button>
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/hod/students">
              <Users className="mr-2 h-4 w-4" />
              View All Students
            </Link>
          </Button>
          <Button variant="outline" className="justify-start">
            <TrendingUp className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
