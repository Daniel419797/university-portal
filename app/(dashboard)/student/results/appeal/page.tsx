"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ResultAppealPage() {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState("");

  const courses = [
    { code: "CSC 301", title: "Operating Systems", score: 58, grade: "C" },
    { code: "CSC 303", title: "Database Systems", score: 62, grade: "B" },
    { code: "CSC 305", title: "Software Engineering", score: 75, grade: "A" },
    { code: "CSC 307", title: "Computer Networks", score: 55, grade: "C" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Appeal Submitted",
      description: "Your result remark request has been submitted for review.",
      variant: "success",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Result Remark Appeal</h1>
          <p className="text-muted-foreground">Request a review of your examination result</p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800 dark:text-yellow-200">
            <p className="font-medium mb-2">Important Information</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Appeals must be submitted within 2 weeks of result publication</li>
              <li>A non-refundable fee of ₦5,000 per course applies</li>
              <li>Processing takes 3-4 weeks</li>
              <li>You will be notified via email and portal notification</li>
              <li>Grade may increase, decrease, or remain the same after review</li>
            </ul>
          </div>
        </div>

        {/* Current Results */}
        <Card>
          <CardHeader>
            <CardTitle>Current Semester Results</CardTitle>
            <CardDescription>Select the course(s) you wish to appeal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {courses.map((course) => (
                <div
                  key={course.code}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedCourse === course.code
                      ? "border-primary bg-primary/5"
                      : "hover:border-muted-foreground/50"
                  }`}
                  onClick={() => setSelectedCourse(course.code)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">
                        {course.code} - {course.title}
                      </p>
                      <p className="text-sm text-muted-foreground">Click to select for appeal</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{course.score}</p>
                      <p className="text-sm text-muted-foreground">Grade: {course.grade}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Appeal Form */}
        <Card>
          <CardHeader>
            <CardTitle>Appeal Details</CardTitle>
            <CardDescription>Provide details for your appeal request</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <select
                  id="course"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.code} value={course.code}>
                      {course.code} - {course.title} (Score: {course.score})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appealType">Type of Appeal</Label>
                <select
                  id="appealType"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select appeal type</option>
                  <option value="remark">Script Remark</option>
                  <option value="review">Score Review</option>
                  <option value="clerical">Clerical Error</option>
                  <option value="missing">Missing Script</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Appeal</Label>
                <Textarea
                  id="reason"
                  placeholder="Explain why you believe your result should be reviewed..."
                  rows={5}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Provide detailed and factual reasons for your appeal
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidence">Additional Evidence (Optional)</Label>
                <Textarea
                  id="evidence"
                  placeholder="Any additional information or evidence to support your appeal..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contact Phone Number</Label>
                <Input
                  id="contact"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  required
                />
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="rounded border-gray-300"
                    required
                  />
                  <label htmlFor="terms" className="text-sm">
                    I understand that the appeal fee (₦5,000) is non-refundable and that the review process may result in a grade increase, decrease, or no change
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="accuracy"
                    className="rounded border-gray-300"
                    required
                  />
                  <label htmlFor="accuracy" className="text-sm">
                    I confirm that all information provided is accurate and truthful
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Submit Appeal (₦5,000)
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Appeal Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p><strong>Valid Grounds for Appeal:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Suspected clerical or computational errors</li>
              <li>Missing examination script</li>
              <li>Significant discrepancy between CA and exam performance</li>
              <li>Evidence of marking inconsistency</li>
            </ul>
            <p className="mt-4"><strong>Invalid Grounds:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>General disagreement with grade without specific evidence</li>
              <li>Desire to improve GPA</li>
              <li>Comparison with other students&apos; results</li>
            </ul>
            <p className="mt-4 text-xs">
              For questions about the appeal process, contact the Academic Office at academics@university.edu
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
