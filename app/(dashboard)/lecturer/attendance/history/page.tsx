"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Download, Search, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AttendanceHistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const courses = [
    { id: "1", code: "CSC 401", name: "Data Structures" },
    { id: "2", code: "CSC 301", name: "Database Systems" },
    { id: "3", code: "CSC 201", name: "OOP" },
  ];

  const attendanceHistory = [
    {
      id: "1",
      date: "2026-01-01",
      course: "CSC 401",
      totalStudents: 45,
      present: 42,
      absent: 2,
      late: 1,
      attendanceRate: 93.3,
    },
    {
      id: "2",
      date: "2025-12-30",
      course: "CSC 401",
      totalStudents: 45,
      present: 40,
      absent: 4,
      late: 1,
      attendanceRate: 88.9,
    },
    {
      id: "3",
      date: "2025-12-28",
      course: "CSC 301",
      totalStudents: 58,
      present: 55,
      absent: 2,
      late: 1,
      attendanceRate: 94.8,
    },
    {
      id: "4",
      date: "2025-12-27",
      course: "CSC 401",
      totalStudents: 45,
      present: 43,
      absent: 2,
      late: 0,
      attendanceRate: 95.6,
    },
    {
      id: "5",
      date: "2025-12-26",
      course: "CSC 201",
      totalStudents: 62,
      present: 58,
      absent: 3,
      late: 1,
      attendanceRate: 93.5,
    },
  ];

  const filteredHistory = attendanceHistory.filter(
    (record) =>
      (selectedCourse === "all" || record.course.includes(selectedCourse)) &&
      (searchQuery === "" ||
        record.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.date.includes(searchQuery))
  );

  const overallStats = {
    totalSessions: attendanceHistory.length,
    averageAttendance: (
      attendanceHistory.reduce((sum, record) => sum + record.attendanceRate, 0) /
      attendanceHistory.length
    ).toFixed(1),
    totalPresent: attendanceHistory.reduce((sum, record) => sum + record.present, 0),
    totalAbsent: attendanceHistory.reduce((sum, record) => sum + record.absent, 0),
  };

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Attendance History</h1>
            <p className="text-muted-foreground">View past attendance records</p>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
        </div>

        {/* Overall Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Sessions</CardDescription>
              <CardTitle className="text-3xl">{overallStats.totalSessions}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Average Attendance</CardDescription>
              <CardTitle className="text-3xl text-green-500">
                {overallStats.averageAttendance}%
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Present</CardDescription>
              <CardTitle className="text-3xl">{overallStats.totalPresent}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Absent</CardDescription>
              <CardTitle className="text-3xl text-red-500">{overallStats.totalAbsent}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by course or date..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="all">All Courses</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.code}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Attendance History Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>Historical attendance data</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Total Students</TableHead>
                  <TableHead>Present</TableHead>
                  <TableHead>Absent</TableHead>
                  <TableHead>Late</TableHead>
                  <TableHead>Attendance Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(record.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{record.course}</TableCell>
                    <TableCell>{record.totalStudents}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">{record.present}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">{record.absent}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{record.late}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TrendingUp className={`h-4 w-4 ${getAttendanceColor(record.attendanceRate)}`} />
                        <span className={`font-semibold ${getAttendanceColor(record.attendanceRate)}`}>
                          {record.attendanceRate.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
