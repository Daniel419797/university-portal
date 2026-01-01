"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Users, Award, Edit, Trash2, Clock, Download } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function AssignmentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params?.id;
  const { toast } = useToast();

  const assignment = {
    id: assignmentId,
    title: "Final Project Report",
    courseCode: "CSC 401",
    courseName: "Artificial Intelligence",
    description:
      "Write a comprehensive report on your final project. The report should include introduction, methodology, implementation details, results, and conclusion.",
    instructions:
      "1. Use IEEE format for your report\n2. Maximum 15 pages\n3. Include code snippets where necessary\n4. Add references for any external sources\n5. Submit as PDF only",
    totalMarks: 20,
    passingMarks: 12,
    dueDate: "2026-01-25T23:59:00",
    createdAt: "2026-01-01T10:00:00",
    status: "active", // active, closed, draft
    totalStudents: 42,
    submittedCount: 28,
    gradedCount: 15,
    pendingCount: 13,
    lateSubmissions: 3,
    maxFileSize: 10, // MB
    allowedFormats: ["pdf", "doc", "docx"],
    lateSubmissionAllowed: true,
    latePenalty: 10, // percentage
  };

  const stats = [
    {
      label: "Total Students",
      value: assignment.totalStudents,
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Submitted",
      value: assignment.submittedCount,
      icon: FileText,
      color: "text-green-600",
    },
    {
      label: "Graded",
      value: assignment.gradedCount,
      icon: Award,
      color: "text-purple-600",
    },
    {
      label: "Pending",
      value: assignment.pendingCount,
      icon: Clock,
      color: "text-yellow-600",
    },
  ];

  const submissionRate = ((assignment.submittedCount / assignment.totalStudents) * 100).toFixed(0);
  const gradingRate = ((assignment.gradedCount / assignment.submittedCount) * 100).toFixed(0);

  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete this assignment? This action cannot be undone.");
    if (!confirmed) return;

    toast({
      title: "Assignment Deleted",
      description: "The assignment has been deleted successfully.",
      variant: "destructive",
    });

    setTimeout(() => {
      router.push("/lecturer/assignments");
    }, 1500);
  };

  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "Assignment data is being exported as CSV.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{assignment.title}</h1>
            <p className="text-muted-foreground">
              {assignment.courseCode} - {assignment.courseName}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Status Banner */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className="text-lg px-4 py-1">
                  {assignment.status === "active" ? "Active" : assignment.status === "closed" ? "Closed" : "Draft"}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Created on {new Date(assignment.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Due Date</div>
                <div className="text-lg font-semibold">
                  {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  at {new Date(assignment.dueDate).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                {stat.label === "Submitted" && (
                  <p className="text-xs text-muted-foreground mt-1">{submissionRate}% submission rate</p>
                )}
                {stat.label === "Graded" && assignment.submittedCount > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">{gradingRate}% graded</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Late Submissions Alert */}
        {assignment.lateSubmissions > 0 && (
          <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <Clock className="h-5 w-5" />
                <span className="font-medium">
                  {assignment.lateSubmissions} late submission{assignment.lateSubmissions !== 1 ? "s" : ""}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assignment Details Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{assignment.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grading Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Marks:</span>
                  <span className="font-medium">{assignment.totalMarks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Passing Marks:</span>
                  <span className="font-medium">{assignment.passingMarks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Average Score:</span>
                  <span className="font-medium">{assignment.gradedCount > 0 ? "16.5" : "N/A"}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Instructions Tab */}
          <TabsContent value="instructions">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Instructions</CardTitle>
                <CardDescription>Detailed instructions for students</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-muted-foreground">{assignment.instructions}</pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Submission Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Maximum File Size:</span>
                  <span className="font-medium">{assignment.maxFileSize} MB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Allowed Formats:</span>
                  <span className="font-medium">{assignment.allowedFormats.join(", ").toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Late Submission:</span>
                  <span className="font-medium">{assignment.lateSubmissionAllowed ? "Allowed" : "Not Allowed"}</span>
                </div>
                {assignment.lateSubmissionAllowed && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Late Penalty:</span>
                    <span className="font-medium">{assignment.latePenalty}% deduction</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visibility & Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge>{assignment.status}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium">
                    {new Date(assignment.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Button className="h-20" size="lg" asChild>
            <Link href={`/lecturer/assignments/${assignmentId}/submissions`}>
              <FileText className="mr-2 h-5 w-5" />
              View All Submissions ({assignment.submittedCount})
            </Link>
          </Button>
          <Button className="h-20" variant="outline" size="lg" onClick={handleExport}>
            <Download className="mr-2 h-5 w-5" />
            Export Assignment Data
          </Button>
        </div>

        {/* Back Button */}
        <Button variant="outline" onClick={() => router.back()}>
          Back to Assignments
        </Button>
      </div>
    </DashboardLayout>
  );
}
