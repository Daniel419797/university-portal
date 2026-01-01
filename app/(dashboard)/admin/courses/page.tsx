"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen, Users, FileText } from "lucide-react";
import Link from "next/link";

export default function AdminCoursesPage() {
  const courses = [
    {
      id: "1",
      code: "CSC 401",
      title: "Data Structures and Algorithms",
      department: "Computer Science",
      level: "400",
      semester: "first",
      credits: 3,
      lecturer: "Dr. Michael Anderson",
      enrolled: 45,
      capacity: 60,
    },
    {
      id: "2",
      code: "CSC 301",
      title: "Database Management Systems",
      department: "Computer Science",
      level: "300",
      semester: "first",
      credits: 3,
      lecturer: "Prof. Sarah Thompson",
      enrolled: 52,
      capacity: 60,
    },
  ];

  const stats = [
    { title: "Total Courses", value: "250", icon: BookOpen },
    { title: "Active Courses", value: "180", icon: BookOpen },
    { title: "Total Enrollment", value: "8,450", icon: Users },
    { title: "Course Materials", value: "1,250", icon: FileText },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Course Management</h1>
            <p className="text-muted-foreground">Manage courses across all departments</p>
          </div>
          <Button asChild>
            <Link href="/admin/courses/create">
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Link>
          </Button>
        </div>

        {/* Stats */}
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

        {/* Courses List */}
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{course.code}</CardTitle>
                    <CardDescription>{course.title}</CardDescription>
                  </div>
                  <Badge variant="outline">Level {course.level}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Department:</span>
                    <p className="font-medium">{course.department}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Credits:</span>
                    <p className="font-medium">{course.credits}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lecturer:</span>
                    <p className="font-medium">{course.lecturer}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Enrollment:</span>
                    <p className="font-medium">
                      {course.enrolled}/{course.capacity}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/admin/courses/${course.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
