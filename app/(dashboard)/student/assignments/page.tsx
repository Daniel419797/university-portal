"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Clock, AlertCircle, CheckCircle, Search, Upload } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { useApi } from "@/hooks/use-api";
import { studentService } from "@/lib/services";
import { Assignment } from "@/lib/types";

export default function StudentAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { data: assignments, isLoading, execute } = useApi<Assignment[]>();

  useEffect(() => {
    execute(() => studentService.getAssignments(), {
      errorMessage: "Failed to load assignments",
    });
  }, [execute]);
  
  const assignmentsList = assignments || [];
  
  const filteredAssignments = assignmentsList.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || assignment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "success"> = {
      pending: "secondary",
      submitted: "secondary",
      graded: "success",
      overdue: "destructive",
    };
    return variants[status] || "default";
  };

  const getStatusIcon = (status: string) => {
    if (status === "graded") return <CheckCircle className="h-4 w-4" />;
    if (status === "overdue") return <AlertCircle className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  // Calculate stats
  const stats = {
    total: assignmentsList.length,
    pending: assignmentsList.filter(a => a.status === "pending").length,
    submitted: assignmentsList.filter(a => a.status === "submitted").length,
    graded: assignmentsList.filter(a => a.status === "graded").length,
  };

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Assignments</h1>
            <p className="text-muted-foreground">Loading assignments...</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-4 bg-muted animate-pulse rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">
            Track and submit your course assignments
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {stats.pending}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {stats.submitted}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Graded</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {stats.graded}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assignments..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="submitted">Submitted</option>
            <option value="graded">Graded</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => {
            const isOverdue = assignment.status === "overdue";
            const isPending = assignment.status === "pending";

            return (
              <Card key={assignment.id} className={isOverdue ? "border-destructive" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      </div>
                      <CardDescription>{assignment.courseName}</CardDescription>
                    </div>
                    <Badge variant={getStatusBadge(assignment.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(assignment.status)}
                        {assignment.status.charAt(0).toUpperCase() +
                          assignment.status.slice(1)}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {assignment.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className={isOverdue ? "text-destructive font-medium" : ""}>
                        Due: {formatDate(assignment.dueDate)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Marks:</span>{" "}
                      <span className="font-medium">{assignment.totalMarks}</span>
                    </div>
                    {assignment.submission && (
                      <div>
                        <span className="text-muted-foreground">Grade:</span>{" "}
                        <span className="font-medium">
                          {assignment.submission.grade || "Pending"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/student/assignments/${assignment.id}`}>
                        View Details
                      </Link>
                    </Button>
                    {isPending && (
                      <Button size="sm" asChild>
                        <Link href={`/student/assignments/${assignment.id}/submit`}>
                          <Upload className="mr-2 h-4 w-4" />
                          Submit
                        </Link>
                      </Button>
                    )}
                    {assignment.submission && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/student/assignments/${assignment.id}/submission`}>
                          View Submission
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredAssignments.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No assignments found</h3>
              <p className="text-muted-foreground text-center">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your filters"
                  : "You don't have any assignments yet"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
