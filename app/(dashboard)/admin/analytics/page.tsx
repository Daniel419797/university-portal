"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, DollarSign, TrendingUp, Award, AlertCircle } from "lucide-react";

export default function AdminAnalyticsPage() {
  const stats = [
    {
      title: "Total Students",
      value: "8,450",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Courses",
      value: "250",
      change: "+5",
      icon: BookOpen,
      color: "text-green-500",
    },
    {
      title: "Revenue (This Month)",
      value: "₦45.2M",
      change: "+18.2%",
      icon: DollarSign,
      color: "text-purple-500",
    },
    {
      title: "Average CGPA",
      value: "3.85",
      change: "+0.15",
      icon: Award,
      color: "text-yellow-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive institutional analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription>{stat.title}</CardDescription>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-500">{stat.change} from last period</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Student Enrollment Trend</CardTitle>
              <CardDescription>Monthly enrollment over the year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Chart placeholder - Student enrollment trend
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Collection Rate</CardTitle>
              <CardDescription>Fee payment status overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Chart placeholder - Payment collection
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Average CGPA by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Computer Science", cgpa: 4.2, students: 1500 },
                { name: "Engineering", cgpa: 3.9, students: 1200 },
                { name: "Medicine", cgpa: 4.5, students: 800 },
                { name: "Law", cgpa: 4.0, students: 600 },
                { name: "Business", cgpa: 3.7, students: 1100 },
              ].map((dept) => (
                <div key={dept.name} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{dept.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {dept.students} students • {dept.cgpa} CGPA
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(dept.cgpa / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium">Low Payment Rate Alert</p>
                  <p className="text-sm text-muted-foreground">
                    Only 65% of students have completed fee payment for this semester
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Increased Enrollment</p>
                  <p className="text-sm text-muted-foreground">
                    12.5% increase in new student enrollment compared to last year
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
