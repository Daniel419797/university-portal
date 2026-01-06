"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { useApi } from "@/hooks/use-api";
import { lecturerService } from "@/lib/services/lecturerService";
import { Assignment } from "@/lib/types";

export default function LecturerAssignmentsPage() {
  const { data: assignments, isLoading, execute } = useApi<Assignment[]>();

  useEffect(() => {
    execute(() => lecturerService.getAssignments(), {
      errorMessage: "Failed to load assignments"
    });
  }, [execute]);

  const getStatusBadge = (assignment: Assignment) => {
    const now = new Date();
    const due = new Date(assignment.dueDate);

    if (assignment.status === "graded") {
      return <Badge className="bg-green-500">All Graded</Badge>;
    } else if (now > due) {
      return <Badge variant="destructive">Overdue</Badge>;
    } else {
      return <Badge variant="secondary">Active</Badge>;
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading assignments...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Assignments</h1>
            <p className="text-muted-foreground">Create and manage course assignments</p>
          </div>
          <Button asChild>
            <Link href="/lecturer/assignments/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({assignments?.length || 0})</TabsTrigger>
            <TabsTrigger value="pending">
              Pending Grading ({assignments?.filter((a) => (a.graded || 0) < (a.submissions || 0)).length || 0})
            </TabsTrigger>
            <TabsTrigger value="graded">
              Graded ({assignments?.filter((a) => (a.graded || 0) === (a.submissions || 0)).length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {assignments?.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {assignment.courseId} - {assignment.title}
                        {getStatusBadge(assignment)}
                      </CardTitle>
                      <CardDescription>{assignment.courseName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Due Date</p>
                        <p className="font-medium">
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Submissions</p>
                        <p className="font-medium">
                          {assignment.submissions || 0}/{assignment.totalStudents || 0}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Graded</p>
                        <p className="font-medium">
                          {assignment.graded || 0}/{assignment.submissions || 0}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Marks</p>
                        <p className="font-medium">{assignment.totalMarks}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/lecturer/assignments/${assignment.id}/submissions`}>
                        View Submissions
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/lecturer/assignments/${assignment.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending">
            {/* Similar layout for pending assignments */}
            <p className="text-center text-muted-foreground py-8">
              Assignments pending grading will appear here
            </p>
          </TabsContent>

          <TabsContent value="graded">
            {/* Similar layout for graded assignments */}
            <p className="text-center text-muted-foreground py-8">
              Fully graded assignments will appear here
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
