"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Users, Calendar, Save, Trash2, Edit } from "lucide-react";

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const courseId = params?.id;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    courseCode: "CSC 401",
    courseName: "Artificial Intelligence",
    description: "This course introduces students to the fundamental concepts and techniques of artificial intelligence, including search algorithms, knowledge representation, machine learning, and neural networks.",
    department: "Computer Science",
    level: "400",
    semester: "First Semester",
    creditUnits: "3",
    capacity: "50",
    enrolled: "42",
    lecturer: "Dr. Michael Chen",
    prerequisites: "CSC 301, CSC 302",
    schedule: "Monday 10:00 AM - 12:00 PM\nWednesday 2:00 PM - 4:00 PM",
    status: "active",
  });

  const stats = [
    { label: "Enrolled Students", value: formData.enrolled, icon: Users },
    { label: "Capacity", value: formData.capacity, icon: Users },
    { label: "Credit Units", value: formData.creditUnits, icon: BookOpen },
    { label: "Status", value: formData.status, icon: Calendar },
  ];

  const enrolledStudents = [
    { id: "1", name: "John Doe", matricNumber: "CS/2022/001", enrollmentDate: "2026-01-05" },
    { id: "2", name: "Jane Smith", matricNumber: "CS/2022/002", enrollmentDate: "2026-01-05" },
    { id: "3", name: "Michael Johnson", matricNumber: "CS/2022/003", enrollmentDate: "2026-01-06" },
  ];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Changes Saved",
      description: "Course details have been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete this course? This action cannot be undone.");
    if (!confirmed) return;

    toast({
      title: "Course Deleted",
      description: "The course has been deleted successfully.",
      variant: "destructive",
    });

    setTimeout(() => {
      router.push("/admin/courses");
    }, 1500);
  };

  const enrollmentRate = ((parseInt(formData.enrolled) / parseInt(formData.capacity)) * 100).toFixed(0);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {formData.courseCode} - {formData.courseName}
            </h1>
            <p className="text-muted-foreground">
              {formData.department} • {formData.level} Level • {formData.semester}
            </p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{stat.value}</div>
                {stat.label === "Enrolled Students" && (
                  <p className="text-xs text-muted-foreground mt-1">{enrollmentRate}% capacity</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Details Tabs */}
        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="students">Enrolled Students ({formData.enrolled})</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="courseCode">Course Code</Label>
                        <Input
                          id="courseCode"
                          value={formData.courseCode}
                          onChange={(e) => handleChange("courseCode", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="courseName">Course Name</Label>
                        <Input
                          id="courseName"
                          value={formData.courseName}
                          onChange={(e) => handleChange("courseName", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Course Code:</span>
                      <span className="font-medium">{formData.courseCode}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Course Name:</span>
                      <span className="font-medium">{formData.courseName}</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Description:</p>
                      <p className="text-sm">{formData.description}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="level">Level</Label>
                        <select
                          id="level"
                          className="w-full px-3 py-2 border rounded-md"
                          value={formData.level}
                          onChange={(e) => handleChange("level", e.target.value)}
                        >
                          <option value="100">100 Level</option>
                          <option value="200">200 Level</option>
                          <option value="300">300 Level</option>
                          <option value="400">400 Level</option>
                          <option value="500">500 Level</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="semester">Semester</Label>
                        <select
                          id="semester"
                          className="w-full px-3 py-2 border rounded-md"
                          value={formData.semester}
                          onChange={(e) => handleChange("semester", e.target.value)}
                        >
                          <option value="First Semester">First Semester</option>
                          <option value="Second Semester">Second Semester</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="creditUnits">Credit Units</Label>
                        <Input
                          id="creditUnits"
                          type="number"
                          value={formData.creditUnits}
                          onChange={(e) => handleChange("creditUnits", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prerequisites">Prerequisites</Label>
                      <Input
                        id="prerequisites"
                        value={formData.prerequisites}
                        onChange={(e) => handleChange("prerequisites", e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Level:</span>
                      <span className="font-medium">{formData.level} Level</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Semester:</span>
                      <span className="font-medium">{formData.semester}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Credit Units:</span>
                      <span className="font-medium">{formData.creditUnits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prerequisites:</span>
                      <span className="font-medium">{formData.prerequisites || "None"}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enrollment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={formData.capacity}
                          onChange={(e) => handleChange("capacity", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lecturer">Assigned Lecturer</Label>
                        <Input
                          id="lecturer"
                          value={formData.lecturer}
                          onChange={(e) => handleChange("lecturer", e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-medium">{formData.capacity} students</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current Enrollment:</span>
                      <span className="font-medium">
                        {formData.enrolled} students ({enrollmentRate}%)
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Assigned Lecturer:</span>
                      <span className="font-medium">{formData.lecturer}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Students</CardTitle>
                <CardDescription>{enrolledStudents.length} students enrolled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {enrolledStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.matricNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Enrolled</p>
                        <p className="text-sm font-medium">
                          {new Date(student.enrollmentDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Class Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-2">
                    <Label htmlFor="schedule">Schedule</Label>
                    <Textarea
                      id="schedule"
                      rows={6}
                      value={formData.schedule}
                      onChange={(e) => handleChange("schedule", e.target.value)}
                    />
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap text-muted-foreground">{formData.schedule}</pre>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Back Button */}
        <Button variant="outline" onClick={() => router.back()}>
          Back to Courses
        </Button>
      </div>
    </DashboardLayout>
  );
}
