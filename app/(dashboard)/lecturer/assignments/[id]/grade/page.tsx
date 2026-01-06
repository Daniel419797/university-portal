"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Save, Send, AlertCircle } from "lucide-react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/use-api";
import { lecturerService } from "@/lib/services/lecturerService";
import { UploadedFile, AssignmentSubmission, Assignment } from "@/lib/types";

export default function GradeAssignmentPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const assignmentId = params?.id as string;
  const studentId = searchParams?.get("student") as string;

  const { data: submission, isLoading: submissionLoading, execute: executeSubmission } = useApi<AssignmentSubmission>();
  const { data: assignment, isLoading: assignmentLoading, execute: executeAssignment } = useApi<Assignment>();

  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rubricScores, setRubricScores] = useState({
    content: "",
    presentation: "",
    analysis: "",
    references: "",
  });

  useEffect(() => {
    if (assignmentId && studentId) {
      executeSubmission(() => lecturerService.getSubmission(assignmentId, studentId), {
        errorMessage: "Failed to load submission"
      });
      executeAssignment(() => lecturerService.getAssignmentDetails(assignmentId), {
        errorMessage: "Failed to load assignment"
      });
    }
  }, [executeSubmission, executeAssignment, assignmentId, studentId]);

  const isLoading = submissionLoading || assignmentLoading;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading submission...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!submission || !assignment) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Submission or assignment not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const rubric = [
    { id: "content", label: "Content Quality", maxScore: 8, description: "Depth and accuracy of content" },
    { id: "presentation", label: "Presentation", maxScore: 5, description: "Formatting and organization" },
    { id: "analysis", label: "Analysis", maxScore: 5, description: "Critical thinking and analysis" },
    { id: "references", label: "References", maxScore: 2, description: "Quality and relevance of citations" },
  ];

  const totalRubricScore = Object.values(rubricScores).reduce((sum, val) => sum + (parseInt(val) || 0), 0);

  const handleRubricChange = (id: string, value: string) => {
    setRubricScores((prev) => ({ ...prev, [id]: value }));
  };

  const handleUseRubricTotal = () => {
    setScore(totalRubricScore.toString());
    toast({
      title: "Score Updated",
      description: "Total score set to rubric total.",
    });
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your grading has been saved as a draft.",
    });
  };

  const handleSubmitGrade = () => {
    if (!score || parseInt(score) > assignment.totalMarks) {
      toast({
        title: "Invalid Score",
        description: `Please enter a score between 0 and ${assignment.totalMarks}.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Grade Submitted",
      description: "The grade has been submitted successfully and the student has been notified.",
    });

    setTimeout(() => {
      router.push(`/lecturer/assignments/${assignmentId}/submissions`);
    }, 1500);
  };

  const handleDownload = (fileName: string) => {
    toast({
      title: "Downloading File",
      description: `Downloading ${fileName}...`,
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Grade Submission</h1>
          <p className="text-muted-foreground">
            {assignment.courseCode} - {assignment.title}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Grading Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Student Information</span>
                  <Badge variant={submission.isLate ? "destructive" : "default"}>
                    {submission.isLate ? "Late Submission" : "On Time"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{submission.studentName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Matric Number:</span>
                  <span className="font-medium">{submission.matricNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Submitted:</span>
                  <span className="font-medium">
                    {new Date(submission.submittedAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Submitted Files */}
            <Card>
              <CardHeader>
                <CardTitle>Submitted Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {submission.files.map((file: UploadedFile, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleDownload(file.name)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Grading Rubric */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Grading Rubric</CardTitle>
                    <CardDescription>Score each component individually</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleUseRubricTotal}>
                    Use Rubric Total
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {rubric.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <Label htmlFor={item.id} className="font-medium">
                          {item.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">Max: {item.maxScore}</span>
                    </div>
                    <Input
                      id={item.id}
                      type="number"
                      min="0"
                      max={item.maxScore}
                      value={rubricScores[item.id as keyof typeof rubricScores]}
                      onChange={(e) => handleRubricChange(item.id, e.target.value)}
                    />
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Rubric Total:</span>
                    <span className="text-primary">
                      {totalRubricScore}/{assignment.totalMarks}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Final Score and Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Final Score & Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="score">
                    Final Score <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="score"
                      type="number"
                      min="0"
                      max={assignment.totalMarks}
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      className="max-w-[120px]"
                      required
                    />
                    <span className="text-muted-foreground">/ {assignment.totalMarks}</span>
                    {score && assignment.passingMarks && parseInt(score) < assignment.passingMarks && (
                      <Badge variant="destructive" className="ml-2">
                        Below Passing
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Passing mark: {assignment.passingMarks}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback for Student</Label>
                  <Textarea
                    id="feedback"
                    rows={6}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide constructive feedback for the student..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Assignment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Marks:</span>
                  <span className="font-semibold">{assignment.totalMarks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Passing Marks:</span>
                  <span className="font-semibold">{assignment.passingMarks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Score:</span>
                  <span className="font-semibold text-primary">{score || "Not set"}</span>
                </div>
                {score && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Percentage:</span>
                    <span className="font-semibold">
                      {((parseInt(score) / assignment.totalMarks) * 100).toFixed(0)}%
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Grading Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Grading Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Be consistent with grading criteria</p>
                <p>• Provide specific, actionable feedback</p>
                <p>• Highlight both strengths and areas for improvement</p>
                <p>• Use the rubric to ensure fairness</p>
                <p>• Save your work regularly</p>
              </CardContent>
            </Card>

            {/* Warning for Low Scores */}
            {score && assignment.passingMarks && parseInt(score) < assignment.passingMarks && (
              <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                <CardContent className="pt-6">
                  <div className="flex gap-2 text-yellow-800 dark:text-yellow-200">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">Below Passing Score</p>
                      <p>
                        This score is below the passing mark. Ensure your grading is accurate and
                        provide detailed feedback.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button className="w-full" onClick={handleSubmitGrade}>
                <Send className="mr-2 h-4 w-4" />
                Submit Grade
              </Button>
              <Button variant="outline" className="w-full" onClick={handleSaveDraft}>
                <Save className="mr-2 h-4 w-4" />
                Save as Draft
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
