"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, TrendingUp, Award } from "lucide-react";

export default function HODDepartmentPage() {
  const departmentStats = [
    { title: "Total Students", value: "1,500", icon: Users },
    { title: "Active Courses", value: "45", icon: BookOpen },
    { title: "Faculty Members", value: "28", icon: Users },
    { title: "Average CGPA", value: "4.2", icon: Award },
  ];

  const coursesByLevel = [
    { level: "100", courses: 8, students: 450 },
    { level: "200", courses: 10, students: 420 },
    { level: "300", courses: 12, students: 380 },
    { level: "400", courses: 15, students: 250 },
  ];

  const topPerformers = [
    {
      name: "Jane Smith",
      matricNumber: "STU/2023/002",
      level: "400",
      cgpa: 4.95,
    },
    {
      name: "Michael Johnson",
      matricNumber: "STU/2023/005",
      level: "300",
      cgpa: 4.89,
    },
    {
      name: "Sarah Williams",
      matricNumber: "STU/2023/008",
      level: "400",
      cgpa: 4.87,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Department Overview</h1>
          <p className="text-muted-foreground">Computer Science Department</p>
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
          {/* Courses by Level */}
          <Card>
            <CardHeader>
              <CardTitle>Courses by Level</CardTitle>
              <CardDescription>Course distribution across levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coursesByLevel.map((level) => (
                  <div key={level.level}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Level {level.level}</span>
                      <span className="text-muted-foreground">
                        {level.courses} courses • {level.students} students
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(level.students / 1500) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Students</CardTitle>
              <CardDescription>Students with highest CGPA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPerformers.map((student, index) => (
                  <div key={student.matricNumber} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.matricNumber} • Level {student.level}
                      </p>
                    </div>
                    <Badge className="bg-green-500">{student.cgpa}</Badge>
                  </div>
                ))}
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
