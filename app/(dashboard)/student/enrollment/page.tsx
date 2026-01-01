"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Users, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function EnrollmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const { toast } = useToast();

  const availableCourses = [
    {
      code: "CSC 401",
      title: "Artificial Intelligence",
      units: 3,
      lecturer: "Dr. Michael Chen",
      schedule: "Mon, Wed 10:00 AM",
      capacity: 50,
      enrolled: 42,
      prerequisite: "CSC 301",
      description: "Introduction to AI concepts, machine learning, and neural networks",
    },
    {
      code: "CSC 403",
      title: "Compiler Construction",
      units: 3,
      lecturer: "Prof. Sarah Johnson",
      schedule: "Tue, Thu 2:00 PM",
      capacity: 45,
      enrolled: 38,
      prerequisite: "CSC 303",
      description: "Design and implementation of compilers, lexical and syntax analysis",
    },
    {
      code: "CSC 405",
      title: "Computer Graphics",
      units: 3,
      lecturer: "Dr. David Williams",
      schedule: "Mon, Wed 2:00 PM",
      capacity: 40,
      enrolled: 35,
      prerequisite: "MTH 201",
      description: "3D graphics, transformations, rendering techniques",
    },
    {
      code: "CSC 407",
      title: "Software Project Management",
      units: 2,
      lecturer: "Mrs. Emily Davis",
      schedule: "Fri 10:00 AM",
      capacity: 60,
      enrolled: 55,
      prerequisite: "CSC 305",
      description: "Project planning, risk management, Agile methodologies",
    },
    {
      code: "CSC 409",
      title: "Cloud Computing",
      units: 3,
      lecturer: "Dr. James Wilson",
      schedule: "Tue, Thu 10:00 AM",
      capacity: 50,
      enrolled: 48,
      prerequisite: "CSC 307",
      description: "Cloud architecture, AWS, Azure, containerization",
    },
    {
      code: "CSC 411",
      title: "Cybersecurity",
      units: 3,
      lecturer: "Prof. Linda Brown",
      schedule: "Mon, Wed 12:00 PM",
      capacity: 45,
      enrolled: 40,
      prerequisite: "CSC 307",
      description: "Network security, cryptography, ethical hacking",
    },
  ];

  const currentEnrollment = [
    {
      code: "CSC 401",
      title: "Artificial Intelligence",
      units: 3,
      status: "confirmed",
    },
    {
      code: "CSC 403",
      title: "Compiler Construction",
      units: 3,
      status: "confirmed",
    },
  ];

  const filteredCourses = availableCourses.filter(
    (course) =>
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCourseSelection = (courseCode: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseCode)
        ? prev.filter((code) => code !== courseCode)
        : [...prev, courseCode]
    );
  };

  const handleEnrollment = () => {
    if (selectedCourses.length === 0) {
      toast({
        title: "No Courses Selected",
        description: "Please select at least one course to enroll.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Enrollment Successful",
      description: `You have been enrolled in ${selectedCourses.length} course(s).`,
      variant: "success",
    });

    setSelectedCourses([]);
  };

  const totalUnits = currentEnrollment.reduce((sum, course) => sum + course.units, 0);
  const selectedUnits = selectedCourses.reduce((sum, code) => {
    const course = availableCourses.find((c) => c.code === code);
    return sum + (course?.units || 0);
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
              applies after this date. Minimum: 12 units, Maximum: 24 units per semester.
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
              <CardDescription>Total Units</CardDescription>
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
              {currentEnrollment.map((course) => (
                <div key={course.code} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      {course.code} - {course.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{course.units} Units</p>
                  </div>
                  <Badge className="bg-green-500">
                    {course.status}
                  </Badge>
                </div>
              ))}
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
              {filteredCourses.map((course) => {
                const isSelected = selectedCourses.includes(course.code);
                const availableSpots = course.capacity - course.enrolled;
                const isAlmostFull = availableSpots <= 5;

                return (
                  <div
                    key={course.code}
                    className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                      isSelected ? "border-primary bg-primary/5" : "hover:border-muted-foreground/50"
                    }`}
                    onClick={() => toggleCourseSelection(course.code)}
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
                            <span>{course.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span>{course.units} Units</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {course.enrolled}/{course.capacity} Enrolled
                            </span>
                          </div>
                        </div>
                        {course.prerequisite && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Prerequisite: {course.prerequisite}
                          </p>
                        )}
                      </div>
                      <div className="ml-4">
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCourseSelection(course.code);
                          }}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                    {selectedCourses.length} course(s) selected ({selectedUnits} units)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total after enrollment: {totalUnits + selectedUnits} units
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedCourses([])}>
                    Clear Selection
                  </Button>
                  <Button onClick={handleEnrollment}>Enroll in Selected Courses</Button>
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
            <p>• Minimum credit load: 12 units per semester</p>
            <p>• Maximum credit load: 24 units per semester</p>
            <p>• Ensure you have completed all prerequisite courses</p>
            <p>• Check for schedule conflicts before enrolling</p>
            <p>
              • Course changes allowed within the first 2 weeks of the semester (add/drop period)
            </p>
            <p>• Contact your academic advisor for guidance on course selection</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
