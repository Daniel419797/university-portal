"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock, Award, TrendingUp, Download } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function QuizResultsPage() {
  const params = useParams();
  const quizId = params?.id;

  const result = {
    quizId: quizId,
    courseCode: "CSC 401",
    courseName: "Artificial Intelligence",
    quizTitle: "Mid-Semester Quiz",
    score: 17,
    totalMarks: 20,
    percentage: 85,
    passingMarks: 12,
    passed: true,
    grade: "A",
    timeTaken: "45:32",
    totalTime: "60:00",
    submittedAt: "2026-01-12T14:45:32",
    questionsCount: 20,
    correctAnswers: 17,
    incorrectAnswers: 3,
    unanswered: 0,
    rank: 5,
    totalStudents: 42,
    averageScore: 15.2,
    highestScore: 19,
    lowestScore: 8,
    lecturer: "Dr. Michael Chen",
    feedback: "Excellent performance! You have demonstrated a strong understanding of the core concepts covered in this quiz. Keep up the good work.",
  };

  const questions = [
    {
      id: 1,
      question: "Which search algorithm guarantees the shortest path in an unweighted graph?",
      yourAnswer: "Breadth-First Search (BFS)",
      correctAnswer: "Breadth-First Search (BFS)",
      isCorrect: true,
      explanation: "BFS explores all nodes at the present depth before moving to nodes at the next depth level, ensuring the shortest path in unweighted graphs.",
    },
    {
      id: 2,
      question: "What is the time complexity of the A* algorithm in the worst case?",
      yourAnswer: "O(n²)",
      correctAnswer: "O(b^d) where b is branching factor and d is depth",
      isCorrect: false,
      explanation: "A* worst-case complexity depends on the branching factor and solution depth, making it O(b^d).",
    },
    {
      id: 3,
      question: "Neural networks always require labeled data for training.",
      yourAnswer: "False",
      correctAnswer: "False",
      isCorrect: true,
      explanation: "While supervised learning requires labeled data, unsupervised learning and self-supervised learning can work with unlabeled data.",
    },
    {
      id: 4,
      question: "Which of the following is NOT a type of machine learning?",
      yourAnswer: "Deterministic Learning",
      correctAnswer: "Deterministic Learning",
      isCorrect: true,
      explanation: "The three main types of machine learning are supervised, unsupervised, and reinforcement learning. Deterministic learning is not a recognized category.",
    },
    {
      id: 5,
      question: "The Turing Test was designed to evaluate machine consciousness.",
      yourAnswer: "True",
      correctAnswer: "False",
      isCorrect: false,
      explanation: "The Turing Test evaluates whether a machine can exhibit intelligent behavior indistinguishable from a human, not consciousness itself.",
    },
  ];

  const percentile = ((result.totalStudents - result.rank) / result.totalStudents) * 100;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Quiz Results</h1>
            <p className="text-muted-foreground">
              {result.courseCode} - {result.quizTitle}
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
        </div>

        {/* Result Banner */}
        <Card className={result.passed ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-red-500 bg-red-50 dark:bg-red-950"}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${result.passed ? "bg-green-500" : "bg-red-500"}`}>
                  {result.passed ? (
                    <CheckCircle className="h-8 w-8 text-white" />
                  ) : (
                    <XCircle className="h-8 w-8 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{result.passed ? "Congratulations!" : "Keep Practicing"}</h2>
                  <p className={result.passed ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}>
                    {result.passed 
                      ? `You passed with ${result.percentage}%` 
                      : `You scored ${result.percentage}%. Passing mark: ${result.passingMarks}/${result.totalMarks}`
                    }
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold">{result.score}/{result.totalMarks}</div>
                <Badge className="mt-2 text-lg px-4 py-1">Grade: {result.grade}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Score</CardDescription>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{result.percentage}%</div>
              <p className="text-xs text-muted-foreground">{result.score} out of {result.totalMarks}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Time Taken</CardDescription>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{result.timeTaken}</div>
              <p className="text-xs text-muted-foreground">Out of {result.totalTime}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Class Rank</CardDescription>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#{result.rank}</div>
              <p className="text-xs text-muted-foreground">
                Top {percentile.toFixed(0)}% of class
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Accuracy</CardDescription>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {result.correctAnswers}/{result.questionsCount}
              </div>
              <p className="text-xs text-muted-foreground">Correct answers</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Correct Answers</span>
                <span className="text-green-600 font-semibold">{result.correctAnswers} questions</span>
              </div>
              <Progress value={(result.correctAnswers / result.questionsCount) * 100} className="h-3 bg-green-100 [&>div]:bg-green-500" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Incorrect Answers</span>
                <span className="text-red-600 font-semibold">{result.incorrectAnswers} questions</span>
              </div>
              <Progress value={(result.incorrectAnswers / result.questionsCount) * 100} className="h-3 bg-red-100 [&>div]:bg-red-500" />
            </div>
          </CardContent>
        </Card>

        {/* Class Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Class Performance Comparison</CardTitle>
            <CardDescription>How you performed relative to your classmates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Your Score</span>
                <span className="text-2xl font-bold text-primary">{result.score}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Class Average</span>
                <span className="text-xl font-semibold">{result.averageScore}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Highest Score</span>
                <span className="text-xl font-semibold text-green-600">{result.highestScore}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Lowest Score</span>
                <span className="text-xl font-semibold text-red-600">{result.lowestScore}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lecturer Feedback */}
        {result.feedback && (
          <Card>
            <CardHeader>
              <CardTitle>Lecturer Feedback</CardTitle>
              <CardDescription>From {result.lecturer}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{result.feedback}</p>
            </CardContent>
          </Card>
        )}

        {/* Detailed Answer Review */}
        <Card>
          <CardHeader>
            <CardTitle>Answer Review</CardTitle>
            <CardDescription>Review your answers and explanations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center ${q.isCorrect ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}>
                    {q.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Question {q.id}</h4>
                    <p className="text-muted-foreground mb-3">{q.question}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2">
                        <span className="font-medium">Your Answer:</span>
                        <span className={q.isCorrect ? "text-green-600" : "text-red-600"}>
                          {q.yourAnswer}
                        </span>
                      </div>
                      {!q.isCorrect && (
                        <div className="flex gap-2">
                          <span className="font-medium">Correct Answer:</span>
                          <span className="text-green-600">{q.correctAnswer}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <p className="text-sm"><span className="font-medium">Explanation:</span> {q.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button asChild className="flex-1">
            <Link href="/student/quizzes">Back to Quizzes</Link>
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download Detailed Report
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
