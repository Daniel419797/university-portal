"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Clock, Award, Calendar, Save } from "lucide-react";

interface Question {
  id: string;
  type: "multiple-choice" | "true-false";
  question: string;
  options: string[];
  correctAnswer: string;
  marks: number;
}

export default function CreateQuizPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [quizData, setQuizData] = useState({
    title: "",
    course: "",
    description: "",
    instructions: "",
    duration: "60",
    totalMarks: "",
    passingMarks: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    attemptsAllowed: "1",
    shuffleQuestions: false,
    showResults: true,
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: 1,
    },
  ]);

  const courses = [
    { code: "CSC 401", name: "Artificial Intelligence" },
    { code: "CSC 402", name: "Computer Networks" },
    { code: "CSC 403", name: "Database Systems" },
    { code: "CSC 404", name: "Software Engineering" },
  ];

  const handleQuizChange = (field: string, value: string | boolean) => {
    setQuizData((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: (questions.length + 1).toString(),
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: 1,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) {
      toast({
        title: "Cannot Remove",
        description: "Quiz must have at least one question.",
        variant: "destructive",
      });
      return;
    }
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const calculateTotalMarks = () => {
    return questions.reduce((sum, q) => sum + q.marks, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!quizData.title || !quizData.course || !quizData.startDate || !quizData.endDate) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const hasEmptyQuestions = questions.some((q) => !q.question || q.options.some((o) => !o) || !q.correctAnswer);
    if (hasEmptyQuestions) {
      toast({
        title: "Incomplete Questions",
        description: "Please complete all question fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Quiz Created",
      description: "The quiz has been created successfully and published to students.",
    });

    setTimeout(() => {
      router.push("/lecturer/quizzes");
    }, 1500);
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Quiz has been saved as draft.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Quiz</h1>
          <p className="text-muted-foreground">Create a new quiz for your students</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the quiz details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Quiz Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Mid-Semester Quiz"
                  value={quizData.title}
                  onChange={(e) => handleQuizChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course">
                  Course <span className="text-red-500">*</span>
                </Label>
                <select
                  id="course"
                  className="w-full px-3 py-2 border rounded-md"
                  value={quizData.course}
                  onChange={(e) => handleQuizChange("course", e.target.value)}
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.code} value={course.code}>
                      {course.code} - {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the quiz"
                  rows={3}
                  value={quizData.description}
                  onChange={(e) => handleQuizChange("description", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions for Students</Label>
                <Textarea
                  id="instructions"
                  placeholder="Special instructions (optional)"
                  rows={4}
                  value={quizData.instructions}
                  onChange={(e) => handleQuizChange("instructions", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quiz Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Quiz Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={quizData.duration}
                    onChange={(e) => handleQuizChange("duration", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input id="totalMarks" type="number" value={calculateTotalMarks()} disabled />
                  <p className="text-xs text-muted-foreground">Auto-calculated from questions</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passingMarks">Passing Marks</Label>
                  <Input
                    id="passingMarks"
                    type="number"
                    placeholder="e.g., 12"
                    value={quizData.passingMarks}
                    onChange={(e) => handleQuizChange("passingMarks", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={quizData.startDate}
                    onChange={(e) => handleQuizChange("startDate", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={quizData.startTime}
                    onChange={(e) => handleQuizChange("startTime", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="endDate">
                    End Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={quizData.endDate}
                    onChange={(e) => handleQuizChange("endDate", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={quizData.endTime}
                    onChange={(e) => handleQuizChange("endTime", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="attemptsAllowed">Attempts Allowed</Label>
                <Input
                  id="attemptsAllowed"
                  type="number"
                  min="1"
                  value={quizData.attemptsAllowed}
                  onChange={(e) => handleQuizChange("attemptsAllowed", e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="shuffleQuestions"
                    checked={quizData.shuffleQuestions}
                    onChange={(e) => handleQuizChange("shuffleQuestions", e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="shuffleQuestions" className="cursor-pointer">
                    Shuffle questions for each student
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showResults"
                    checked={quizData.showResults}
                    onChange={(e) => handleQuizChange("showResults", e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="showResults" className="cursor-pointer">
                    Show results immediately after submission
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Questions</CardTitle>
                  <CardDescription>
                    {questions.length} question{questions.length !== 1 ? "s" : ""} • Total: {calculateTotalMarks()} marks
                  </CardDescription>
                </div>
                <Button type="button" onClick={addQuestion} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((question, qIndex) => (
                <Card key={question.id} className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Question {qIndex + 1}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge>{question.marks} mark{question.marks !== 1 ? "s" : ""}</Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(qIndex)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Question Type</Label>
                      <select
                        className="w-full px-3 py-2 border rounded-md"
                        value={question.type}
                        onChange={(e) => {
                          handleQuestionChange(qIndex, "type", e.target.value);
                          if (e.target.value === "true-false") {
                            handleQuestionChange(qIndex, "options", ["True", "False"]);
                          } else {
                            handleQuestionChange(qIndex, "options", ["", "", "", ""]);
                          }
                        }}
                      >
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="true-false">True/False</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Question Text</Label>
                      <Textarea
                        placeholder="Enter your question"
                        rows={3}
                        value={question.question}
                        onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Answer Options</Label>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex gap-2">
                            <Input
                              placeholder={`Option ${oIndex + 1}`}
                              value={option}
                              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                              disabled={question.type === "true-false"}
                            />
                            <Button
                              type="button"
                              variant={question.correctAnswer === option ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleQuestionChange(qIndex, "correctAnswer", option)}
                              disabled={!option}
                            >
                              {question.correctAnswer === option ? "Correct ✓" : "Mark Correct"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Marks for this question</Label>
                      <Input
                        type="number"
                        min="1"
                        value={question.marks}
                        onChange={(e) => handleQuestionChange(qIndex, "marks", parseInt(e.target.value))}
                        className="max-w-[120px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              <Award className="mr-2 h-4 w-4" />
              Create Quiz
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
            <Button type="button" variant="ghost" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
