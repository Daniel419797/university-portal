"use client";

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

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params?.id;

  // Mock course data
  const course = {
    code: "CSC 401",
    title: "Artificial Intelligence",
    units: 3,
    lecturer: "Dr. Michael Chen",
    email: "m.chen@university.edu",
    office: "Science Building, Room 301",
    officeHours: "Mon, Wed 3:00 PM - 5:00 PM",
    schedule: "Monday & Wednesday, 10:00 AM - 11:30 AM",
    venue: "LT 5, Faculty of Science",
    description:
      "This course provides a comprehensive introduction to Artificial Intelligence, covering fundamental concepts, algorithms, and applications. Students will learn about search algorithms, knowledge representation, machine learning, neural networks, and ethical considerations in AI development.",
    objectives: [
      "Understand fundamental AI concepts and techniques",
      "Implement search and optimization algorithms",
      "Apply machine learning methods to real-world problems",
      "Design and train neural networks",
      "Evaluate ethical implications of AI systems",
    ],
    prerequisites: ["CSC 301 - Data Structures", "MTH 201 - Linear Algebra"],
    gradingScheme: [
      { component: "Assignments", weight: 20 },
      { component: "Quizzes", weight: 10 },
      { component: "Mid-term Exam", weight: 20 },
      { component: "Final Exam", weight: 50 },
    ],
    enrolled: 42,
    capacity: 50,
  };

  const materials = [
    {
      id: 1,
      title: "Course Outline and Syllabus",
      type: "pdf",
      size: "245 KB",
      uploadedDate: "2025-11-01",
    },
    {
      id: 2,
      title: "Chapter 1 - Introduction to AI",
      type: "pdf",
      size: "1.2 MB",
      uploadedDate: "2025-11-05",
    },
    {
      id: 3,
      title: "Lecture Slides - Search Algorithms",
      type: "pptx",
      size: "3.5 MB",
      uploadedDate: "2025-11-12",
    },
    {
      id: 4,
      title: "Recorded Lecture - Neural Networks",
      type: "video",
      size: "125 MB",
      uploadedDate: "2025-11-19",
    },
    {
      id: 5,
      title: "Python AI Libraries Tutorial",
      type: "pdf",
      size: "890 KB",
      uploadedDate: "2025-11-22",
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Assignment 1 Deadline Extended",
      message: "The deadline for Assignment 1 has been extended to December 5th.",
      date: "2025-11-28",
    },
    {
      id: 2,
      title: "Mid-term Exam Schedule",
      message: "Mid-term exam will be held on December 10th at 10:00 AM in LT 5.",
      date: "2025-11-25",
    },
    {
      id: 3,
      title: "Office Hours Change",
      message: "Office hours for this week moved to Thursday 2:00 PM - 4:00 PM.",
      date: "2025-11-20",
    },
  ];

  const schedule = [
    { week: 1, topic: "Introduction to AI and History", date: "Nov 4 - Nov 8" },
    { week: 2, topic: "Search Algorithms: BFS, DFS, A*", date: "Nov 11 - Nov 15" },
    { week: 3, topic: "Knowledge Representation", date: "Nov 18 - Nov 22" },
    { week: 4, topic: "Machine Learning Fundamentals", date: "Nov 25 - Nov 29" },
    { week: 5, topic: "Neural Networks and Deep Learning", date: "Dec 2 - Dec 6" },
    { week: 6, topic: "Natural Language Processing", date: "Dec 9 - Dec 13" },
    { week: 7, topic: "Computer Vision", date: "Dec 16 - Dec 20" },
    { week: 8, topic: "Ethics in AI", date: "Jan 6 - Jan 10" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Course Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {course.code} - {course.title}
            </h1>
            <p className="text-muted-foreground">
              {course.units} Units • {course.lecturer}
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
              <p className="text-sm font-medium">{course.schedule}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Venue</CardDescription>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">{course.venue}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Enrollment</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">
                {course.enrolled}/{course.capacity} Students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Credits</CardDescription>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">{course.units} Units</p>
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
                <p className="text-muted-foreground">{course.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq, index) => (
                      <li key={index}>
                        <Badge variant="outline">{prereq}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Grading Scheme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {course.gradingScheme.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.component}</span>
                        <span className="font-medium">{item.weight}%</span>
                      </div>
                    ))}
                  </div>
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
                    <p className="font-medium">{course.lecturer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{course.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Office</p>
                    <p className="font-medium">{course.office}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Office Hours</p>
                    <p className="font-medium">{course.officeHours}</p>
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
                  {schedule.map((item) => (
                    <div key={item.week} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
                        <span className="text-xl font-bold">W{item.week}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.topic}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  ))}
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
                  {materials.map((material) => (
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
                            {material.size} • Uploaded {new Date(material.uploadedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  ))}
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
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="border-l-4 border-primary pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{announcement.title}</h3>
                        <span className="text-xs text-muted-foreground">
                          {new Date(announcement.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{announcement.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
