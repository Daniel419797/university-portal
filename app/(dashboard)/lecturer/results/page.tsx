"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Send } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { lecturerService } from "@/lib/services/lecturerService";
import { Result, Course } from "@/lib/types";

export default function LecturerResultsPage() {
  const [selectedCourse, setSelectedCourse] = useState("");
  
  const { data: results, isLoading, execute } = useApi<Result[]>();
  const { data: courses, execute: executeCourses } = useApi<Course[]>();

  useEffect(() => {
    executeCourses(() => lecturerService.getCourses(), {
      errorMessage: "Failed to load courses"
    });
  }, [executeCourses]);

  useEffect(() => {
    if (selectedCourse) {
      execute(() => lecturerService.getResults(selectedCourse), {
        errorMessage: "Failed to load results"
      });
    }
  }, [execute, selectedCourse]);

  const coursesList = courses || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Results Management</h1>
          <p className="text-muted-foreground">Upload and manage course results</p>
        </div>

        {/* Course Selection */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Select value={selectedCourse} onChange={(e: any) => setSelectedCourse(e.target.value)}>
                  <option value="">Select Course</option>
                  {coursesList.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.code} - {course.title}
                    </option>
                  ))}
                </Select>
              </div>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Import CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        {isLoading ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading results...</p>
            </CardContent>
          </Card>
        ) : !selectedCourse ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Select a course to view results</p>
            </CardContent>
          </Card>
        ) : !results || results.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No results available for this course</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>CSC 401 - Data Structures Results</CardTitle>
                <CardDescription>Enter or edit student results</CardDescription>
              </div>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Submit for Approval
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matric Number</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>CA (30)</TableHead>
                  <TableHead>Exam (70)</TableHead>
                  <TableHead>Total (100)</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-mono">{result.matricNumber}</TableCell>
                    <TableCell className="font-medium">{result.studentName}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="w-20"
                        defaultValue={result.ca}
                        min="0"
                        max="30"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="w-20"
                        defaultValue={result.exam}
                        min="0"
                        max="70"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{result.total}</TableCell>
                    <TableCell>
                      <Badge>{result.grade}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{result.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
