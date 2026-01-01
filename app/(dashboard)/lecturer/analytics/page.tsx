"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, FileText } from "lucide-react";

export default function LecturerAnalyticsPage() {
  const stats = [
    {
      title: "Total Students",
      value: "155",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Average Performance",
      value: "72.5%",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Assignments Submitted",
      value: "89%",
      change: "-3%",
      trend: "down",
      icon: FileText,
    },
    {
      title: "Course Rating",
      value: "4.5/5",
      change: "+0.3",
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
              {["CSC 401", "CSC 301", "CSC 201"].map((course) => (
                <div key={course} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{course}</span>
                    <span className="text-muted-foreground">75%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }} />
                  </div>
                </div>
              ))}
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
