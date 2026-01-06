"use client";

import { useEffect, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, FileText, Download, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useApi } from "@/hooks/use-api";
import { studentService, type ResultsResponse } from "@/lib/services";
import { calculateGPA } from "@/lib/utils";

export default function StudentResultsPage() {
  const { data, isLoading, execute } = useApi<ResultsResponse>();

  useEffect(() => {
    execute(() => studentService.getResults(), {
      errorMessage: "Failed to load results",
    });
  }, [execute]);

  const { results, gpa: apiGpa, cgpa: apiCgpa } = data || {};

  const totals = useMemo(() => {
    const items = results || [];
    const totalCredits = items.reduce(
      (sum, r) => sum + (r.creditUnit ?? (r as unknown as { credits?: number }).credits ?? 0),
      0
    );

    const gpaValue =
      apiGpa ??
      calculateGPA(
        items.map((r) => ({
          grade: r.grade,
          credits: r.creditUnit ?? (r as unknown as { credits?: number }).credits ?? 0,
        }))
      );

    const cgpaValue = apiCgpa ?? gpaValue;

    const grouped = items.reduce<Record<string, typeof items>>((acc, result) => {
      const keyParts = [result.session, result.semester].filter(Boolean);
      const key = keyParts.length ? keyParts.join(" - ") : "Latest Results";
      if (!acc[key]) acc[key] = [];
      acc[key].push(result);
      return acc;
    }, {});

    return { totalCredits, gpaValue, cgpaValue, grouped };
  }, [apiCgpa, apiGpa, results]);

  const hasResults = (results || []).length > 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {isLoading && (
          <Card>
            <CardHeader>
              <CardTitle>Loading results...</CardTitle>
              <CardDescription>Please wait while we fetch your records.</CardDescription>
            </CardHeader>
          </Card>
        )}

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
                <div className="text-3xl font-bold">{(totals.gpaValue || 0).toFixed(2)}</div>
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
                <div className="text-3xl font-bold">{(totals.cgpaValue || 0).toFixed(2)}</div>
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
                {totals.totalCredits}
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
        {!isLoading && !hasResults && (
          <Card>
            <CardHeader>
              <CardTitle>No results yet</CardTitle>
              <CardDescription>Your results will appear here once available.</CardDescription>
            </CardHeader>
          </Card>
        )}

        {Object.entries(totals.grouped).map(([session, sessionResults]) => {
          const sessionGPA = calculateGPA(
            sessionResults.map((r) => ({
              grade: r.grade,
              credits: r.creditUnit ?? (r as unknown as { credits?: number }).credits ?? 0,
            }))
          );

          return (
            <Card key={session}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{session}</CardTitle>
                    <CardDescription>
                      GPA: {sessionGPA.toFixed(2)} | Total Credits: {sessionResults.reduce(
                        (sum, r) => sum + (r.creditUnit ?? (r as unknown as { credits?: number }).credits ?? 0),
                        0
                      )}
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
                      {sessionResults.map((result) => {
                        const credits = result.creditUnit ?? (result as unknown as { credits?: number }).credits ?? 0;
                        const points = result.gradePoint ?? (result as unknown as { gradePoints?: number }).gradePoints ?? 0;

                        return (
                          <tr
                            key={`${result.courseCode}-${result.score}`}
                            className="border-b border-border hover:bg-muted/50"
                          >
                            <td className="p-3 font-medium">{result.courseCode}</td>
                            <td className="p-3">{result.courseTitle}</td>
                            <td className="text-center p-3">{credits}</td>
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
                              {points.toFixed(1)}
                            </td>
                          </tr>
                        );
                      })}
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
