"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Video, Search, Folder, File, ExternalLink } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/use-api";
import { studentService } from "@/lib/services/studentService";
import { CourseMaterial } from "@/lib/types";

export default function CourseMaterialsPage() {
  const params = useParams();
  const courseId = params?.id as string;
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: materials, isLoading, execute } = useApi<CourseMaterial[]>();

  useEffect(() => {
    if (courseId) {
      execute(() => studentService.getCourseMaterials(courseId), {
        errorMessage: "Failed to load course materials"
      });
    }
  }, [execute, courseId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading materials...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!materials) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Course materials not found</p>
        </div>
      </DashboardLayout>
    );
  }

  // Categorize materials
  const categorizedMaterials = {
    lectures: materials.filter(m => m.type === 'slides' || m.type === 'document'),
    videos: materials.filter(m => m.type === 'video'),
    assignments: materials.filter(m => m.title.toLowerCase().includes('assignment')),
    resources: materials.filter(m => m.type === 'pdf' || m.type === 'document'),
  };

  // Mock course info - in real app, this should come from API
  const course = {
    code: "CSC 401",
    title: "Artificial Intelligence",
    lecturer: "Dr. Michael Anderson"
  };

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
                    <CardDescription>{categorizedMaterials.lectures.length} files available</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleDownloadAll("lectures")}>
                    <Download className="mr-2 h-3 w-3" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categorizedMaterials.lectures.map((lecture) => (
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
                            {lecture.size || 'N/A'} • {new Date(lecture.uploadedAt).toLocaleDateString()}
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
                    <CardDescription>{categorizedMaterials.videos.length} videos available</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleDownloadAll("videos")}>
                    <Download className="mr-2 h-3 w-3" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categorizedMaterials.videos.map((video) => (
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
                            {video.size || 'N/A'} • {new Date(video.uploadedAt).toLocaleDateString()}
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
                <CardTitle>Reference Materials</CardTitle>
                <CardDescription>{categorizedMaterials.resources.length} reference materials available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categorizedMaterials.resources.slice(0, 3).map((book) => (
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
                            {book.size || 'N/A'} • {new Date(book.uploadedAt).toLocaleDateString()}
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
                <CardTitle>Assignment Materials</CardTitle>
                <CardDescription>{categorizedMaterials.assignments.length} assignment materials available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categorizedMaterials.assignments.map((assignment) => (
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
                            {assignment.size || 'N/A'} • {new Date(assignment.uploadedAt).toLocaleDateString()}
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
                <CardTitle>Additional Resources</CardTitle>
                <CardDescription>Supplementary materials and references</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categorizedMaterials.resources.slice(3).map((item) => (
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
                          <p className="text-sm text-muted-foreground">{item.size || 'N/A'}</p>
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
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
