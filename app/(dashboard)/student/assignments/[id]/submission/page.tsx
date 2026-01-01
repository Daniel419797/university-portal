"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, Calendar, Clock, Download, MessageSquare } from "lucide-react";
import { useParams } from "next/navigation";

export default function ViewSubmissionPage() {
  const params = useParams();
  const assignmentId = params?.id;

  const submission = {
    id: "SUB12345",
    assignmentTitle: "Search Algorithms Implementation",
    course: "CSC 401 - Artificial Intelligence",
    submittedDate: "2025-12-03T15:30:00",
    status: "graded", // 'pending', 'graded'
    fileName: "search_algorithms_STU2023001.zip",
    fileSize: "8.5 MB",
    comments: "I've implemented all three algorithms as required. The visualization is included in the Jupyter notebook. I used Python 3.11 and included all dependencies in requirements.txt.",
    grade: 85,
    totalMarks: 100,
    gradedDate: "2025-12-15T10:00:00",
    feedback: "Excellent implementation of all three algorithms. Your code is well-structured and properly commented. The visualization is clear and helpful. The analysis report is thorough. However, the A* heuristic could be optimized further for better performance. Overall, great work!",
    lecturer: "Dr. Michael Chen",
    submissionHistory: [
      {
        date: "2025-12-03T15:30:00",
        action: "Submitted",
        details: "Initial submission uploaded",
      },
      {
        date: "2025-12-15T10:00:00",
        action: "Graded",
        details: "Assignment graded by Dr. Michael Chen",
      },
    ],
  };

  const isLate = new Date(submission.submittedDate) > new Date("2025-12-05T23:59:00");

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Assignment Submission</h1>
            <p className="text-muted-foreground">{submission.assignmentTitle}</p>
          </div>
          <Badge
            className={
              submission.status === "graded"
                ? "bg-green-500"
                : "bg-yellow-500"
            }
          >
            {submission.status === "graded" ? (
              <>
                <CheckCircle className="mr-1 h-3 w-3" />
                Graded
              </>
            ) : (
              <>
                <Clock className="mr-1 h-3 w-3" />
                Pending Review
              </>
            )}
          </Badge>
        </div>

        {/* Grading Results (if graded) */}
        {submission.status === "graded" && (
          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Graded
                </span>
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {submission.grade}/{submission.totalMarks}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium mb-2 text-green-900 dark:text-green-100">
                  Lecturer Feedback:
                </p>
                <p className="text-green-800 dark:text-green-200">{submission.feedback}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-green-700 dark:text-green-300">
                <span>Graded by: {submission.lecturer}</span>
                <span>
                  {new Date(submission.gradedDate).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submission Details */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <p className="text-sm text-muted-foreground">Submission ID</p>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="font-mono font-bold">{submission.id}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <p className="text-sm text-muted-foreground">Submitted</p>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="font-bold">
                {new Date(submission.submittedDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(submission.submittedDate).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <p className="text-sm text-muted-foreground">Status</p>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="font-bold">{isLate ? "Late" : "On Time"}</p>
              <p className="text-xs text-muted-foreground">
                {isLate && "Penalty may apply"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <p className="text-sm text-muted-foreground">Course</p>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="font-bold text-sm">{submission.course}</p>
            </CardContent>
          </Card>
        </div>

        {/* Submitted File */}
        <Card>
          <CardHeader>
            <CardTitle>Submitted File</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{submission.fileName}</p>
                  <p className="text-sm text-muted-foreground">{submission.fileSize}</p>
                </div>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Student Comments */}
        {submission.comments && (
          <Card>
            <CardHeader>
              <CardTitle>Submission Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{submission.comments}</p>
            </CardContent>
          </Card>
        )}

        {/* Submission History */}
        <Card>
          <CardHeader>
            <CardTitle>Submission History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {submission.submissionHistory.map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    {event.action === "Submitted" ? (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <FileText className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{event.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Lecturer
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
        </div>

        {/* Important Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              • Submissions cannot be modified or deleted after the submission deadline
            </p>
            <p>
              • If you believe there&apos;s an error in grading, contact your lecturer within 7 days
            </p>
            <p>• Keep a copy of your submission for your records</p>
            <p>
              • For academic integrity concerns or appeals, contact the Academic Office
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
