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
import { BookOpen, Users, Calendar, Save } from "lucide-react";

export default function CreateCoursePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    description: "",
    department: "",
    level: "",
    semester: "",
    creditUnits: "",
    capacity: "",
    lecturer: "",
    prerequisites: "",
    schedule: "",
  });

  const departments = ["Computer Science", "Software Engineering", "Information Technology", "Cyber Security"];
  const levels = ["100", "200", "300", "400", "500"];
  const semesters = ["First Semester", "Second Semester"];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.courseCode || !formData.courseName || !formData.department || !formData.level) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Course Created",
      description: "The course has been created successfully.",
    });

    setTimeout(() => {
      router.push("/admin/courses");
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Course</h1>
          <p className="text-muted-foreground">Add a new course to the system</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Enter the course details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="courseCode">
                    Course Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="courseCode"
                    placeholder="e.g., CSC 401"
                    value={formData.courseCode}
                    onChange={(e) => handleChange("courseCode", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseName">
                    Course Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="courseName"
                    placeholder="e.g., Artificial Intelligence"
                    value={formData.courseName}
                    onChange={(e) => handleChange("courseName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the course"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="department">
                    Department <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="department"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    required
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">
                    Level <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="level"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.level}
                    onChange={(e) => handleChange("level", e.target.value)}
                    required
                  >
                    <option value="">Select level</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level} Level
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <select
                    id="semester"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.semester}
                    onChange={(e) => handleChange("semester", e.target.value)}
                  >
                    <option value="">Select semester</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="creditUnits">Credit Units</Label>
                  <Input
                    id="creditUnits"
                    type="number"
                    placeholder="e.g., 3"
                    value={formData.creditUnits}
                    onChange={(e) => handleChange("creditUnits", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enrollment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Enrollment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Course Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="e.g., 50"
                    value={formData.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lecturer">Assigned Lecturer</Label>
                  <Input
                    id="lecturer"
                    placeholder="e.g., Dr. Michael Chen"
                    value={formData.lecturer}
                    onChange={(e) => handleChange("lecturer", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prerequisites">Prerequisites</Label>
                <Input
                  id="prerequisites"
                  placeholder="e.g., CSC 301, CSC 302"
                  value={formData.prerequisites}
                  onChange={(e) => handleChange("prerequisites", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Comma-separated course codes</p>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schedule">Class Schedule</Label>
                <Textarea
                  id="schedule"
                  placeholder="e.g., Monday 10:00 AM - 12:00 PM, Wednesday 2:00 PM - 4:00 PM"
                  rows={3}
                  value={formData.schedule}
                  onChange={(e) => handleChange("schedule", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Course Preview</CardTitle>
              <CardDescription>This is how the course will appear in the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">
                  {formData.courseCode || "Course Code"} - {formData.courseName || "Course Name"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formData.department || "Department"} • {formData.level ? `${formData.level} Level` : "Level"}{" "}
                  {formData.semester && `• ${formData.semester}`}
                </p>
              </div>
              {formData.description && <p className="text-sm text-muted-foreground">{formData.description}</p>}
              <div className="flex gap-4 text-sm">
                {formData.creditUnits && <span>Credit Units: {formData.creditUnits}</span>}
                {formData.capacity && <span>Capacity: {formData.capacity} students</span>}
              </div>
              {formData.lecturer && <p className="text-sm">Lecturer: {formData.lecturer}</p>}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Create Course
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
