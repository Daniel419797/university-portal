"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Search, Clock, CheckCircle, AlertCircle, Filter } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/use-api";
import { lecturerService } from "@/lib/services/lecturerService";
import { AssignmentSubmission, Assignment } from "@/lib/types";

interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  matricNumber: string;
  submittedAt: string;
  status: "pending" | "graded" | "late";
  score?: number;
  files: string[];
  isLate: boolean;
}

export default function SubmissionsPage() {
  const params = useParams();
  const assignmentId = params?.id as string;
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const { data: submissionsData, isLoading, execute } = useApi<import("@/lib/services/lecturerService").SubmissionsResponse>();
  const { data: assignmentData, isLoading: assignmentLoading } = useApi<Assignment>();

  useEffect(() => {
    if (assignmentId) {
      execute(() => lecturerService.getSubmissions(assignmentId), {
        errorMessage: "Failed to load submissions"
      });
    }
  }, [execute, assignmentId]);

  useEffect(() => {
    if (assignmentId) {
      lecturerService.getAssignmentDetails(assignmentId).then(data => {
        // This would set assignment data, but for now we'll keep the fallback
      }).catch(() => {
        // Keep fallback on error
      });
    }
  }, [assignmentId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading submissions...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!submissionsData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Submissions not found</p>
        </div>
      </DashboardLayout>
    );
  }

  // No assignment info in SubmissionsResponse, so fetch assignment details separately
  const submissions = submissionsData.submissions;

  // Fallback assignment info (remove when assignment details API is working)
  const assignmentDetails = assignmentData || { courseCode: "", title: "", totalMarks: 100 };

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      (submission.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (submission.matricNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesFilter = filterStatus === "all" || submission.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return "default";
      case "pending":
        return "secondary";
      case "late":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "graded":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "late":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleDownloadAll = () => {
    toast({
      title: "Downloading Submissions",
      description: "All submissions are being downloaded as a ZIP file.",
    });
  };

  const handleBulkGrade = () => {
    toast({
      title: "Bulk Grading",
      description: "Opening bulk grading interface...",
    });
  };

  const stats = {
    total: submissions.length,
    graded: submissions.filter((s) => s.status === "graded").length,
    pending: submissions.filter((s) => s.status === "pending").length,
    // 'late' not available, set to 0 or compute if due date is available
    late: 0,
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Assignment Submissions</h1>
          <p className="text-muted-foreground">
            {assignmentDetails.courseCode} - {assignmentDetails.title}
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Submissions</CardDescription>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Graded</CardDescription>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.graded}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.graded / stats.total) * 100).toFixed(0)}% complete
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Pending</CardDescription>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Late Submissions</CardDescription>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.late}</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name or matric number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="px-4 py-2 border rounded-md bg-background"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="graded">Graded</option>
                  <option value="pending">Pending</option>
                  <option value="late">Late</option>
                </select>
                <Button variant="outline" onClick={handleDownloadAll}>
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
                <Button onClick={handleBulkGrade}>Bulk Grade</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Submissions</CardTitle>
            <CardDescription>
              Showing {filteredSubmissions.length} of {submissions.length} submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <div
                  key={submission.studentId}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">{submission.studentName}</h4>
                      <Badge variant={getStatusBadge(submission.status || 'pending')} className="flex items-center gap-1">
                        {getStatusIcon(submission.status || 'pending')}
                        {submission.status || 'pending'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Matric No: {submission.matricNumber}</p>
                      <p>
                        Submitted: {new Date(submission.submittedAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p>Files: {submission.files.map(f => f.name).join(", ")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {submission.grade !== undefined && (
                      <div className="text-center">
                        <div className="text-2xl font-bold">{submission.grade}</div>
                        <div className="text-xs text-muted-foreground">/{assignmentDetails.totalMarks}</div>
                      </div>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/lecturer/assignments/${assignmentId}/grade?student=${submission.studentId}`}>
                        {submission.status === "graded" ? "View Grade" : "Grade Now"}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}

              {filteredSubmissions.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No submissions found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "Try adjusting your search query"
                      : "Students haven't submitted yet"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <Button variant="outline" asChild>
          <Link href={`/lecturer/assignments/${assignmentId}`}>
            Back to Assignment Details
          </Link>
        </Button>
      </div>
    </DashboardLayout>
  );
}
