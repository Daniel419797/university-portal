"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock, Search, Download, TrendingUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface Response {
  id: string;
  studentId: string;
  studentName: string;
  matricNumber: string;
  startedAt: string;
  completedAt: string;
  timeTaken: string;
  score: number;
  percentage: number;
  status: "completed" | "in-progress";
  correctAnswers: number;
  totalQuestions: number;
}

export default function QuizResponsesPage() {
  const params = useParams();
  const quizId = params?.id;
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const quiz = {
    id: quizId,
    title: "Mid-Semester Quiz",
    courseCode: "CSC 401",
    totalMarks: 20,
    passingMarks: 12,
    questionsCount: 20,
  };

  const responses: Response[] = [
    {
      id: "1",
      studentId: "STU001",
      studentName: "John Doe",
      matricNumber: "CS/2022/001",
      startedAt: "2026-01-12T10:00:00",
      completedAt: "2026-01-12T10:45:00",
      timeTaken: "45:32",
      score: 18,
      percentage: 90,
      status: "completed",
      correctAnswers: 18,
      totalQuestions: 20,
    },
    {
      id: "2",
      studentId: "STU002",
      studentName: "Jane Smith",
      matricNumber: "CS/2022/002",
      startedAt: "2026-01-12T14:00:00",
      completedAt: "2026-01-12T14:50:00",
      timeTaken: "50:15",
      score: 17,
      percentage: 85,
      status: "completed",
      correctAnswers: 17,
      totalQuestions: 20,
    },
    {
      id: "3",
      studentId: "STU003",
      studentName: "Michael Johnson",
      matricNumber: "CS/2022/003",
      startedAt: "2026-01-12T09:30:00",
      completedAt: "2026-01-12T10:20:00",
      timeTaken: "50:00",
      score: 16,
      percentage: 80,
      status: "completed",
      correctAnswers: 16,
      totalQuestions: 20,
    },
    {
      id: "4",
      studentId: "STU004",
      studentName: "Sarah Williams",
      matricNumber: "CS/2022/004",
      startedAt: "2026-01-13T11:00:00",
      completedAt: "2026-01-13T11:38:00",
      timeTaken: "38:45",
      score: 15,
      percentage: 75,
      status: "completed",
      correctAnswers: 15,
      totalQuestions: 20,
    },
    {
      id: "5",
      studentId: "STU005",
      studentName: "David Brown",
      matricNumber: "CS/2022/005",
      startedAt: "2026-01-14T16:00:00",
      completedAt: "2026-01-14T16:55:00",
      timeTaken: "55:12",
      score: 10,
      percentage: 50,
      status: "completed",
      correctAnswers: 10,
      totalQuestions: 20,
    },
  ];

  const filteredResponses = responses.filter(
    (response) =>
      response.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      response.matricNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: responses.length,
    completed: responses.filter((r) => r.status === "completed").length,
    passed: responses.filter((r) => r.score >= quiz.passingMarks).length,
    failed: responses.filter((r) => r.score < quiz.passingMarks).length,
    averageScore: (responses.reduce((sum, r) => sum + r.score, 0) / responses.length).toFixed(1),
    averagePercentage: (responses.reduce((sum, r) => sum + r.percentage, 0) / responses.length).toFixed(0),
  };

  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: "Quiz responses are being exported as CSV.",
    });
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Quiz Responses</h1>
          <p className="text-muted-foreground">
            {quiz.courseCode} - {quiz.title}
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Completed</CardDescription>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Passed</CardDescription>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.passed}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.passed / stats.total) * 100).toFixed(0)}% pass rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Failed</CardDescription>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.failed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Average Score</CardDescription>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.averageScore}</div>
              <p className="text-xs text-muted-foreground">Out of {quiz.totalMarks}</p>
            </CardContent>
          </Card>
        </div>

        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>Overall class performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Excellent (80-100%)</span>
                  <span className="font-medium">
                    {responses.filter((r) => r.percentage >= 80).length} students
                  </span>
                </div>
                <Progress
                  value={(responses.filter((r) => r.percentage >= 80).length / responses.length) * 100}
                  className="h-3 bg-green-100 [&>div]:bg-green-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Good (60-79%)</span>
                  <span className="font-medium">
                    {responses.filter((r) => r.percentage >= 60 && r.percentage < 80).length} students
                  </span>
                </div>
                <Progress
                  value={
                    (responses.filter((r) => r.percentage >= 60 && r.percentage < 80).length / responses.length) * 100
                  }
                  className="h-3 bg-yellow-100 [&>div]:bg-yellow-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Below Average (&lt;60%)</span>
                  <span className="font-medium">
                    {responses.filter((r) => r.percentage < 60).length} students
                  </span>
                </div>
                <Progress
                  value={(responses.filter((r) => r.percentage < 60).length / responses.length) * 100}
                  className="h-3 bg-red-100 [&>div]:bg-red-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

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
              <Button variant="outline" onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export to CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Responses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Responses</CardTitle>
            <CardDescription>
              Showing {filteredResponses.length} of {responses.length} responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredResponses.map((response) => (
                <div
                  key={response.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">{response.studentName}</h4>
                      <Badge variant={response.score >= quiz.passingMarks ? "default" : "destructive"}>
                        {response.score >= quiz.passingMarks ? "Passed" : "Failed"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Matric No: {response.matricNumber}</p>
                      <p>
                        Completed: {new Date(response.completedAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p>Time Taken: {response.timeTaken}</p>
                      <p>
                        Correct Answers: {response.correctAnswers}/{response.totalQuestions}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(response.percentage)}`}>
                        {response.score}
                      </div>
                      <div className="text-sm text-muted-foreground">/{quiz.totalMarks}</div>
                      <div className="text-xs text-muted-foreground mt-1">{response.percentage}%</div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}

              {filteredResponses.length === 0 && (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No responses found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? "Try adjusting your search query" : "Students haven't completed the quiz yet"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <Button variant="outline" asChild>
          <Link href={`/lecturer/quizzes/${quizId}`}>Back to Quiz Details</Link>
        </Button>
      </div>
    </DashboardLayout>
  );
}
