"use client";

import { useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useApi } from "@/hooks/use-api";
import { lecturerService } from "@/lib/services/lecturerService";
import { Quiz } from "@/lib/types";

export default function LecturerQuizzesPage() {
  const { data: quizzes, isLoading, execute } = useApi<Quiz[]>();

  useEffect(() => {
    execute(() => lecturerService.getQuizzes(), {
      errorMessage: "Failed to load quizzes"
    });
  }, [execute]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading quizzes...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
          {!quizzes || quizzes.length === 0 ? (
            <Card className="col-span-2">
              <CardContent className="py-12 text-center">
                <Plus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No quizzes created yet</p>
                <Button className="mt-4" asChild>
                  <Link href="/lecturer/quizzes/create">Create Your First Quiz</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            quizzes.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{quiz.courseId} - {quiz.title}</CardTitle>
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
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}