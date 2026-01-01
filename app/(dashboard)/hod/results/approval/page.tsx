"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileCheck, CheckCircle, XCircle, Eye } from "lucide-react";

export default function HODResultsApprovalPage() {
  const pendingResults = [
    {
      id: "1",
      courseCode: "CSC 401",
      courseName: "Data Structures and Algorithms",
      lecturer: "Dr. Michael Anderson",
      studentsCount: 45,
      submittedAt: "2026-01-01",
      status: "pending",
    },
    {
      id: "2",
      courseCode: "CSC 301",
      courseName: "Database Management Systems",
      lecturer: "Prof. Sarah Thompson",
      studentsCount: 52,
      submittedAt: "2025-12-30",
      status: "pending",
    },
  ];

  const approvedResults = [
    {
      id: "3",
      courseCode: "CSC 201",
      courseName: "Object-Oriented Programming",
      lecturer: "Dr. David Martinez",
      studentsCount: 58,
      approvedAt: "2025-12-28",
      approvedBy: "You",
      status: "approved",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Results Approval</h1>
          <p className="text-muted-foreground">Review and approve course results</p>
        </div>

        {/* Pending Results */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
                  Pending Approval
                </CardTitle>
                <CardDescription>Results awaiting your approval</CardDescription>
              </div>
              <Badge variant="secondary">{pendingResults.length} pending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Lecturer</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-mono font-medium">{result.courseCode}</TableCell>
                    <TableCell>{result.courseName}</TableCell>
                    <TableCell>{result.lecturer}</TableCell>
                    <TableCell>{result.studentsCount}</TableCell>
                    <TableCell>{new Date(result.submittedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-3 w-3" />
                          Review
                        </Button>
                        <Button variant="default" size="sm" className="bg-green-500 hover:bg-green-600">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm">
                          <XCircle className="mr-1 h-3 w-3" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Approved Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Recently Approved
            </CardTitle>
            <CardDescription>Results you have approved</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Lecturer</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Approved Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-mono font-medium">{result.courseCode}</TableCell>
                    <TableCell>{result.courseName}</TableCell>
                    <TableCell>{result.lecturer}</TableCell>
                    <TableCell>{result.studentsCount}</TableCell>
                    <TableCell>{new Date(result.approvedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Approved</Badge>
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
