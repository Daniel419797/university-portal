"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, Calendar, Clock, Download, MessageSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/use-api";
import { studentService, type AssignmentSubmissionDetails } from "@/lib/services";
import { fileService } from "@/lib/services/sharedService";
import { useToast } from "@/hooks/use-toast";

export default function ViewSubmissionPage() {
  const params = useParams();
  const assignmentId = params?.id as string;

  const { data: submission, isLoading, execute } = useApi<AssignmentSubmissionDetails>();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!assignmentId) return;
    execute(() => studentService.getSubmission(String(assignmentId)), {
      errorMessage: "Failed to load submission",
    });
  }, [assignmentId, execute]);

  const isLate = submission?.submittedAt
    ? new Date(submission.submittedAt) > new Date()
    : false;

  const handleDownload = async (file: { id?: string; url: string; name: string }) => {
    setDownloadingId(file.id || file.url);
    try {
      const blob = file.id
        ? await fileService.downloadFile(file.id)
        : await fetch(file.url).then((res) => {
            if (!res.ok) throw new Error("Download failed");
            return res.blob();
          });

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = file.name || "submission";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast({ title: "Download failed", description: "Unable to download file. Please try again.", variant: "destructive" });
    } finally {
      setDownloadingId(null);
    }
  };

  if (isLoading || !submission) {
    return (
      <DashboardLayout>
        <Card>
          <CardHeader>
            <CardTitle>Loading submission...</CardTitle>
          </CardHeader>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Assignment Submission</h1>
            <p className="text-muted-foreground">{submission?.comment}</p>
          </div>
          <Badge
            className={
              submission?.status === "graded"
                ? "bg-green-500"
                : "bg-yellow-500"
            }
          >
            {submission?.status === "graded" ? (
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
        {submission?.status === "graded" && (
          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Graded
                </span>
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {submission.grade}/{submission.grade ? submission.grade : submission.totalMarks}
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
                {submission?.submittedAt
                  ? new Date(submission.submittedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : ""}
              </p>
              <p className="text-xs text-muted-foreground">
                {submission?.submittedAt
                  ? new Date(submission.submittedAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })
                  : ""}
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
              <p className="font-bold text-sm">{submission?.assignmentId || "N/A"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Submitted File */}
        <Card>
          <CardHeader>
            <CardTitle>Submitted File</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {submission.files?.length ? (
              submission.files.map((file: AssignmentSubmissionDetails["files"][number], idx: number) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{file.size} KB</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(file)}
                    disabled={downloadingId === (file.id || file.url)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {downloadingId === (file.id || file.url) ? "Downloading..." : "Download"}
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No files uploaded.</p>
            )}
          </CardContent>
        </Card>

        {/* Student Comments */}
        {submission.comment && (
          <Card>
            <CardHeader>
              <CardTitle>Submission Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{submission.comment}</p>
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
              {submission?.files?.map((file: AssignmentSubmissionDetails["files"][number], index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded {new Date(submission?.submittedAt || "").toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">Size: {file.size} KB</p>
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
