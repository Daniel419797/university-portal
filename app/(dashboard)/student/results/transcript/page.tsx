"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, AlertCircle } from "lucide-react";

export default function TranscriptPage() {
  const studentInfo = {
    name: "John Doe",
    matricNumber: "STU/2023/001",
    department: "Computer Science",
    faculty: "Science",
    level: "400",
    entryYear: "2021",
    mode: "Full Time",
  };

  const transcriptData = [
    {
      session: "2021/2022",
      semester: "First Semester",
      courses: [
        { code: "CSC 101", title: "Introduction to Computing", unit: 3, grade: "A", point: 15 },
        { code: "MTH 101", title: "General Mathematics I", unit: 3, grade: "B", point: 12 },
        { code: "PHY 101", title: "General Physics I", unit: 3, grade: "A", point: 15 },
        { code: "GST 101", title: "Use of English", unit: 2, grade: "B", point: 8 },
      ],
      gpa: 4.17,
      cgpa: 4.17,
    },
    {
      session: "2021/2022",
      semester: "Second Semester",
      courses: [
        { code: "CSC 102", title: "Introduction to Problem Solving", unit: 3, grade: "A", point: 15 },
        { code: "MTH 102", title: "General Mathematics II", unit: 3, grade: "A", point: 15 },
        { code: "PHY 102", title: "General Physics II", unit: 3, grade: "B", point: 12 },
        { code: "CHM 102", title: "General Chemistry", unit: 2, grade: "B", point: 8 },
      ],
      gpa: 4.55,
      cgpa: 4.36,
    },
    {
      session: "2022/2023",
      semester: "First Semester",
      courses: [
        { code: "CSC 201", title: "Computer Programming I", unit: 4, grade: "A", point: 20 },
        { code: "CSC 203", title: "Data Structures", unit: 3, grade: "A", point: 15 },
        { code: "MTH 201", title: "Mathematical Methods I", unit: 3, grade: "B", point: 12 },
        { code: "STA 201", title: "Probability I", unit: 3, grade: "B", point: 12 },
      ],
      gpa: 4.54,
      cgpa: 4.42,
    },
  ];

  const totalUnits = transcriptData.reduce(
    (sum, sem) => sum + sem.courses.reduce((s, c) => s + c.unit, 0),
    0
  );
  const totalPoints = transcriptData.reduce(
    (sum, sem) => sum + sem.courses.reduce((s, c) => s + c.point, 0),
    0
  );
  const overallCGPA = (totalPoints / totalUnits).toFixed(2);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Academic Transcript</h1>
            <p className="text-muted-foreground">Official academic record</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Notice */}
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">Transcript Request</p>
            <p>
              Official transcripts can be requested from the Academic Office. Processing takes 5-7 working days.
              Unofficial transcripts can be downloaded immediately.
            </p>
          </div>
        </div>

        {/* Student Information */}
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{studentInfo.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Matric Number</p>
                <p className="font-mono font-medium">{studentInfo.matricNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Department</p>
                <p className="font-medium">{studentInfo.department}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Faculty</p>
                <p className="font-medium">{studentInfo.faculty}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Current Level</p>
                <p className="font-medium">{studentInfo.level} Level</p>
              </div>
              <div>
                <p className="text-muted-foreground">Entry Year</p>
                <p className="font-medium">{studentInfo.entryYear}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Mode of Study</p>
                <p className="font-medium">{studentInfo.mode}</p>
              </div>
              <div>
                <p className="text-muted-foreground">CGPA</p>
                <p className="font-bold text-lg">{overallCGPA}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Records */}
        {transcriptData.map((semesterData, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{semesterData.session}</CardTitle>
                  <CardDescription>{semesterData.semester}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Semester GPA</p>
                  <Badge className="text-lg px-3 py-1">{semesterData.gpa.toFixed(2)}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Course Code</th>
                      <th className="text-left py-2">Course Title</th>
                      <th className="text-center py-2">Units</th>
                      <th className="text-center py-2">Grade</th>
                      <th className="text-center py-2">Grade Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semesterData.courses.map((course, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-3 font-mono">{course.code}</td>
                        <td className="py-3">{course.title}</td>
                        <td className="py-3 text-center">{course.unit}</td>
                        <td className="py-3 text-center">
                          <Badge variant="outline">{course.grade}</Badge>
                        </td>
                        <td className="py-3 text-center font-medium">{course.point}</td>
                      </tr>
                    ))}
                    <tr className="font-semibold">
                      <td colSpan={2} className="py-3 text-right">
                        Total:
                      </td>
                      <td className="py-3 text-center">
                        {semesterData.courses.reduce((sum, c) => sum + c.unit, 0)}
                      </td>
                      <td className="py-3 text-center">-</td>
                      <td className="py-3 text-center">
                        {semesterData.courses.reduce((sum, c) => sum + c.point, 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">Semester GPA: </span>
                  <span className="font-bold">{semesterData.gpa.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Cumulative GPA: </span>
                  <span className="font-bold">{semesterData.cgpa.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-muted-foreground text-sm">Total Units Earned</p>
                <p className="text-3xl font-bold">{totalUnits}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Grade Points</p>
                <p className="text-3xl font-bold">{totalPoints}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Cumulative GPA</p>
                <p className="text-3xl font-bold text-primary">{overallCGPA}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Options */}
        <Card>
          <CardHeader>
            <CardTitle>Request Official Transcript</CardTitle>
            <CardDescription>For employment, further studies, or official purposes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Unofficial Transcript</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For personal use and reference. Available immediately.
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download (Free)
                </Button>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Official Transcript</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Certified and sealed. Processing: 5-7 days. Fee: ₦5,000
                </p>
                <Button className="w-full">Request Official Copy</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
