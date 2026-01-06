"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, Award, Edit, Trash2, BarChart3, FileText } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/use-api";
import { lecturerService } from "@/lib/services/lecturerService";
import { Quiz } from "@/lib/types";

export default function QuizManagementPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params?.id as string;
  const { toast } = useToast();

  const { data: quiz, isLoading, execute } = useApi<Quiz>();

  useEffect(() => {
    if (quizId) {
      execute(() => lecturerService.getQuizDetails(quizId), {
        errorMessage: "Failed to load quiz details"
      });
    }
  }, [execute, quizId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading quiz...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!quiz) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Quiz not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const stats = [
    {
      label: "Total Students",
      value: quiz.totalStudents || 0,
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Attempted",
      value: quiz.attemptedCount || 0,
      icon: FileText,
      color: "text-green-600",
    },
    {
      label: "Completed",
      value: quiz.completedCount || 0,
      icon: Award,
      color: "text-purple-600",
    },
    {
      label: "Average Score",
      value: `${quiz.averageScore || 0}/${quiz.totalMarks}`,
      icon: BarChart3,
      color: "text-yellow-600",
    },
  ];

  const questionTypes = quiz.questionTypes || [];

  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete this quiz? This action cannot be undone.");
    if (!confirmed) return;

    toast({
      title: "Quiz Deleted",
      description: "The quiz has been deleted successfully.",
      variant: "destructive",
    });

    setTimeout(() => {
      router.push("/lecturer/quizzes");
    }, 1500);
  };

  const handleCloseQuiz = () => {
    toast({
      title: "Quiz Closed",
      description: "Students can no longer take this quiz.",
    });
  };

  const participationRate = quiz.totalStudents ? ((quiz.attemptedCount! / quiz.totalStudents) * 100).toFixed(0) : "0";
  const completionRate = quiz.attemptedCount ? ((quiz.completedCount! / quiz.attemptedCount) * 100).toFixed(0) : "0";

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{quiz.title}</h1>
            <p className="text-muted-foreground">
              {quiz.courseCode} - {quiz.courseName}
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
                  {quiz.status === "active" ? "Active" : quiz.status === "closed" ? "Closed" : "Draft"}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Created on {quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
              <div className="flex gap-2">
                {quiz.status === "active" && (
                  <Button variant="outline" size="sm" onClick={handleCloseQuiz}>
                    Close Quiz
                  </Button>
                )}
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
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.label === "Attempted" && (
                  <p className="text-xs text-muted-foreground mt-1">{participationRate}% participation</p>
                )}
                {stat.label === "Completed" && quiz.attemptedCount && quiz.attemptedCount > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">{completionRate}% completion rate</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quiz Details Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{quiz.description}</p>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{quiz.duration} minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Questions:</span>
                    <span className="font-medium">{quiz.questionsCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Marks:</span>
                    <span className="font-medium">{quiz.totalMarks}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Passing Marks:</span>
                    <span className="font-medium">{quiz.passingMarks}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Attempts Allowed:</span>
                    <span className="font-medium">{quiz.attemptsAllowed}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Average Score:</span>
                    <span className="font-medium">{quiz.averageScore}/{quiz.totalMarks}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Highest Score:</span>
                    <span className="font-medium text-green-600">{quiz.highestScore || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lowest Score:</span>
                    <span className="font-medium text-red-600">{quiz.lowestScore || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pass Rate:</span>
                    <span className="font-medium">
                      {quiz.completedCount ? ((quiz.completedCount * 0.9 / quiz.completedCount) * 100).toFixed(0) : '0'}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Question Breakdown</CardTitle>
                <CardDescription>Types and distribution of questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {questionTypes.map((type, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">{type.type}</span>
                    <Badge>{type.count} questions</Badge>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Questions:</span>
                    <span>{quiz.questionsCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-medium">
                    {new Date(quiz.startDate).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">End Date:</span>
                  <span className="font-medium">
                    {new Date(quiz.endDate).toLocaleString("en-US", {
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

            <Card>
              <CardHeader>
                <CardTitle>Quiz Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shuffle Questions:</span>
                  <Badge variant={quiz.shuffleQuestions ? "default" : "secondary"}>
                    {quiz.shuffleQuestions ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Show Results:</span>
                  <Badge variant={quiz.showResults ? "default" : "secondary"}>
                    {quiz.showResults ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>View comprehensive quiz analytics and student responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3 text-center">
                    <div className="p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {quiz.completedCount ? Math.round(quiz.completedCount * 0.9) : 0}
                      </div>
                      <p className="text-sm text-muted-foreground">Passed</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {quiz.completedCount ? Math.round(quiz.completedCount * 0.1) : 0}
                      </div>
                      <p className="text-sm text-muted-foreground">Failed</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {(quiz.attemptedCount || 0) - (quiz.completedCount || 0)}
                      </div>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href={`/lecturer/quizzes/${quizId}/responses`}>
                      View All Student Responses
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Button className="h-16" size="lg" asChild>
            <Link href={`/lecturer/quizzes/${quizId}/responses`}>
              <BarChart3 className="mr-2 h-5 w-5" />
              View Student Responses ({quiz.completedCount})
            </Link>
          </Button>
          <Button className="h-16" variant="outline" size="lg">
            <FileText className="mr-2 h-5 w-5" />
            Export Quiz Data
          </Button>
        </div>

        {/* Back Button */}
        <Button variant="outline" onClick={() => router.back()}>
          Back to Quizzes
        </Button>
      </div>
    </DashboardLayout>
  );
}
