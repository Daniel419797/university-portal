"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertCircle, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  type: "multiple-choice" | "true-false";
  question: string;
  options?: string[];
  answer: string | null;
  marked: boolean;
}

export default function TakeQuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params?.id;
  const { toast } = useToast();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: "multiple-choice",
      question: "Which search algorithm guarantees the shortest path in an unweighted graph?",
      options: [
        "Depth-First Search (DFS)",
        "Breadth-First Search (BFS)",
        "Best-First Search",
        "Iterative Deepening",
      ],
      answer: null,
      marked: false,
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "What is the time complexity of the A* algorithm in the worst case?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(b^d) where b is branching factor and d is depth"],
      answer: null,
      marked: false,
    },
    {
      id: 3,
      type: "true-false",
      question: "Neural networks always require labeled data for training.",
      options: ["True", "False"],
      answer: null,
      marked: false,
    },
    {
      id: 4,
      type: "multiple-choice",
      question: "Which of the following is NOT a type of machine learning?",
      options: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Reinforcement Learning",
        "Deterministic Learning",
      ],
      answer: null,
      marked: false,
    },
    {
      id: 5,
      type: "true-false",
      question: "The Turing Test was designed to evaluate machine consciousness.",
      options: ["True", "False"],
      answer: null,
      marked: false,
    },
  ]);

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = questions.filter((q) => q.answer !== null).length;
  const markedCount = questions.filter((q) => q.marked).length;
  const progress = (answeredCount / questions.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answer: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].answer = answer;
    setQuestions(updatedQuestions);

    toast({
      title: "Answer Saved",
      description: "Your answer has been automatically saved.",
    });
  };

  const handleMarkForReview = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].marked = !updatedQuestions[currentQuestionIndex].marked;
    setQuestions(updatedQuestions);
  };

  const handleNavigate = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleAutoSubmit = () => {
    toast({
      title: "Time's Up!",
      description: "Quiz automatically submitted.",
      variant: "destructive",
    });
    setTimeout(() => {
      router.push(`/student/quizzes/${quizId}/results`);
    }, 2000);
  };

  const handleSubmit = () => {
    const unanswered = questions.filter((q) => q.answer === null).length;

    if (unanswered > 0) {
      const confirmed = confirm(
        `You have ${unanswered} unanswered question(s). Are you sure you want to submit?`
      );
      if (!confirmed) return;
    }

    toast({
      title: "Quiz Submitted",
      description: "Your answers have been submitted successfully.",
      variant: "success",
    });

    setTimeout(() => {
      router.push(`/student/quizzes/${quizId}/results`);
    }, 1500);
  };

  const getQuestionStatusColor = (question: Question) => {
    if (question.answer !== null) return "bg-green-500";
    if (question.marked) return "bg-yellow-500";
    return "bg-gray-300 dark:bg-gray-600";
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Timer */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">CSC 401 - Mid-Semester Quiz</h1>
            <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
          </div>
          <Card className={`${timeRemaining < 300 ? "border-red-500" : ""}`}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className={`h-5 w-5 ${timeRemaining < 300 ? "text-red-500" : "text-muted-foreground"}`} />
                <span className={`text-2xl font-mono font-bold ${timeRemaining < 300 ? "text-red-500" : ""}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Warning for low time */}
        {timeRemaining < 300 && timeRemaining > 0 && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-800 dark:text-red-200">
              <p className="font-medium">Less than 5 minutes remaining!</p>
              <p>Make sure to submit your quiz before time runs out.</p>
            </div>
          </div>
        )}

        {/* Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Progress</span>
                <span className="text-muted-foreground">
                  {answeredCount}/{questions.length} answered
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Question Panel */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Question {currentQuestion.id}
                      {currentQuestion.marked && (
                        <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900">
                          Marked for Review
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {currentQuestion.type === "multiple-choice" ? "Multiple Choice" : "True/False"}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">1 mark</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg">{currentQuestion.question}</p>

                {/* Answer Options */}
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full text-left p-4 border-2 rounded-lg transition-colors ${
                        currentQuestion.answer === option
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            currentQuestion.answer === option
                              ? "border-primary bg-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {currentQuestion.answer === option && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <span className="flex-1">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={handleMarkForReview}
                    className={currentQuestion.marked ? "bg-yellow-100 dark:bg-yellow-900" : ""}
                  >
                    {currentQuestion.marked ? "Unmark" : "Mark for Review"}
                  </Button>
                  <Button variant="outline" onClick={() => handleAnswerSelect("")}>
                    Clear Answer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleNavigate(currentQuestionIndex - 1)}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentQuestionIndex === questions.length - 1 ? (
                <Button onClick={handleSubmit} size="lg" className="bg-green-600 hover:bg-green-700">
                  Submit Quiz
                </Button>
              ) : (
                <Button onClick={() => handleNavigate(currentQuestionIndex + 1)}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((question, index) => (
                    <button
                      key={question.id}
                      onClick={() => handleNavigate(index)}
                      className={`aspect-square rounded-lg flex items-center justify-center font-semibold text-sm transition-all ${
                        index === currentQuestionIndex
                          ? "ring-2 ring-primary ring-offset-2"
                          : ""
                      } ${getQuestionStatusColor(question)} text-white`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-green-500" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-yellow-500" />
                  <span>Marked for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-gray-300 dark:bg-gray-600" />
                  <span>Not Answered</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Questions:</span>
                  <span className="font-semibold">{questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Answered:</span>
                  <span className="font-semibold text-green-600">{answeredCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Not Answered:</span>
                  <span className="font-semibold text-red-600">
                    {questions.length - answeredCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Marked for Review:</span>
                  <span className="font-semibold text-yellow-600">{markedCount}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
