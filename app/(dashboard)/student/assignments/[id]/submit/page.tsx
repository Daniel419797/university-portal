"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Upload, FileText, X, CheckCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SubmitAssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params?.id;
  const { toast } = useToast();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const assignment = {
    id: assignmentId,
    title: "Search Algorithms Implementation",
    course: "CSC 401 - Artificial Intelligence",
    dueDate: "2025-12-05T23:59:00",
    totalMarks: 100,
    maxFileSize: 10, // MB
    allowedFormats: [".zip", ".rar", ".7z"],
  };

  const isOverdue = new Date(assignment.dueDate) < new Date();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > assignment.maxFileSize) {
      toast({
        title: "File Too Large",
        description: `File size must not exceed ${assignment.maxFileSize} MB`,
        variant: "destructive",
      });
      return;
    }

    // Check file format
    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!assignment.allowedFormats.includes(fileExtension)) {
      toast({
        title: "Invalid File Format",
        description: `Only ${assignment.allowedFormats.join(", ")} files are allowed`,
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to submit",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate file upload
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Assignment Submitted",
        description: "Your assignment has been submitted successfully!",
        variant: "success",
      });

      // Redirect to submission view
      router.push(`/student/assignments/${assignmentId}/submission`);
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2) + " MB";
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Submit Assignment</h1>
          <p className="text-muted-foreground">{assignment.title}</p>
        </div>

        {/* Assignment Info */}
        <Card>
          <CardHeader>
            <CardTitle>Assignment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Course</p>
                <p className="font-medium">{assignment.course}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Marks</p>
                <p className="font-medium">{assignment.totalMarks}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Due Date</p>
                <p className="font-medium">
                  {new Date(assignment.dueDate).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <p className={`font-medium ${isOverdue ? "text-red-600" : "text-green-600"}`}>
                  {isOverdue ? "Overdue" : "On Time"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overdue Warning */}
        {isOverdue && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="text-sm text-red-800 dark:text-red-200">
              <p className="font-medium mb-1">Late Submission</p>
              <p>
                This assignment is past its due date. A late submission penalty may apply. Please check
                with your lecturer regarding the penalty policy.
              </p>
            </div>
          </div>
        )}

        {/* Submission Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Submission</CardTitle>
              <CardDescription>
                Maximum file size: {assignment.maxFileSize} MB • Allowed formats:{" "}
                {assignment.allowedFormats.join(", ")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="file">Assignment File *</Label>
                {!selectedFile ? (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      {assignment.allowedFormats.join(", ")} (Max {assignment.maxFileSize} MB)
                    </p>
                    <input
                      type="file"
                      id="file"
                      accept={assignment.allowedFormats.join(",")}
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button type="button" variant="outline" onClick={() => document.getElementById("file")?.click()}>
                      <Upload className="mr-2 h-4 w-4" />
                      Select File
                    </Button>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <Label htmlFor="comments">Comments (Optional)</Label>
                <Textarea
                  id="comments"
                  placeholder="Add any comments or notes about your submission..."
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  You can add notes, explain your approach, or mention any issues you encountered.
                </p>
              </div>

              {/* Submission Declaration */}
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="plagiarism"
                    className="rounded border-gray-300"
                    required
                  />
                  <label htmlFor="plagiarism" className="text-sm">
                    I declare that this is my own work and free from plagiarism
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="guidelines"
                    className="rounded border-gray-300"
                    required
                  />
                  <label htmlFor="guidelines" className="text-sm">
                    I have followed all the assignment guidelines and requirements
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="final"
                    className="rounded border-gray-300"
                    required
                  />
                  <label htmlFor="final" className="text-sm">
                    I understand that this submission is final and cannot be modified after submission
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              size="lg"
              disabled={!selectedFile || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit Assignment
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Important Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Important Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Once submitted, you cannot modify or delete your submission</p>
            <p>• Make sure your file is properly named and contains all required materials</p>
            <p>• Test your ZIP file before submission to ensure it&apos;s not corrupted</p>
            <p>• You will receive an email confirmation after successful submission</p>
            <p>• Contact your lecturer immediately if you encounter any technical issues</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
