"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, Calendar } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { lecturerService } from "@/lib/services/lecturerService";

export default function LecturerAttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState<Array<{ id: string; code: string; name: string }>>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<Array<{ id: string; matricNumber: string; studentName: string; status: string; percentage?: number }>>([]);
  
  const { data: attendanceData, isLoading, execute } = useApi<{ courses: Array<{ courseCode: string; courseTitle: string; totalClasses: number; sessions: Array<{ date: string; attendees: number }> }> }>();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "late":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800">Present</Badge>;
      case "absent":
        return <Badge className="bg-red-100 text-red-800">Absent</Badge>;
      case "late":
        return <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  useEffect(() => {
    execute(() => lecturerService.getAttendance(), {
      errorMessage: "Failed to load attendance records"
    }).then((data) => {
      if (data) {
        // Extract courses from attendance data
        const courseList = data.courses.map(course => ({
          id: course.courseCode,
          code: course.courseCode,
          name: course.courseTitle
        }));
        setCourses(courseList);
      }
    });
  }, [execute]);

  // Load students when course is selected
  useEffect(() => {
    if (selectedCourse) {
      lecturerService.getCourseStudents(selectedCourse).then((data) => {
        // Transform the data to match our attendance records format
        const studentRecords = data.students.map(student => ({
          id: student.id,
          matricNumber: student.matricNumber,
          studentName: student.name,
          status: "present" as const, // Default to present, will be updated when marking attendance
          percentage: student.attendance
        }));
        setAttendanceRecords(studentRecords);
      }).catch(() => {
        // Fallback to empty array on error
        setAttendanceRecords([]);
      });
    }
  }, [selectedCourse]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading attendance...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">Mark and track student attendance</p>
        </div>

        {/* Course and Date Selection */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Course</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.code} - {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-10"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Students</CardDescription>
              <CardTitle className="text-3xl">
                {attendanceRecords.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Present</CardDescription>
              <CardTitle className="text-3xl text-green-500">
                {attendanceRecords.filter((r) => r.status === "present").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Absent</CardDescription>
              <CardTitle className="text-3xl text-red-500">
                {attendanceRecords.filter((r) => r.status === "absent").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Late</CardDescription>
              <CardTitle className="text-3xl text-yellow-500">
                {attendanceRecords.filter((r) => r.status === "late").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Attendance Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Mark Attendance</CardTitle>
              <Button>Save Attendance</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matric Number</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono">{record.matricNumber}</TableCell>
                    <TableCell className="font-medium">{record.studentName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        {getStatusBadge(record.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Present
                        </Button>
                        <Button variant="outline" size="sm">
                          Absent
                        </Button>
                        <Button variant="outline" size="sm">
                          Late
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="outline">Mark All Present</Button>
          <Button variant="outline" asChild>
            <Link href="/lecturer/attendance/history">View Attendance History</Link>
          </Button>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
