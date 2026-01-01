"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, BookOpen, Award, Calendar, FileText } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function StaffProfilePage() {
  const params = useParams();
  const router = useRouter();
  const staffId = params?.id;

  const staff = {
    id: staffId,
    name: "Dr. Michael Chen",
    staffId: "STF/2020/045",
    email: "michael.chen@university.edu",
    phone: "+234 123 456 7890",
    department: "Computer Science",
    position: "Senior Lecturer",
    office: "Room 204, CS Building",
    joinDate: "2020-09-01",
    qualifications: ["PhD in Computer Science - Stanford University", "MSc in AI - MIT", "BSc in Computer Science - University of Lagos"],
    specialization: ["Artificial Intelligence", "Machine Learning", "Data Mining", "Neural Networks"],
    status: "active",
  };

  const courses = [
    { code: "CSC 401", name: "Artificial Intelligence", students: 42, level: "400" },
    { code: "CSC 301", name: "Data Structures", students: 58, level: "300" },
    { code: "CSC 501", name: "Advanced AI", students: 15, level: "500" },
  ];

  const students = [
    { name: "John Doe", matricNumber: "CS/2022/001", level: "400", project: "AI Chatbot" },
    { name: "Jane Smith", matricNumber: "CS/2022/002", level: "400", project: "ML Image Recognition" },
    { name: "Michael Johnson", matricNumber: "CS/2023/015", level: "500", project: "Neural Network Optimization" },
  ];

  const publications = [
    {
      title: "Deep Learning Approaches to Natural Language Processing",
      journal: "Journal of AI Research",
      year: 2025,
    },
    {
      title: "Efficient Neural Network Architectures for Edge Devices",
      journal: "IEEE Transactions on Neural Networks",
      year: 2024,
    },
  ];

  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{staff.name}</h1>
            <p className="text-muted-foreground">
              {staff.position} • {staff.department}
            </p>
          </div>
          <Badge className="text-lg px-4 py-1">{staff.status}</Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Courses Teaching</CardDescription>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{courses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Students</CardDescription>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Supervising</CardDescription>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">Project students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Publications</CardDescription>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{publications.length}</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>
        </div>

        {/* Staff Details Tabs */}
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Full Name:</span>
                  <span className="font-medium">{staff.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Staff ID:</span>
                  <span className="font-medium">{staff.staffId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{staff.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{staff.phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Office:</span>
                  <span className="font-medium">{staff.office}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">{staff.department}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Position:</span>
                  <span className="font-medium">{staff.position}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Join Date:</span>
                  <span className="font-medium">{new Date(staff.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Years of Service:</span>
                  <span className="font-medium">
                    {new Date().getFullYear() - new Date(staff.joinDate).getFullYear()} years
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Qualifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {staff.qualifications.map((qual, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-muted-foreground">{qual}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas of Specialization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {staff.specialization.map((area, index) => (
                    <Badge key={index} variant="outline">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Courses Taught</CardTitle>
                <CardDescription>{courses.length} courses this semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">
                          {course.code} - {course.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{course.level} Level</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{course.students}</div>
                        <p className="text-sm text-muted-foreground">Students</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Students Under Supervision</CardTitle>
                <CardDescription>Project and thesis supervision</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {students.map((student, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.matricNumber}</p>
                        </div>
                        <Badge>{student.level} Level</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Project:</span> {student.project}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Research Tab */}
          <TabsContent value="research">
            <Card>
              <CardHeader>
                <CardTitle>Recent Publications</CardTitle>
                <CardDescription>Published research papers and articles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {publications.map((pub, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">{pub.title}</h4>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{pub.journal}</span>
                        <span>•</span>
                        <span>{pub.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Back Button */}
        <Button variant="outline" onClick={() => router.back()}>
          Back to Staff List
        </Button>
      </div>
    </DashboardLayout>
  );
}
