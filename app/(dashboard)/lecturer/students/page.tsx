"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Mail, Eye } from "lucide-react";

interface Student {
  id: string;
  name: string;
  matricNumber: string;
  level: string;
  department: string;
  email: string;
  phone: string;
  cgpa: number;
}

export default function LecturerStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const students: Student[] = [
    {
      id: "1",
      name: "John Doe",
      matricNumber: "STU/2023/001",
      level: "400",
      department: "Computer Science",
      email: "john.doe@university.edu",
      phone: "+234 801 234 5678",
      cgpa: 4.5,
    },
    {
      id: "2",
      name: "Jane Smith",
      matricNumber: "STU/2023/002",
      level: "400",
      department: "Computer Science",
      email: "jane.smith@university.edu",
      phone: "+234 802 345 6789",
      cgpa: 4.7,
    },
    {
      id: "3",
      name: "Michael Johnson",
      matricNumber: "STU/2023/005",
      level: "300",
      department: "Computer Science",
      email: "michael.j@university.edu",
      phone: "+234 803 456 7890",
      cgpa: 4.2,
    },
  ];

  const courses = [
    { id: "all", name: "All Courses" },
    { id: "1", name: "CSC 401 - Data Structures" },
    { id: "2", name: "CSC 301 - Database Systems" },
    { id: "3", name: "CSC 201 - OOP" },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matricNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">View and manage your course students</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or matric number..."
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
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student List ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matric Number</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>CGPA</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-mono">{student.matricNumber}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">Level {student.level}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={student.cgpa >= 4.5 ? "default" : "secondary"}
                      >
                        {student.cgpa.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {student.email}
                    </TableCell>
                    <TableCell>
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
