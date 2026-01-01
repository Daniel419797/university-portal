"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function LecturerQuizzesPage() {
  const quizzes = [
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
      attempts: 32,
      totalStudents: 45,
      status: "active",
    },
    {
      id: "2",
      courseCode: "CSC 301",
      courseName: "Database Systems",
      title: "Weekly Quiz - Week 3",
      duration: 30,
      totalMarks: 10,
      questionsCount: 10,
      startDate: "2026-01-05",
      endDate: "2026-01-08",
      attempts: 52,
      totalStudents: 52,
      status: "completed",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Quizzes</h1>
            <p className="text-muted-foreground">Create and manage course quizzes</p>
          </div>
          <Button asChild>
            <Link href="/lecturer/quizzes/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Quiz
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {quizzes.map((quiz) => (
            <Card key={quiz.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{quiz.courseCode} - {quiz.title}</CardTitle>
                    <CardDescription>{quiz.courseName}</CardDescription>
                  </div>
                  <Badge variant={quiz.status === "active" ? "default" : "outline"}>
                    {quiz.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
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
                    <span className="text-muted-foreground">Attempts:</span>
                    <span className="ml-2 font-medium">
                      {quiz.attempts}/{quiz.totalStudents}
                    </span>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Period:</span>
                  <p className="font-medium">
                    {new Date(quiz.startDate).toLocaleDateString()} -{" "}
                    {new Date(quiz.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/lecturer/quizzes/${quiz.id}/responses`}>
                      View Results
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/lecturer/quizzes/${quiz.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
