"use client";

import { useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, BookOpen, TrendingUp, Award } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { hodService, HODDashboardStats } from "@/lib/services/hodBursaryService";

export default function HODDashboardPage() {
  const { data, isLoading, execute } = useApi<HODDashboardStats>();

  useEffect(() => {
    execute(() => hodService.getDashboard(), {
      errorMessage: "Failed to load HOD dashboard"
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

  if (!data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-muted-foreground">No dashboard data available</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const stats = [
    {
      title: "Department Students",
      value: data.departmentStats.totalStudents.toString(),
      icon: Users,
    },
    {
      title: "Active Courses",
      value: data.departmentStats.totalCourses.toString(),
      icon: BookOpen,
    },
    {
      title: "Faculty Members",
      value: data.departmentStats.totalStaff.toString(),
      icon: Users,
    },
    {
      title: "Active Lecturers",
      value: data.departmentStats.activeLecturers.toString(),
      icon: Award,
    },
  ];

  const totalPendingApprovals = 
    data.pendingApprovals.results + 
    data.pendingApprovals.clearances + 
    data.pendingApprovals.courseRegistrations;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">HOD Dashboard</h1>
          <p className="text-muted-foreground">Computer Science Department</p>
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
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Items requiring your approval</CardDescription>
              </div>
              <Badge variant="secondary">{totalPendingApprovals} pending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Result Approvals</p>
                  <p className="text-sm text-muted-foreground">Course results awaiting approval</p>
                </div>
                <Badge variant="secondary">{data.pendingApprovals.results}</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Clearance Requests</p>
                  <p className="text-sm text-muted-foreground">Student clearance requests</p>
                </div>
                <Badge variant="secondary">{data.pendingApprovals.clearances}</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Course Registrations</p>
                  <p className="text-sm text-muted-foreground">Pending course registrations</p>
                </div>
                <Badge variant="secondary">{data.pendingApprovals.courseRegistrations}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Recent department activities</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentActivities.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No recent activities</p>
            ) : (
              <div className="space-y-3">
                {data.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.user} • {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="outline">{activity.type}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
