"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, PlayCircle, CheckCircle, AlertCircle } from "lucide-react";

interface Quiz {
  id: string;
  courseCode: string;
  courseName: string;
  title: string;
  duration: number;
  totalMarks: number;
  questionsCount: number;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "completed" | "graded";
  score?: number;
}

export default function StudentQuizzesPage() {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  const quizzes: Quiz[] = [
    {
      id: "1",
      courseCode: "CSC 401",
      courseName: "Data Structures",
      title: "Mid-Semester Quiz",
      duration: 60,
      totalMarks: 20,
      questionsCount: 20,
      startDate: "2026-01-10",
      endDate: "2026-01-15",
      status: "active",
    },
    {
      id: "2",
      courseCode: "CSC 402",
      courseName: "Operating Systems",
      title: "Weekly Quiz - Week 3",
      duration: 30,
      totalMarks: 10,
      questionsCount: 10,
      startDate: "2026-01-05",
      endDate: "2026-01-08",
      status: "active",
    },
    {
      id: "3",
      courseCode: "CSC 403",
      courseName: "Software Engineering",
      title: "Chapter 1-3 Quiz",
      duration: 45,
      totalMarks: 15,
      questionsCount: 15,
      startDate: "2025-12-20",
      endDate: "2025-12-25",
      status: "graded",
      score: 13,
    },
    {
      id: "4",
      courseCode: "CSC 404",
      courseName: "Computer Networks",
      title: "Networking Fundamentals",
      duration: 40,
      totalMarks: 20,
      questionsCount: 20,
      startDate: "2025-12-15",
      endDate: "2025-12-18",
      status: "graded",
      score: 18,
    },
  ];

  const activeQuizzes = quizzes.filter((q) => q.status === "active" || q.status === "upcoming");
  const completedQuizzes = quizzes.filter((q) => q.status === "completed" || q.status === "graded");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <PlayCircle className="h-4 w-4" />;
      case "graded":
        return <CheckCircle className="h-4 w-4" />;
      case "upcoming":
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      upcoming: "secondary",
      completed: "outline",
      graded: "outline",
    };
    return variants[status] || "default";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Quizzes</h1>
          <p className="text-muted-foreground">Take quizzes and view your results</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 -mb-px ${
              activeTab === "active"
                ? "border-b-2 border-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            Active Quizzes ({activeQuizzes.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 -mb-px ${
              activeTab === "completed"
                ? "border-b-2 border-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            Completed ({completedQuizzes.length})
          </button>
        </div>

        {/* Active Quizzes */}
        {activeTab === "active" && (
          <div className="grid gap-4 md:grid-cols-2">
            {activeQuizzes.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {quiz.courseCode}
                        <Badge variant={getStatusBadge(quiz.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(quiz.status)}
                            {quiz.status}
                          </span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>{quiz.courseName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-medium">{quiz.title}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="ml-2 font-medium">{quiz.duration} mins</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Questions:</span>
                      <span className="ml-2 font-medium">{quiz.questionsCount}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Marks:</span>
                      <span className="ml-2 font-medium">{quiz.totalMarks}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="ml-2 font-medium">
                        {new Date(quiz.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full" asChild disabled={quiz.status === "upcoming"}>
                    <Link href={quiz.status === "upcoming" ? "#" : `/student/quizzes/${quiz.id}`}>
                      {quiz.status === "upcoming" ? "Not Yet Available" : "View Quiz"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Completed Quizzes */}
        {activeTab === "completed" && (
          <div className="grid gap-4 md:grid-cols-2">
            {completedQuizzes.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {quiz.courseCode}
                        <Badge variant={getStatusBadge(quiz.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(quiz.status)}
                            {quiz.status}
                          </span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>{quiz.courseName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-medium">{quiz.title}</h3>
                  {quiz.score !== undefined && (
                    <>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Score</span>
                          <span className="font-medium">
                            {quiz.score}/{quiz.totalMarks} ({((quiz.score / quiz.totalMarks) * 100).toFixed(0)}%)
                          </span>
                        </div>
                        <Progress value={(quiz.score / quiz.totalMarks) * 100} />
                      </div>
                    </>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>Duration: {quiz.duration} mins</div>
                    <div>Questions: {quiz.questionsCount}</div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/student/quizzes/${quiz.id}/results`}>
                      View Results
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
