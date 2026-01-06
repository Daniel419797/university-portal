"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, Mail, Phone, Calendar, BookOpen, 
  TrendingUp, Award, FileText
} from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { hodService, StudentAcademicProfile } from "@/lib/services/hodBursaryService";

export default function HODStudentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const { data: student, isLoading, execute } = useApi<StudentAcademicProfile>();

  useEffect(() => {
    if (params.id) {
      execute(() => hodService.getStudentProfile(params.id as string), {
        errorMessage: "Failed to load student profile"
      });
    }
  }, [execute, params.id]);

  const getGPAColor = (gpa: number) => {
    if (gpa >= 4.5) return "text-green-600";
    if (gpa >= 3.5) return "text-blue-600";
    if (gpa >= 2.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getCGPAClass = (cgpa: number) => {
    if (cgpa >= 4.5) return "First Class";
    if (cgpa >= 3.5) return "Second Class Upper";
    if (cgpa >= 2.5) return "Second Class Lower";
    if (cgpa >= 1.5) return "Third Class";
    return "Pass";
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading student profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!student) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-muted-foreground">Student profile not found</p>
            <Button className="mt-4" onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Student Academic Profile</h1>
              <p className="text-muted-foreground">Complete academic record and performance</p>
            </div>
          </div>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Transcript
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Student Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center pb-4 border-b">
                <Avatar className="h-24 w-24 mb-3">
                  <div className="flex items-center justify-center h-full w-full bg-primary text-primary-foreground text-2xl font-bold">
                    {student.personalInfo.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                </Avatar>
                <h3 className="font-bold text-lg">{student.personalInfo.name}</h3>
                <p className="text-sm text-muted-foreground font-mono">{student.personalInfo.matricNumber}</p>
                <Badge className="mt-2 bg-green-500">active</Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{student.personalInfo.email}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{student.personalInfo.phone}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Level</p>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{student.academicInfo.currentLevel}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{new Date(student.personalInfo.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Gender</p>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{student.personalInfo.gender}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Performance */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-3xl font-bold text-green-600">{student.academicInfo.cgpa.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Current CGPA</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Award className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-xl font-bold">{student.academicInfo.classification}</p>
                    <p className="text-sm text-muted-foreground">Classification</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-3xl font-bold">{student.currentCourses.length}</p>
                    <p className="text-sm text-muted-foreground">Current Courses</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Current Semester Courses</CardTitle>
                <CardDescription>{student.academicInfo.currentLevel}</CardDescription>
              </CardHeader>
              <CardContent>
                {student.currentCourses.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No current courses</p>
                ) : (
                  <div className="space-y-2">
                    {student.currentCourses.map((course) => (
                      <div
                        key={course.courseCode}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{course.courseCode}</p>
                          <p className="text-sm text-muted-foreground">{course.courseTitle}</p>
                          <p className="text-xs text-muted-foreground">Lecturer: {course.lecturer}</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{course.credits}</p>
                          <p className="text-xs text-muted-foreground">Credits</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Semester Results */}
            <Card>
              <CardHeader>
                <CardTitle>Semester Results History</CardTitle>
                <CardDescription>GPA progression across all semesters</CardDescription>
              </CardHeader>
              <CardContent>
                {student.semesterResults.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No semester results</p>
                ) : (
                  <div className="space-y-2">
                    {student.semesterResults.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{result.semester}</p>
                          <div className="text-sm text-muted-foreground mt-1">
                            {result.courses.length} courses
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-xl font-bold ${getGPAColor(result.gpa)}`}>
                            {result.gpa.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">GPA</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Awards & Achievements</CardTitle>
                <CardDescription>Academic honors and recognitions</CardDescription>
              </CardHeader>
              <CardContent>
                {student.achievements.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No achievements recorded</p>
                ) : (
                  <div className="space-y-3">
                    {student.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <Award className="h-5 w-5 text-yellow-500 mt-1" />
                        <div className="flex-1">
                          <p className="font-medium">{achievement.title}</p>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="outline">{achievement.type}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
