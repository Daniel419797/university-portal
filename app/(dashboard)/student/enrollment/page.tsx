"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Users, Clock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/use-api";
import { studentService } from "@/lib/services";
import type { Course } from "@/lib/types";

export default function EnrollmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const { toast } = useToast();

  const { data: availableCourses, isLoading: loadingAvailable, execute: loadAvailableCourses } = useApi<Course[]>();
  const { data: enrolledCourses, isLoading: loadingEnrolled, execute: loadEnrolledCourses } = useApi<{ data: Course[]; pagination: { page: number; limit: number; total: number; totalPages: number } }>();
  const { isLoading: enrolling, execute: enroll } = useApi();

  useEffect(() => {
    loadAvailableCourses(() => studentService.getAvailableCourses(), {
      errorMessage: "Failed to load available courses",
    });
    loadEnrolledCourses(() => studentService.getCourses(), {
      errorMessage: "Failed to load enrolled courses",
    });
  }, [loadAvailableCourses, loadEnrolledCourses]);

  const filteredAvailableCourses = availableCourses?.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const currentEnrollment = enrolledCourses?.data || [];

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleEnrollment = async () => {
    if (selectedCourses.length === 0) {
      toast({
        title: "No Courses Selected",
        description: "Please select at least one course to enroll.",
        variant: "destructive",
      });
      return;
    }

    await enroll(() => studentService.enrollCourses({ courseIds: selectedCourses }), {
      successMessage: `Successfully enrolled in ${selectedCourses.length} course(s)`,
      errorMessage: "Failed to enroll in courses",
      onSuccess: () => {
        setSelectedCourses([]);
        // Refresh enrolled courses
        loadEnrolledCourses(() => studentService.getCourses(), {
          errorMessage: "Failed to refresh enrolled courses",
        });
      },
    });
  };

  const totalUnits = currentEnrollment.reduce((sum: number, course: Course) => sum + (course.credits || 0), 0);
  const selectedUnits = selectedCourses.reduce((sum, id) => {
    const course = availableCourses?.find((c) => c.id === id);
    return sum + (course?.credits || 0);
  }, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Course Enrollment</h1>
          <p className="text-muted-foreground">Register for courses for the current semester</p>
        </div>

        {/* Enrollment Period Notice */}
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">Enrollment Period Active</p>
            <p>
              Course registration is open until January 31, 2026. Late enrollment fee of ₦5,000
              applies after this date. Minimum: 12 credits, Maximum: 24 credits per semester.
            </p>
          </div>
        </div>

        {/* Current Enrollment Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Enrolled Courses</CardDescription>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentEnrollment.length}</div>
              <p className="text-xs text-muted-foreground">Confirmed courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Credits</CardDescription>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUnits + selectedUnits}</div>
              <p className="text-xs text-muted-foreground">
                {selectedUnits > 0 && `+${selectedUnits} pending`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Selected Courses</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedCourses.length}</div>
              <p className="text-xs text-muted-foreground">Pending enrollment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Status</CardDescription>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalUnits + selectedUnits >= 12 ? "✓" : "!"}
              </div>
              <p className="text-xs text-muted-foreground">
                {totalUnits + selectedUnits >= 12 ? "Meets minimum" : "Below minimum"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Current Enrollment */}
        <Card>
          <CardHeader>
            <CardTitle>Currently Enrolled</CardTitle>
            <CardDescription>Courses you are already registered for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loadingEnrolled ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                  <p className="text-sm text-muted-foreground mt-2">Loading enrolled courses...</p>
                </div>
              ) : currentEnrollment.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No courses enrolled yet</p>
              ) : (
                currentEnrollment.map((course: Course) => (
                  <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {course.code} - {course.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{course.credits} Credits</p>
                    </div>
                    <Badge className="bg-green-500">
                      Enrolled
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Available Courses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Available Courses</CardTitle>
                <CardDescription>Select courses to add to your enrollment</CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loadingAvailable ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-sm text-muted-foreground mt-4">Loading available courses...</p>
                </div>
              ) : filteredAvailableCourses.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {searchQuery ? "No courses match your search" : "No courses available for enrollment"}
                </p>
              ) : (
                filteredAvailableCourses.map((course) => {
                  const isSelected = selectedCourses.includes(course.id);
                  const availableSpots = (course.capacity || 0) - (course.enrolled || 0);
                  const isAlmostFull = availableSpots <= 5;
                  const scheduleText = course.schedule?.map((s: { day: string; startTime: string; endTime: string }) => `${s.day} ${s.startTime}-${s.endTime}`).join(", ") || "TBA";

                  return (
                    <div
                      key={course.id}
                      className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                        isSelected ? "border-primary bg-primary/5" : "hover:border-muted-foreground/50"
                      }`}
                      onClick={() => toggleCourseSelection(course.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">
                              {course.code} - {course.title}
                            </h3>
                            {isAlmostFull && (
                              <Badge variant="destructive" className="text-xs">
                                Almost Full
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {course.description}
                          </p>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{course.lecturer}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{scheduleText}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <span>{course.credits} Credits</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {course.enrolled || 0}/{course.capacity || 0} Enrolled
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <Button
                            variant={isSelected ? "default" : "outline"}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCourseSelection(course.id);
                            }}
                          >
                            {isSelected ? "Selected" : "Select"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enrollment Actions */}
        {selectedCourses.length > 0 && (
          <Card className="border-primary">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {selectedCourses.length} course(s) selected ({selectedUnits} credits)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total after enrollment: {totalUnits + selectedUnits} credits
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedCourses([])}>
                    Clear Selection
                  </Button>
                  <Button onClick={handleEnrollment} disabled={enrolling}>
                    {enrolling ? "Enrolling..." : "Enroll in Selected Courses"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Minimum credit load: 12 credits per semester</p>
            <p>• Maximum credit load: 24 credits per semester</p>
            <p>• Ensure you have completed all prerequisite courses</p>
            <p>• Check for schedule conflicts before enrolling</p>
            <p>• Late enrollment fee: ₦5,000 after January 31, 2026</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
