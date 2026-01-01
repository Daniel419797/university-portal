"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, Download, Mail, Eye, Filter } from "lucide-react";

export default function CourseStudentsPage() {
  const params = useParams();
  const router = useRouter();

  // Mock course data
  const course = {
    id: params.id,
    code: "CSC401",
    title: "Software Engineering",
  };

  const students = [
    {
      id: "1",
      name: "John Doe",
      matricNumber: "CS/2021/001",
      email: "john.doe@university.edu",
      level: "400L",
      attendance: 28,
      totalClasses: 30,
      assignmentScore: 85,
      quizScore: 90,
      midtermScore: 88,
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      matricNumber: "CS/2021/002",
      email: "jane.smith@university.edu",
      level: "400L",
      attendance: 27,
      totalClasses: 30,
      assignmentScore: 92,
      quizScore: 88,
      midtermScore: 90,
      status: "active",
    },
    {
      id: "3",
      name: "Mike Johnson",
      matricNumber: "CS/2021/003",
      email: "mike.johnson@university.edu",
      level: "400L",
      attendance: 25,
      totalClasses: 30,
      assignmentScore: 78,
      quizScore: 82,
      midtermScore: 80,
      status: "active",
    },
    {
      id: "4",
      name: "Sarah Williams",
      matricNumber: "CS/2021/004",
      email: "sarah.williams@university.edu",
      level: "400L",
      attendance: 29,
      totalClasses: 30,
      assignmentScore: 95,
      quizScore: 94,
      midtermScore: 96,
      status: "active",
    },
  ];

  const getAttendancePercentage = (attended: number, total: number) => {
    return ((attended / total) * 100).toFixed(1);
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getTotalScore = (assignment: number, quiz: number, midterm: number) => {
    return ((assignment * 0.3 + quiz * 0.2 + midterm * 0.5)).toFixed(1);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{course.code} Students</h1>
              <p className="text-muted-foreground">{course.title}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export List
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Email All
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold">{students.length}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold">
                  {students.filter(s => {
                    const percentage = (s.attendance / s.totalClasses) * 100;
                    return percentage >= 75;
                  }).length}
                </p>
                <p className="text-sm text-muted-foreground">Good Attendance</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold">
                  {(students.reduce((sum, s) => sum + parseFloat(getTotalScore(s.assignmentScore, s.quizScore, s.midtermScore)), 0) / students.length).toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold">
                  {students.filter(s => parseFloat(getTotalScore(s.assignmentScore, s.quizScore, s.midtermScore)) >= 70).length}
                </p>
                <p className="text-sm text-muted-foreground">Passed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Enrolled Students</CardTitle>
                <CardDescription>List of all students in this course</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    className="pl-9 w-[250px]"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Student</th>
                      <th className="text-left p-4 font-medium">Matric Number</th>
                      <th className="text-left p-4 font-medium">Attendance</th>
                      <th className="text-left p-4 font-medium">Assignment</th>
                      <th className="text-left p-4 font-medium">Quiz</th>
                      <th className="text-left p-4 font-medium">Midterm</th>
                      <th className="text-left p-4 font-medium">Total</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => {
                      const attendancePercentage = parseFloat(getAttendancePercentage(student.attendance, student.totalClasses));
                      const totalScore = getTotalScore(student.assignmentScore, student.quizScore, student.midtermScore);
                      
                      return (
                        <tr key={student.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.email}</p>
                            </div>
                          </td>
                          <td className="p-4 font-mono text-sm">{student.matricNumber}</td>
                          <td className="p-4">
                            <div>
                              <p className={`font-bold ${getAttendanceColor(attendancePercentage)}`}>
                                {attendancePercentage}%
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {student.attendance}/{student.totalClasses}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 font-medium">{student.assignmentScore}%</td>
                          <td className="p-4 font-medium">{student.quizScore}%</td>
                          <td className="p-4 font-medium">{student.midtermScore}%</td>
                          <td className="p-4">
                            <Badge variant={parseFloat(totalScore) >= 70 ? "default" : "destructive"}>
                              {totalScore}%
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/lecturer/students/${student.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
