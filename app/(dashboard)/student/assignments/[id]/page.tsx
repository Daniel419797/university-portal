"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, AlertCircle, Upload, CheckCircle, Clock } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useApi } from "@/hooks/use-api";
import { studentService } from "@/lib/services/studentService";
import { Assignment } from "@/lib/types";

export default function AssignmentDetailsPage() {
  const params = useParams();
  const assignmentId = params?.id as string;

  const { data: assignment, isLoading, execute } = useApi<Assignment>();

  useEffect(() => {
    if (assignmentId) {
      execute(() => studentService.getAssignmentDetails(assignmentId), {
        errorMessage: "Failed to load assignment details"
      });
    }
  }, [execute, assignmentId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading assignment...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!assignment) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Assignment not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const isOverdue = new Date(assignment.dueDate) < new Date();
  const daysRemaining = Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold">{assignment.title}</h1>
              <p className="text-muted-foreground">{assignment.course}</p>
            </div>
            <Badge className="text-lg px-4 py-1">{assignment.totalMarks} Marks</Badge>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Due Date</CardDescription>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                {isOverdue ? "Overdue" : `${daysRemaining} days remaining`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Submission Status</CardDescription>
              {assignment.submissionStatus === "submitted" ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : assignment.submissionStatus === "graded" ? (
                <CheckCircle className="h-4 w-4 text-blue-500" />
              ) : (
                <Clock className="h-4 w-4 text-yellow-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {assignment.submissionStatus === "submitted"
                  ? "Submitted"
                  : assignment.submissionStatus === "graded"
                  ? "Graded"
                  : "Not Submitted"}
              </div>
              <p className="text-xs text-muted-foreground">
                {assignment.submittedDate
                  ? new Date(assignment.submittedDate).toLocaleDateString()
                  : "No submission yet"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Submission Format</CardDescription>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">ZIP</div>
              <p className="text-xs text-muted-foreground">Max 10 MB</p>
            </CardContent>
          </Card>
        </div>

        {/* Warning if overdue */}
        {isOverdue && !assignment.submissionStatus && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-800 dark:text-red-200">
              <p className="font-medium mb-1">Assignment Overdue</p>
              <p>
                This assignment is past its due date. Late submissions may incur a penalty. Contact
                your lecturer if you need an extension.
              </p>
            </div>
          </div>
        )}

        {/* Deadline reminder */}
        {!isOverdue && daysRemaining <= 3 && !assignment.submissionStatus && (
          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <p className="font-medium mb-1">Deadline Approaching</p>
              <p>
                This assignment is due in {daysRemaining} day{daysRemaining !== 1 && "s"}. Make sure to
                submit before the deadline.
              </p>
            </div>
          </div>
        )}

        {/* Assignment Description */}
        <Card>
          <CardHeader>
            <CardTitle>Assignment Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{assignment.description}</p>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 list-decimal list-inside">
              {(assignment.instructions || []).map((instruction, index) => (
                <li key={index} className="text-muted-foreground">
                  {instruction}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Submission Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {(assignment.requirements || []).map((requirement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-muted-foreground">{requirement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Lecturer Info */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{assignment.lecturer}</p>
                <p className="text-sm text-muted-foreground">Course Lecturer</p>
              </div>
              <Button variant="outline">Send Message</Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {!assignment.submissionStatus ? (
            <Button className="flex-1" size="lg" asChild>
              <Link href={`/student/assignments/${assignmentId}/submit`}>
                <Upload className="mr-2 h-4 w-4" />
                Submit Assignment
              </Link>
            </Button>
          ) : (
            <Button className="flex-1" size="lg" variant="outline" asChild>
              <Link href={`/student/assignments/${assignmentId}/submission`}>
                <FileText className="mr-2 h-4 w-4" />
                View Submission
              </Link>
            </Button>
          )}
          <Button variant="outline" size="lg">
            <FileText className="mr-2 h-4 w-4" />
            Download Brief
          </Button>
        </div>

        {/* Grading Info (if graded) */}
        {assignment.submissionStatus === "graded" && (
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Graded
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Your Score:</span>
                <span className="text-3xl font-bold text-green-600">
                  {assignment.grade}/{assignment.totalMarks}
                </span>
              </div>
              {assignment.feedback && (
                <div>
                  <p className="font-medium mb-2">Lecturer Feedback:</p>
                  <p className="text-muted-foreground">{assignment.feedback}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
