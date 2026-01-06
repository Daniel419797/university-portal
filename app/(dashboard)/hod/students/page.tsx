"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, Users, TrendingUp, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/use-api";
import { hodService } from "@/lib/services/hodBursaryService";

export default function HODStudentsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  
  const { data: students, isLoading, execute } = useApi<Array<{ id: string; name: string; matricNumber: string; level: string; cgpa: number; status: string }>>();

  useEffect(() => {
    execute(() => hodService.getStudents({ 
      level: selectedLevel === "all" ? undefined : selectedLevel,
      search: searchQuery || undefined 
    }), {
      errorMessage: "Failed to load students"
    });
  }, [execute, selectedLevel, searchQuery]);

  const studentsByLevel = {
    "100": students?.filter((s) => s.level === "100").length || 0,
    "200": students?.filter((s) => s.level === "200").length || 0,
    "300": students?.filter((s) => s.level === "300").length || 0,
    "400": students?.filter((s) => s.level === "400").length || 0,
  };

  const averageCGPA = students && students.length > 0
    ? (students.reduce((sum, student) => sum + student.cgpa, 0) / students.length).toFixed(2)
    : "0.00";

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 4.5) return "text-green-600";
    if (cgpa >= 3.5) return "text-blue-600";
    if (cgpa >= 2.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getCGPAClass = (cgpa: number) => {
    if (cgpa >= 4.5) return "First Class";
    if (cgpa >= 3.5) return "Second Class Upper";
    if (cgpa >= 2.5) return "Second Class Lower";
    if (cgpa >= 1.5) return "Third Class";
    return "Pass";
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading students...</p>
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
            <h1 className="text-3xl font-bold">Department Students</h1>
            <p className="text-muted-foreground">Computer Science Department</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export List
            </Button>
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Students</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Average CGPA</CardDescription>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{averageCGPA}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>First Class</CardDescription>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {students?.filter((s) => s.cgpa >= 4.5).length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Active Status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {students?.filter((s) => s.status === "active").length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students by Level */}
        <Card>
          <CardHeader>
            <CardTitle>Students by Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              {Object.entries(studentsByLevel).map(([level, count]) => (
                <div key={level} className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Level {level}</div>
                  <div className="text-2xl font-bold">{count} students</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
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
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="100">Level 100</option>
                <option value="200">Level 200</option>
                <option value="300">Level 300</option>
                <option value="400">Level 400</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Students List</CardTitle>
            <CardDescription>
              Showing {students?.length || 0} students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matric Number</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>CGPA</TableHead>
                  <TableHead>Classification</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!students || students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-mono font-semibold">
                        {student.matricNumber}
                      </TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Level {student.level}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-bold ${getCGPAColor(student.cgpa)}`}>
                          {student.cgpa.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            student.cgpa >= 4.5
                              ? "bg-green-500"
                              : student.cgpa >= 3.5
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                          }
                        >
                          {getCGPAClass(student.cgpa)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs text-muted-foreground">N/A</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={student.status === "active" ? "default" : "secondary"}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/hod/students/${student.id}`}>
                            View Profile
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
