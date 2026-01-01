"use client";

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

export default function HODStudentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  // Mock student data
  const student = {
    id: params.id,
    name: "Sarah Williams",
    matricNumber: "CS/2021/004",
    email: "sarah.williams@university.edu",
    phone: "+234 803 456 7890",
    level: "400 Level",
    department: "Computer Science",
    cgpa: 4.95,
    classification: "First Class",
    status: "active",
    admissionYear: "2021",
    expectedGraduation: "2025",
  };

  const semesterResults = [
    { semester: "100 Level - First", gpa: 4.80, units: 24, remark: "Excellent" },
    { semester: "100 Level - Second", gpa: 4.85, units: 24, remark: "Excellent" },
    { semester: "200 Level - First", gpa: 4.90, units: 24, remark: "Excellent" },
    { semester: "200 Level - Second", gpa: 4.88, units: 24, remark: "Excellent" },
    { semester: "300 Level - First", gpa: 4.95, units: 24, remark: "Excellent" },
    { semester: "300 Level - Second", gpa: 5.00, units: 24, remark: "Outstanding" },
    { semester: "400 Level - First", gpa: 4.96, units: 24, remark: "Excellent" },
  ];

  const currentCourses = [
    { code: "CSC401", title: "Software Engineering", units: 3, score: 95, grade: "A" },
    { code: "CSC402", title: "Database Systems", units: 3, score: 94, grade: "A" },
    { code: "CSC403", title: "Computer Networks", units: 3, score: 96, grade: "A" },
    { code: "CSC404", title: "Operating Systems", units: 3, score: 93, grade: "A" },
    { code: "CSC405", title: "Artificial Intelligence", units: 3, score: 97, grade: "A" },
    { code: "CSC406", title: "Mobile Computing", units: 3, score: 92, grade: "A" },
  ];

  const achievements = [
    { title: "Best Student Award", year: "2023", description: "300 Level Best Graduating Student" },
    { title: "Dean's List", year: "2021-2024", description: "Consistent academic excellence" },
    { title: "Programming Competition", year: "2023", description: "1st Place - National Hackathon" },
  ];

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
                    {student.name.split(" ").map(n => n[0]).join("")}
                  </div>
                </Avatar>
                <h3 className="font-bold text-lg">{student.name}</h3>
                <p className="text-sm text-muted-foreground font-mono">{student.matricNumber}</p>
                <Badge className="mt-2 bg-green-500">{student.status}</Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{student.email}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{student.phone}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Level</p>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{student.level}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Admission Year</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{student.admissionYear}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Expected Graduation</p>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{student.expectedGraduation}</p>
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
                    <p className="text-3xl font-bold text-green-600">{student.cgpa}</p>
                    <p className="text-sm text-muted-foreground">Current CGPA</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Award className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-xl font-bold">{student.classification}</p>
                    <p className="text-sm text-muted-foreground">Classification</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-3xl font-bold">{currentCourses.length}</p>
                    <p className="text-sm text-muted-foreground">Current Courses</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Current Semester Courses</CardTitle>
                <CardDescription>400 Level - Second Semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentCourses.map((course) => (
                    <div
                      key={course.code}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{course.code}</p>
                        <p className="text-sm text-muted-foreground">{course.title}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="font-bold">{course.score}%</p>
                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                        <Badge className="bg-green-500">{course.grade}</Badge>
                        <div className="text-center">
                          <p className="font-medium">{course.units}</p>
                          <p className="text-xs text-muted-foreground">Units</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Semester Results */}
            <Card>
              <CardHeader>
                <CardTitle>Semester Results History</CardTitle>
                <CardDescription>GPA progression across all semesters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {semesterResults.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{result.semester}</p>
                        <p className="text-sm text-muted-foreground">{result.units} Credit Units</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={`text-xl font-bold ${getGPAColor(result.gpa)}`}>
                            {result.gpa.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">GPA</p>
                        </div>
                        <Badge variant="outline">{result.remark}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Awards & Achievements</CardTitle>
                <CardDescription>Academic honors and recognitions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <Award className="h-5 w-5 text-yellow-500 mt-1" />
                      <div className="flex-1">
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{achievement.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
