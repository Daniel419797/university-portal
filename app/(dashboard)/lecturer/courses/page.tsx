"use client";

import { useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Calendar, Plus } from "lucide-react";
import Link from "next/link";
import { useApi } from "@/hooks/use-api";
import { lecturerService } from "@/lib/services/lecturerService";
import { Course } from "@/lib/types";

export default function LecturerCoursesPage() {
  const { data: courses, isLoading, execute } = useApi<Course[]>();

  useEffect(() => {
    execute(() => lecturerService.getCourses(), {
      errorMessage: "Failed to load courses"
    });
  }, [execute]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading courses...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
          {!courses || courses.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No courses assigned</p>
            </div>
          ) : (
            courses.map((course) => (
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
                      {course.enrolled || 0}
                    </span>
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
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}