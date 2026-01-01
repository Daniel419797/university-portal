"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, AlertCircle, PlayCircle, CheckCircle, Calendar } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function QuizDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params?.id;

  const quiz = {
    id: quizId,
    courseCode: "CSC 401",
    courseName: "Artificial Intelligence",
    title: "Mid-Semester Quiz",
    description: "This quiz covers topics from Chapters 1-4 including search algorithms, knowledge representation, machine learning fundamentals, and neural networks. Make sure you understand the core concepts and algorithms discussed in lectures.",
    instructions: [
      "Read each question carefully before answering",
      "You can navigate between questions using the Next/Previous buttons",
      "All questions must be answered before submission",
      "Once submitted, you cannot change your answers",
      "Ensure you have a stable internet connection throughout the quiz",
    ],
    duration: 60, // minutes
    totalMarks: 20,
    questionsCount: 20,
    startDate: "2026-01-10T09:00:00",
    endDate: "2026-01-15T23:59:00",
    passingMarks: 12,
    attemptsAllowed: 1,
    attemptsUsed: 0,
    status: "active", // active, completed, graded, upcoming
    score: null,
    lecturer: "Dr. Michael Chen",
    questionTypes: [
      { type: "Multiple Choice", count: 15 },
      { type: "True/False", count: 5 },
    ],
  };

  const now = new Date();
  const startDate = new Date(quiz.startDate);
  const endDate = new Date(quiz.endDate);
  const isActive = now >= startDate && now <= endDate;
  const isUpcoming = now < startDate;
  const isExpired = now > endDate;
  const hasAttemptsLeft = quiz.attemptsUsed < quiz.attemptsAllowed;
  const canTakeQuiz = isActive && hasAttemptsLeft && quiz.status !== "completed";

  const timeRemaining = () => {
    if (isExpired) return "Expired";
    if (isUpcoming) {
      const days = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return `Starts in ${days} day${days !== 1 ? "s" : ""}`;
    }
    const hours = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60));
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} remaining`;
    const days = Math.ceil(hours / 24);
    return `${days} day${days !== 1 ? "s" : ""} remaining`;
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold">{quiz.title}</h1>
              <p className="text-muted-foreground">
                {quiz.courseCode} - {quiz.courseName}
              </p>
            </div>
            <Badge className="text-lg px-4 py-1">{quiz.totalMarks} Marks</Badge>
          </div>
        </div>

        {/* Status Banner */}
        {isUpcoming && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-1">Quiz Not Yet Available</p>
              <p>
                This quiz will be available starting {startDate.toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
          </div>
        )}

        {isExpired && quiz.status !== "graded" && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-800 dark:text-red-200">
              <p className="font-medium mb-1">Quiz Expired</p>
              <p>The deadline for this quiz has passed. You can no longer take this quiz.</p>
            </div>
          </div>
        )}

        {!hasAttemptsLeft && (
          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <p className="font-medium mb-1">No Attempts Remaining</p>
              <p>You have used all available attempts for this quiz.</p>
            </div>
          </div>
        )}

        {/* Quiz Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Duration</CardDescription>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quiz.duration}</div>
              <p className="text-xs text-muted-foreground">minutes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Questions</CardDescription>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quiz.questionsCount}</div>
              <p className="text-xs text-muted-foreground">Total questions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Attempts</CardDescription>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {quiz.attemptsUsed}/{quiz.attemptsAllowed}
              </div>
              <p className="text-xs text-muted-foreground">Used/Allowed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Time Left</CardDescription>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{timeRemaining()}</div>
              <p className="text-xs text-muted-foreground">Until deadline</p>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Description */}
        <Card>
          <CardHeader>
            <CardTitle>Quiz Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{quiz.description}</p>
          </CardContent>
        </Card>

        {/* Quiz Details */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Course:</span>
                <span className="font-medium">
                  {quiz.courseCode} - {quiz.courseName}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Lecturer:</span>
                <span className="font-medium">{quiz.lecturer}</span>
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
                <span className="text-muted-foreground">Start Date:</span>
                <span className="font-medium">
                  {startDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">End Date:</span>
                <span className="font-medium">
                  {endDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Question Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quiz.questionTypes.map((type, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{type.type}:</span>
                  <span className="font-medium">{type.count} questions</span>
                </div>
              ))}
              <div className="pt-3 border-t flex justify-between text-sm font-semibold">
                <span>Total Questions:</span>
                <span>{quiz.questionsCount}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Important Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {quiz.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-muted-foreground">{instruction}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {canTakeQuiz ? (
            <Button className="flex-1" size="lg" asChild>
              <Link href={`/student/quizzes/${quizId}/take`}>
                <PlayCircle className="mr-2 h-5 w-5" />
                Start Quiz
              </Link>
            </Button>
          ) : quiz.status === "graded" || quiz.status === "completed" ? (
            <Button className="flex-1" size="lg" variant="outline" asChild>
              <Link href={`/student/quizzes/${quizId}/results`}>
                <CheckCircle className="mr-2 h-5 w-5" />
                View Results
              </Link>
            </Button>
          ) : (
            <Button className="flex-1" size="lg" disabled>
              <PlayCircle className="mr-2 h-5 w-5" />
              {isUpcoming ? "Not Available Yet" : isExpired ? "Quiz Expired" : "No Attempts Left"}
            </Button>
          )}
          <Button variant="outline" size="lg" onClick={() => router.back()}>
            Back to Quizzes
          </Button>
        </div>

        {/* Important Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Important Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Make sure you have a stable internet connection before starting</p>
            <p>• The timer starts immediately when you begin the quiz</p>
            <p>• Your answers are auto-saved as you progress</p>
            <p>• You cannot pause the quiz once started</p>
            <p>• Contact your lecturer immediately if you encounter technical issues</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
