"use client";

import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, Mail, Phone, MapPin, Calendar, BookOpen, 
  TrendingUp, Award, FileText, Clock
} from "lucide-react";

export default function StudentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  // Mock student data
  const student = {
    id: params.id,
    name: "John Doe",
    matricNumber: "CS/2021/001",
    email: "john.doe@university.edu",
    phone: "+234 801 234 5678",
    level: "400 Level",
    department: "Computer Science",
    faculty: "Science",
    cgpa: 4.85,
    status: "active",
    avatar: "/avatars/student.png",
    dateOfBirth: "1999-05-15",
    address: "123 University Road, Lagos",
    guardianName: "Jane Doe",
    guardianPhone: "+234 802 345 6789",
  };

  const coursePerformance = [
    { code: "CSC401", title: "Software Engineering", score: 88, grade: "A", semester: "First Semester" },
    { code: "CSC402", title: "Database Systems", score: 92, grade: "A", semester: "First Semester" },
    { code: "CSC403", title: "Computer Networks", score: 85, grade: "A", semester: "First Semester" },
    { code: "CSC404", title: "Operating Systems", score: 90, grade: "A", semester: "First Semester" },
  ];

  const attendance = [
    { course: "CSC401", present: 28, total: 30, percentage: 93.3 },
    { course: "CSC402", present: 27, total: 30, percentage: 90.0 },
    { course: "CSC403", present: 29, total: 30, percentage: 96.7 },
    { course: "CSC404", present: 26, total: 30, percentage: 86.7 },
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-500";
      case "B":
        return "bg-blue-500";
      case "C":
        return "bg-yellow-500";
      case "D":
        return "bg-orange-500";
      default:
        return "bg-red-500";
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
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
              <h1 className="text-3xl font-bold">Student Profile</h1>
              <p className="text-muted-foreground">Detailed academic information</p>
            </div>
          </div>
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Personal Information */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center pb-4 border-b">
                <Avatar className="h-24 w-24 mb-3">
                  <div className="flex items-center justify-center h-full w-full bg-primary text-primary-foreground text-2xl font-bold">
                    {student.name.split(" ").map(n => n[0]).join("")}
                  </div>
                </Avatar>
                <h3 className="font-bold text-lg">{student.name}</h3>
                <p className="text-sm text-muted-foreground">{student.matricNumber}</p>
                <Badge className="mt-2">{student.status}</Badge>
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
                  <p className="text-sm text-muted-foreground mb-1">Address</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{student.address}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <div className="md:col-span-2 space-y-6">
            {/* Academic Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold">{student.level}</p>
                    <p className="text-sm text-muted-foreground">Current Level</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">{student.cgpa}</p>
                    <p className="text-sm text-muted-foreground">CGPA</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Award className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-2xl font-bold">First Class</p>
                    <p className="text-sm text-muted-foreground">Classification</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-sm text-muted-foreground">Courses</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>Current semester grades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {coursePerformance.map((course) => (
                    <div
                      key={course.code}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{course.code} - {course.title}</p>
                        <p className="text-sm text-muted-foreground">{course.semester}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-lg">{course.score}%</p>
                          <p className="text-sm text-muted-foreground">Score</p>
                        </div>
                        <Badge className={getGradeColor(course.grade)}>
                          {course.grade}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Attendance Record */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Record</CardTitle>
                <CardDescription>Course attendance tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendance.map((record) => (
                    <div
                      key={record.course}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{record.course}</p>
                          <p className="text-sm text-muted-foreground">
                            {record.present} / {record.total} classes
                          </p>
                        </div>
                      </div>
                      <p className={`font-bold text-lg ${getAttendanceColor(record.percentage)}`}>
                        {record.percentage.toFixed(1)}%
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guardian Information */}
            <Card>
              <CardHeader>
                <CardTitle>Guardian Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Guardian Name</p>
                    <p className="font-medium">{student.guardianName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Guardian Phone</p>
                    <p className="font-medium">{student.guardianPhone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
