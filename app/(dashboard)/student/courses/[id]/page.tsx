"use client";

import { useEffect, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Users,
  Clock,
  Calendar,
  FileText,
  Download,
  Video,
  Link as LinkIcon,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useApi } from "@/hooks/use-api";
import { studentService } from "@/lib/services";
import { type Course, type CourseMaterial } from "@/lib/types";

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params?.id as string;

  const {
    data: course,
    isLoading: loadingCourse,
    execute: loadCourse,
  } = useApi<Course>();

  const {
    data: materials,
    isLoading: loadingMaterials,
    execute: loadMaterials,
  } = useApi<CourseMaterial[]>();

  useEffect(() => {
    if (!courseId) return;
    loadCourse(() => studentService.getCourseDetails(courseId), {
      errorMessage: "Failed to load course",
    });
    loadMaterials(() => studentService.getCourseMaterials(courseId), {
      errorMessage: "Failed to load materials",
    });
  }, [courseId, loadCourse, loadMaterials]);

  const courseSchedule = useMemo(() => course?.schedule || [], [course]);

  const handleDownload = async (material: CourseMaterial) => {
    if (!courseId) return;
    const blob = await studentService.downloadMaterial(courseId, material.id);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = material.title;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Course Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {course?.code || "Loading..."} {course?.title ? `- ${course.title}` : ""}
            </h1>
            <p className="text-muted-foreground">
              {course?.credits ? `${course.credits} Units` : ""} {course?.lecturer ? `• ${course.lecturer}` : ""}
            </p>
          </div>
          <Button asChild>
            <Link href={`/student/courses/${courseId}/materials`}>
              <Download className="mr-2 h-4 w-4" />
              Course Materials
            </Link>
          </Button>
        </div>

        {/* Quick Info Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Schedule</CardDescription>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">
                {courseSchedule.length
                  ? `${courseSchedule[0].day} ${courseSchedule[0].startTime} - ${courseSchedule[0].endTime}`
                  : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Venue</CardDescription>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">{course?.department}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Enrollment</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">
                {course?.enrolled ?? 0}/{course?.capacity ?? 0} Students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Credits</CardDescription>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">{course?.credits} Units</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{course?.description || "No description available."}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Objectives will be provided by your lecturer.</p>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Check departmental handbook for prerequisites.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Grading Scheme</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Grading breakdown will be shared in class.</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lecturer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{course?.lecturer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{course?.lecturer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Office</p>
                    <p className="font-medium">Faculty Office</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Office Hours</p>
                    <p className="font-medium">By Appointment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Schedule</CardTitle>
                <CardDescription>Weekly topics and coverage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courseSchedule.map((item, idx) => (
                    <div key={`${item.day}-${idx}`} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
                        <span className="text-xl font-bold">{item.day.slice(0, 3)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.day}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.startTime} - {item.endTime} • {item.venue}
                        </p>
                      </div>
                    </div>
                  ))}
                  {courseSchedule.length === 0 && (
                    <p className="text-sm text-muted-foreground">Schedule will be shared soon.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Materials</CardTitle>
                <CardDescription>Lecture notes, slides, and resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {loadingMaterials && (
                    <p className="text-sm text-muted-foreground">Loading materials...</p>
                  )}
                  {!loadingMaterials && materials?.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {material.type === "video" ? (
                          <Video className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">{material.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Uploaded {new Date(material.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleDownload(material)}>
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  ))}
                  {!loadingMaterials && (!materials || materials.length === 0) && (
                    <p className="text-sm text-muted-foreground">No materials uploaded yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Announcements</CardTitle>
                <CardDescription>Important updates from your lecturer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Announcements are not available yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
