"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Video, Search, Folder, File, ExternalLink } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CourseMaterialsPage() {
  const params = useParams();
  const courseId = params?.id;
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const course = {
    code: "CSC 401",
    title: "Artificial Intelligence",
    lecturer: "Dr. Michael Chen",
  };

  const materials = {
    lectures: [
      {
        id: 1,
        title: "Week 1 - Introduction to AI",
        type: "pdf",
        size: "1.2 MB",
        date: "2025-11-05",
      },
      {
        id: 2,
        title: "Week 2 - Search Algorithms",
        type: "pptx",
        size: "3.5 MB",
        date: "2025-11-12",
      },
      {
        id: 3,
        title: "Week 3 - Knowledge Representation",
        type: "pdf",
        size: "2.1 MB",
        date: "2025-11-19",
      },
      {
        id: 4,
        title: "Week 4 - Machine Learning Basics",
        type: "pdf",
        size: "1.8 MB",
        date: "2025-11-26",
      },
      {
        id: 5,
        title: "Week 5 - Neural Networks",
        type: "pptx",
        size: "4.2 MB",
        date: "2025-12-03",
      },
    ],
    videos: [
      {
        id: 1,
        title: "Lecture Recording - Introduction to AI",
        duration: "1:45:30",
        size: "125 MB",
        date: "2025-11-05",
      },
      {
        id: 2,
        title: "Tutorial - Implementing A* Search",
        duration: "0:35:20",
        size: "45 MB",
        date: "2025-11-12",
      },
      {
        id: 3,
        title: "Lecture Recording - Neural Networks Deep Dive",
        duration: "2:10:15",
        size: "180 MB",
        date: "2025-12-03",
      },
      {
        id: 4,
        title: "Python for AI - Practical Session",
        duration: "1:20:45",
        size: "95 MB",
        date: "2025-12-10",
      },
    ],
    textbooks: [
      {
        id: 1,
        title: "Artificial Intelligence: A Modern Approach",
        author: "Russell & Norvig",
        edition: "4th Edition",
        type: "pdf",
        size: "25 MB",
      },
      {
        id: 2,
        title: "Deep Learning",
        author: "Ian Goodfellow",
        edition: "1st Edition",
        type: "pdf",
        size: "18 MB",
      },
      {
        id: 3,
        title: "Pattern Recognition and Machine Learning",
        author: "Christopher Bishop",
        edition: "1st Edition",
        type: "pdf",
        size: "22 MB",
      },
    ],
    assignments: [
      {
        id: 1,
        title: "Assignment 1 - Search Algorithms",
        dueDate: "2025-12-05",
        type: "pdf",
        size: "450 KB",
      },
      {
        id: 2,
        title: "Assignment 2 - Knowledge Representation",
        dueDate: "2025-12-19",
        type: "pdf",
        size: "520 KB",
      },
      {
        id: 3,
        title: "Project Guidelines",
        dueDate: "2026-01-15",
        type: "pdf",
        size: "680 KB",
      },
    ],
    supplementary: [
      {
        id: 1,
        title: "Python AI Libraries Cheatsheet",
        type: "pdf",
        size: "350 KB",
      },
      {
        id: 2,
        title: "Additional Reading - Ethics in AI",
        type: "pdf",
        size: "1.1 MB",
      },
      {
        id: 3,
        title: "Sample Code - Neural Network Implementation",
        type: "zip",
        size: "2.5 MB",
      },
    ],
  };

  const externalLinks = [
    {
      id: 1,
      title: "TensorFlow Documentation",
      url: "https://tensorflow.org",
      description: "Official TensorFlow documentation and tutorials",
    },
    {
      id: 2,
      title: "PyTorch Tutorials",
      url: "https://pytorch.org/tutorials",
      description: "Learn PyTorch through practical examples",
    },
    {
      id: 3,
      title: "Kaggle Datasets",
      url: "https://kaggle.com/datasets",
      description: "Practice with real-world datasets",
    },
  ];

  const handleDownload = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}...`,
    });
  };

  const handleDownloadAll = (category: string) => {
    toast({
      title: "Bulk Download Started",
      description: `Downloading all ${category}...`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Course Materials</h1>
            <p className="text-muted-foreground">
              {course.code} - {course.title}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleDownloadAll("materials")}>
              <Download className="mr-2 h-4 w-4" />
              Download All
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Materials Tabs */}
        <Tabs defaultValue="lectures">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="lectures">Lecture Notes</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="textbooks">Textbooks</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="supplementary">Supplementary</TabsTrigger>
          </TabsList>

          <TabsContent value="lectures" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Lecture Notes & Slides</CardTitle>
                    <CardDescription>{materials.lectures.length} files available</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleDownloadAll("lectures")}>
                    <Download className="mr-2 h-3 w-3" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {materials.lectures.map((lecture) => (
                    <div
                      key={lecture.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{lecture.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {lecture.size} • {new Date(lecture.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{lecture.type.toUpperCase()}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(lecture.title)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Video Lectures & Tutorials</CardTitle>
                    <CardDescription>{materials.videos.length} videos available</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleDownloadAll("videos")}>
                    <Download className="mr-2 h-3 w-3" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {materials.videos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-red-100 dark:bg-red-900 rounded">
                          <Video className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <p className="font-medium">{video.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {video.duration} • {video.size} • {new Date(video.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Watch
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(video.title)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="textbooks" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Textbooks</CardTitle>
                <CardDescription>{materials.textbooks.length} books available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {materials.textbooks.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded">
                          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">{book.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {book.author} • {book.edition} • {book.size}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(book.title)}
                      >
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Briefs</CardTitle>
                <CardDescription>{materials.assignments.length} assignments available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {materials.assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded">
                          <File className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()} • {assignment.size}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(assignment.title)}
                      >
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supplementary" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Supplementary Materials</CardTitle>
                <CardDescription>Additional resources and references</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {materials.supplementary.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded">
                          <Folder className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleDownload(item.title)}>
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>External Resources</CardTitle>
                <CardDescription>Useful links and references</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {externalLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ExternalLink className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{link.title}</p>
                          <p className="text-sm text-muted-foreground">{link.description}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          Visit
                        </a>
                      </Button>
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
