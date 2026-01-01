"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Calendar, Plus } from "lucide-react";
import Link from "next/link";

export default function LecturerCoursesPage() {
  const courses = [
    {
      id: "1",
      code: "CSC 401",
      title: "Data Structures and Algorithms",
      level: "400",
      semester: "first",
      enrolled: 45,
      capacity: 60,
      schedule: [
        { day: "Monday", time: "10:00 - 12:00", venue: "LT1" },
        { day: "Wednesday", time: "14:00 - 16:00", venue: "Lab 3" },
      ],
    },
    {
      id: "2",
      code: "CSC 301",
      title: "Database Management Systems",
      level: "300",
      semester: "first",
      enrolled: 52,
      capacity: 60,
      schedule: [
        { day: "Tuesday", time: "10:00 - 12:00", venue: "LT2" },
      ],
    },
    {
      id: "3",
      code: "CSC 201",
      title: "Object-Oriented Programming",
      level: "200",
      semester: "first",
      enrolled: 58,
      capacity: 60,
      schedule: [
        { day: "Monday", time: "14:00 - 17:00", venue: "Lab 2" },
      ],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Courses</h1>
            <p className="text-muted-foreground">Manage your assigned courses</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Upload Materials
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Students
                  </span>
                  <span className="font-medium">
                    {course.enrolled}/{course.capacity}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Schedule
                  </span>
                  {course.schedule.map((s, idx) => (
                    <div key={idx} className="text-sm pl-6">
                      <span className="font-medium">{s.day}</span> - {s.time}
                      <br />
                      <span className="text-muted-foreground">{s.venue}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/lecturer/courses/${course.id}/students`}>
                      View Students
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/student/courses/${course.id}/materials`}>
                      Materials
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
