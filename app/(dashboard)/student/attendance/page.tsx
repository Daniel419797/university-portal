"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Download, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AttendancePage() {
  const currentSession = "2025/2026";
  const currentSemester = "First Semester";

  const attendanceData = [
    {
      code: "CSC 401",
      title: "Artificial Intelligence",
      lecturer: "Dr. Michael Chen",
      totalClasses: 24,
      attended: 22,
      percentage: 91.67,
      status: "excellent",
      records: [
        { date: "2025-11-05", status: "present", topic: "Introduction to AI" },
        { date: "2025-11-12", status: "present", topic: "Search Algorithms" },
        { date: "2025-11-19", status: "absent", topic: "Knowledge Representation" },
        { date: "2025-11-26", status: "present", topic: "Machine Learning Basics" },
        { date: "2025-12-03", status: "present", topic: "Neural Networks" },
        { date: "2025-12-10", status: "absent", topic: "Deep Learning" },
      ],
    },
    {
      code: "CSC 403",
      title: "Compiler Construction",
      lecturer: "Prof. Sarah Johnson",
      totalClasses: 20,
      attended: 19,
      percentage: 95,
      status: "excellent",
      records: [
        { date: "2025-11-06", status: "present", topic: "Lexical Analysis" },
        { date: "2025-11-13", status: "present", topic: "Syntax Analysis" },
        { date: "2025-11-20", status: "present", topic: "Semantic Analysis" },
        { date: "2025-11-27", status: "present", topic: "Code Generation" },
        { date: "2025-12-04", status: "present", topic: "Code Optimization" },
        { date: "2025-12-11", status: "absent", topic: "Final Review" },
      ],
    },
    {
      code: "CSC 405",
      title: "Computer Graphics",
      lecturer: "Dr. David Williams",
      totalClasses: 22,
      attended: 16,
      percentage: 72.73,
      status: "warning",
      records: [
        { date: "2025-11-07", status: "present", topic: "Graphics Fundamentals" },
        { date: "2025-11-14", status: "absent", topic: "2D Transformations" },
        { date: "2025-11-21", status: "present", topic: "3D Transformations" },
        { date: "2025-11-28", status: "absent", topic: "Viewing Pipeline" },
        { date: "2025-12-05", status: "present", topic: "Lighting and Shading" },
        { date: "2025-12-12", status: "absent", topic: "Texture Mapping" },
      ],
    },
    {
      code: "CSC 407",
      title: "Software Project Management",
      lecturer: "Mrs. Emily Davis",
      totalClasses: 18,
      attended: 12,
      percentage: 66.67,
      status: "critical",
      records: [
        { date: "2025-11-08", status: "present", topic: "Project Planning" },
        { date: "2025-11-15", status: "absent", topic: "Risk Management" },
        { date: "2025-11-22", status: "absent", topic: "Team Management" },
        { date: "2025-11-29", status: "present", topic: "Quality Assurance" },
        { date: "2025-12-06", status: "absent", topic: "Project Monitoring" },
        { date: "2025-12-13", status: "present", topic: "Agile Methods" },
      ],
    },
  ];

  const totalClasses = attendanceData.reduce((sum, course) => sum + course.totalClasses, 0);
  const totalAttended = attendanceData.reduce((sum, course) => sum + course.attended, 0);
  const overallPercentage = ((totalAttended / totalClasses) * 100).toFixed(2);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-500";
      case "good":
        return "bg-blue-500";
      case "warning":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (percentage: number) => {
    if (percentage >= 90) return { text: "Excellent", color: "excellent" };
    if (percentage >= 75) return { text: "Good", color: "good" };
    if (percentage >= 70) return { text: "Warning", color: "warning" };
    return { text: "Critical", color: "critical" };
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Attendance Record</h1>
            <p className="text-muted-foreground">
              {currentSession} - {currentSemester}
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Overall Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Classes</CardDescription>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClasses}</div>
              <p className="text-xs text-muted-foreground">All courses combined</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Classes Attended</CardDescription>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalAttended}</div>
              <p className="text-xs text-muted-foreground">Present in classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Classes Missed</CardDescription>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{totalClasses - totalAttended}</div>
              <p className="text-xs text-muted-foreground">Absent from classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Overall Attendance</CardDescription>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallPercentage}%</div>
              <p className="text-xs text-muted-foreground">
                {getStatusText(parseFloat(overallPercentage)).text} standing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Warning Notice */}
        {parseFloat(overallPercentage) < 75 && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="text-sm text-red-800 dark:text-red-200">
              <p className="font-medium mb-1">Low Attendance Warning</p>
              <p>
                Your attendance is below the required 75% threshold. You may not be eligible to sit for examinations if attendance doesn&apos;t improve.
              </p>
            </div>
          </div>
        )}

        {/* Course Attendance */}
        <div className="space-y-4">
          {attendanceData.map((course) => {
            const status = getStatusText(course.percentage);
            return (
              <Card key={course.code}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>
                        {course.code} - {course.title}
                      </CardTitle>
                      <CardDescription>Lecturer: {course.lecturer}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(status.color)}>{status.text}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="summary">
                    <TabsList>
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                      <TabsTrigger value="records">Attendance Records</TabsTrigger>
                    </TabsList>

                    <TabsContent value="summary" className="space-y-4 mt-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold">{course.totalClasses}</p>
                          <p className="text-sm text-muted-foreground">Total Classes</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">{course.attended}</p>
                          <p className="text-sm text-muted-foreground">Attended</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-red-600">
                            {course.totalClasses - course.attended}
                          </p>
                          <p className="text-sm text-muted-foreground">Missed</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Attendance Rate</span>
                          <span className="font-semibold">{course.percentage.toFixed(2)}%</span>
                        </div>
                        <Progress value={course.percentage} className="h-3" />
                        <p className="text-xs text-muted-foreground mt-2">
                          {course.percentage >= 75
                            ? "✓ Meets minimum requirement (75%)"
                            : "✗ Below minimum requirement (75%)"}
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="records" className="mt-4">
                      <div className="space-y-2">
                        {course.records.map((record, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              {record.status === "present" ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500" />
                              )}
                              <div>
                                <p className="font-medium">{record.topic}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(record.date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant={record.status === "present" ? "default" : "destructive"}
                              className={record.status === "present" ? "bg-green-500" : ""}
                            >
                              {record.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Important Information */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Minimum attendance requirement: 75% for all courses</p>
            <p>• Students below 75% may not be eligible to sit for examinations</p>
            <p>• Medical or official absences must be documented and submitted to the Academic Office</p>
            <p>• Attendance is marked within the first 15 minutes of each class</p>
            <p>• For discrepancies in attendance records, contact your course lecturer within 48 hours</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
