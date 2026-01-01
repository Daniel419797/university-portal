"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, BookOpen, TrendingUp, Award } from "lucide-react";

export default function HODDashboardPage() {
  const stats = [
    {
      title: "Department Students",
      value: "1,500",
      change: "+8.2%",
      icon: Users,
    },
    {
      title: "Active Courses",
      value: "45",
      change: "+3",
      icon: BookOpen,
    },
    {
      title: "Faculty Members",
      value: "28",
      change: "+2",
      icon: Users,
    },
    {
      title: "Avg. Department CGPA",
      value: "4.2",
      change: "+0.15",
      icon: Award,
    },
  ];

  const pendingApprovals = [
    {
      id: "1",
      type: "Result Approval",
      course: "CSC 401 - Data Structures",
      lecturer: "Dr. Michael Anderson",
      submittedAt: "2026-01-01",
      status: "pending",
    },
    {
      id: "2",
      type: "Result Approval",
      course: "CSC 301 - Database Systems",
      lecturer: "Prof. Sarah Thompson",
      submittedAt: "2025-12-30",
      status: "pending",
    },
  ];

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
                  <p className="text-xs text-green-500">{stat.change} from last semester</p>
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
              <Badge variant="secondary">{pendingApprovals.length} pending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.course}</p>
                    <p className="text-sm text-muted-foreground">
                      By {item.lecturer} • {new Date(item.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Student performance by level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { level: "100", students: 450, avgCGPA: 3.8 },
                { level: "200", students: 420, avgCGPA: 4.0 },
                { level: "300", students: 380, avgCGPA: 4.2 },
                { level: "400", students: 250, avgCGPA: 4.5 },
              ].map((level) => (
                <div key={level.level}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Level {level.level}</span>
                    <span className="text-muted-foreground">
                      {level.students} students • {level.avgCGPA} CGPA
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(level.avgCGPA / 5) * 100}%` }}
                    />
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
