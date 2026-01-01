"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, FileText, Download, TrendingUp } from "lucide-react";
import Link from "next/link";
import { mockResults } from "@/lib/mock-data";
import { calculateGPA } from "@/lib/utils";

export default function StudentResultsPage() {
  // Calculate GPA/CGPA
  const currentSemesterResults = mockResults.filter(
    (r) => r.semester === "first" && r.session === "2023/2024"
  );
  
  const gpa = calculateGPA(
    currentSemesterResults.map((r) => ({ grade: r.grade, credits: r.credits }))
  );

  const cgpa = calculateGPA(
    mockResults.map((r) => ({ grade: r.grade, credits: r.credits }))
  );

  // Group results by session
  const resultsBySession = mockResults.reduce((acc, result) => {
    const key = `${result.session} - ${result.semester}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(result);
    return acc;
  }, {} as Record<string, typeof mockResults>);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Academic Results</h1>
            <p className="text-muted-foreground">
              View your grades and academic performance
            </p>
          </div>
          <Button asChild>
            <Link href="/student/results/transcript">
              <Download className="mr-2 h-4 w-4" />
              Download Transcript
            </Link>
          </Button>
        </div>

        {/* GPA Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
              <CardDescription>This Semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold">{gpa.toFixed(2)}</div>
                <Badge variant="success">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Good
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">CGPA</CardTitle>
              <CardDescription>Cumulative</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold">{cgpa.toFixed(2)}</div>
                <Badge variant="success">
                  <Trophy className="h-3 w-3 mr-1" />
                  Excellent
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
              <CardDescription>Earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockResults.reduce((sum, r) => sum + r.credits, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grade Scale Reference */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Scale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
              {[
                { grade: "A", range: "70-100", points: "5.0" },
                { grade: "B", range: "60-69", points: "4.0" },
                { grade: "C", range: "50-59", points: "3.0" },
                { grade: "D", range: "45-49", points: "2.0" },
                { grade: "E", range: "40-44", points: "1.0" },
                { grade: "F", range: "0-39", points: "0.0" },
              ].map((item) => (
                <div key={item.grade} className="rounded-lg border border-border p-3">
                  <div className="text-2xl font-bold">{item.grade}</div>
                  <div className="text-sm text-muted-foreground">{item.range}</div>
                  <div className="text-xs text-muted-foreground">{item.points} pts</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results by Session */}
        {Object.entries(resultsBySession).map(([session, results]) => {
          const sessionGPA = calculateGPA(
            results.map((r) => ({ grade: r.grade, credits: r.credits }))
          );

          return (
            <Card key={session}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {session.charAt(0).toUpperCase() + session.slice(1)} Semester
                    </CardTitle>
                    <CardDescription>
                      GPA: {sessionGPA.toFixed(2)} | Total Credits:{" "}
                      {results.reduce((sum, r) => sum + r.credits, 0)}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Result Slip
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-medium">Course Code</th>
                        <th className="text-left p-3 font-medium">Course Title</th>
                        <th className="text-center p-3 font-medium">Credits</th>
                        <th className="text-center p-3 font-medium">Score</th>
                        <th className="text-center p-3 font-medium">Grade</th>
                        <th className="text-center p-3 font-medium">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result) => (
                        <tr
                          key={result.id}
                          className="border-b border-border hover:bg-muted/50"
                        >
                          <td className="p-3 font-medium">{result.courseCode}</td>
                          <td className="p-3">{result.courseTitle}</td>
                          <td className="text-center p-3">{result.credits}</td>
                          <td className="text-center p-3">{result.score}</td>
                          <td className="text-center p-3">
                            <Badge
                              variant={
                                result.grade === "A"
                                  ? "success"
                                  : result.grade === "F"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {result.grade}
                            </Badge>
                          </td>
                          <td className="text-center p-3 font-medium">
                            {result.gradePoints.toFixed(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Other Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link href="/student/results/appeal">Request Result Remark</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/student/results/transcript">
                  Generate Official Transcript
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/student/attendance">View Attendance Record</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
