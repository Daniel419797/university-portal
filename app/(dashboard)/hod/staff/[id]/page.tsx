"use client";

import { useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, BookOpen, Award, Calendar, FileText } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useApi } from "@/hooks/use-api";
import { hodService } from "@/lib/services/hodBursaryService";
import { StaffMember } from "@/lib/types";

export default function StaffProfilePage() {
  const params = useParams();
  const router = useRouter();
  const staffId = params?.id as string;

  const { data: staff, isLoading, execute } = useApi<StaffMember>();

  useEffect(() => {
    if (staffId) {
      execute(() => hodService.getStaffProfile(staffId), {
        errorMessage: "Failed to load staff profile"
      });
    }
  }, [execute, staffId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading staff profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!staff) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Staff member not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const courses = staff.courses || [];
  const students = staff.students || [];
  const publications = staff.publications || [];
  const totalStudents = courses.reduce((sum: number, course: any) => sum + (course.students || 0), 0);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{staff.name}</h1>
            <p className="text-muted-foreground">
              {staff.position || 'Staff'} • {staff.department || 'Department'}
            </p>
          </div>
          <Badge className="text-lg px-4 py-1">{staff.status || 'Active'}</Badge>
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
                  <span className="font-medium">{staff.staffId || staff.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{staff.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{staff.phone || 'Not provided'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Office:</span>
                  <span className="font-medium">{staff.office || 'Not assigned'}</span>
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
                  <span className="font-medium">{staff.department || 'Not assigned'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Position:</span>
                  <span className="font-medium">{staff.position || 'Staff'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Join Date:</span>
                  <span className="font-medium">{staff.joinDate ? new Date(staff.joinDate).toLocaleDateString() : 'Not available'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Years of Service:</span>
                  <span className="font-medium">
                    {staff.joinDate ? new Date().getFullYear() - new Date(staff.joinDate).getFullYear() : 0} years
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
                  {staff.qualifications?.map((qual, index) => (
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
                  {staff.specialization?.map((area, index) => (
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
