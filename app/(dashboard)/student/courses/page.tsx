"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Users, Clock, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useApi } from "@/hooks/use-api";
import { studentService } from "@/lib/services";
import { Course } from "@/lib/types";

export default function StudentCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: coursesData, isLoading, execute } = useApi<{ data: Course[]; pagination: any }>();

  useEffect(() => {
    execute(() => studentService.getCourses(), {
      errorMessage: "Failed to load courses",
    });
  }, [execute]);

  const courses = coursesData?.data || [];
  
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">My Courses</h1>
            <p className="text-muted-foreground">Loading your courses...</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-6 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-12 bg-muted animate-pulse rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Courses</h1>
            <p className="text-muted-foreground">
              You are enrolled in {courses.length} courses this semester
            </p>
          </div>
          <Button asChild>
            <Link href="/student/enrollment">Enroll in Courses</Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm ? "No courses found matching your search" : "No courses enrolled yet"}
              </p>
              <Button asChild className="mt-4">
                <Link href="/student/enrollment">Enroll in Courses</Link>
              </Button>
            </div>
          ) : (
            filteredCourses.map((course) => (
            <Link key={course.id} href={`/student/courses/${course.id}`}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.code}</CardTitle>
                      <CardDescription className="mt-1">
                        {course.title}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{course.credits} Units</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.lecturer}</span>
                    </div>

                    {course.schedule && course.schedule.length > 0 && (
                      <>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>
                            {course.schedule[0].day} {course.schedule[0].startTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{course.schedule[0].venue}</span>
                        </div>
                      </>
                    )}

                    {course.enrolled && course.capacity && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>
                          {course.enrolled}/{course.capacity} Students
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href={`/student/courses/${course.id}/materials`}>
                        Materials
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href={`/student/courses/${course.id}`}>Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
