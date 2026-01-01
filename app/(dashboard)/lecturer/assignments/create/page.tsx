"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Calendar, FileText, Users, Award } from "lucide-react";

export default function CreateAssignmentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    description: "",
    instructions: "",
    totalMarks: "",
    passingMarks: "",
    dueDate: "",
    dueTime: "",
    maxFileSize: "10",
    allowedFormats: "pdf,doc,docx",
    lateSubmission: false,
    latePenalty: "10",
  });

  const courses = [
    { code: "CSC 401", name: "Artificial Intelligence" },
    { code: "CSC 402", name: "Computer Networks" },
    { code: "CSC 403", name: "Database Systems" },
    { code: "CSC 404", name: "Software Engineering" },
  ];

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.course || !formData.description || !formData.totalMarks || !formData.dueDate) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Assignment Created",
      description: "The assignment has been created successfully and published to students.",
    });

    setTimeout(() => {
      router.push("/lecturer/assignments");
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Assignment</h1>
          <p className="text-muted-foreground">Create a new assignment for your students</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Enter the basic details of the assignment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Assignment Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Final Project Report"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
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
                  value={formData.course}
                  onChange={(e) => handleChange("course", e.target.value)}
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
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Provide a brief description of the assignment"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Assignment Instructions</Label>
                <Textarea
                  id="instructions"
                  placeholder="Detailed instructions for students"
                  rows={6}
                  value={formData.instructions}
                  onChange={(e) => handleChange("instructions", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Grading Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Grading Information
              </CardTitle>
              <CardDescription>Configure grading criteria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="totalMarks">
                    Total Marks <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="totalMarks"
                    type="number"
                    placeholder="e.g., 20"
                    value={formData.totalMarks}
                    onChange={(e) => handleChange("totalMarks", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passingMarks">Passing Marks</Label>
                  <Input
                    id="passingMarks"
                    type="number"
                    placeholder="e.g., 12"
                    value={formData.passingMarks}
                    onChange={(e) => handleChange("passingMarks", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submission Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Submission Settings
              </CardTitle>
              <CardDescription>Configure submission deadlines and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dueDate">
                    Due Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueTime">
                    Due Time <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dueTime"
                    type="time"
                    value={formData.dueTime}
                    onChange={(e) => handleChange("dueTime", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={formData.maxFileSize}
                    onChange={(e) => handleChange("maxFileSize", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowedFormats">Allowed File Formats</Label>
                  <Input
                    id="allowedFormats"
                    placeholder="e.g., pdf,doc,docx"
                    value={formData.allowedFormats}
                    onChange={(e) => handleChange("allowedFormats", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="lateSubmission"
                    checked={formData.lateSubmission}
                    onChange={(e) => handleChange("lateSubmission", e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="lateSubmission" className="cursor-pointer">
                    Allow late submission
                  </Label>
                </div>

                {formData.lateSubmission && (
                  <div className="ml-6 space-y-2">
                    <Label htmlFor="latePenalty">Late Submission Penalty (%)</Label>
                    <Input
                      id="latePenalty"
                      type="number"
                      placeholder="e.g., 10"
                      value={formData.latePenalty}
                      onChange={(e) => handleChange("latePenalty", e.target.value)}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preview Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Assignment Preview
              </CardTitle>
              <CardDescription>This is how students will see the assignment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{formData.title || "Assignment Title"}</h3>
                <p className="text-sm text-muted-foreground">
                  {formData.course || "Course Code"} • Total Marks: {formData.totalMarks || "0"}
                </p>
              </div>
              {formData.description && (
                <p className="text-sm text-muted-foreground">{formData.description}</p>
              )}
              {formData.dueDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Due: {new Date(formData.dueDate).toLocaleDateString()}{" "}
                    {formData.dueTime && `at ${formData.dueTime}`}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              Create Assignment
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
