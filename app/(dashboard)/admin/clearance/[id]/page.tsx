"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, User, FileCheck, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClearanceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const clearanceId = params?.id;

  const student = {
    id: clearanceId,
    name: "John Doe",
    matricNumber: "STU/2023/001",
    department: "Computer Science",
    level: "400",
    session: "2025/2026",
    email: "john.doe@university.edu",
    phone: "+234 123 456 7890",
  };

  const clearanceItems = [
    {
      id: "1",
      department: "Library",
      status: "approved",
      approvedBy: "Mrs. Sarah Johnson",
      approvedDate: "2025-12-28",
      comments: "No outstanding books. Cleared.",
    },
    {
      id: "2",
      department: "Bursary",
      status: "approved",
      approvedBy: "Mr. David Chen",
      approvedDate: "2025-12-29",
      comments: "All fees paid. Student cleared.",
    },
    {
      id: "3",
      department: "Department",
      status: "pending",
      approvedBy: null,
      approvedDate: null,
      comments: null,
    },
    {
      id: "4",
      department: "Hostel",
      status: "approved",
      approvedBy: "Dr. James Wilson",
      approvedDate: "2025-12-30",
      comments: "Room vacated and inspected. No damages.",
    },
    {
      id: "5",
      department: "Student Affairs",
      status: "rejected",
      approvedBy: "Prof. Michael Anderson",
      approvedDate: "2025-12-31",
      comments: "Outstanding disciplinary case. Must resolve before clearance.",
    },
  ];

  const progress = clearanceItems.filter((item) => item.status === "approved").length;
  const total = clearanceItems.length;
  const progressPercent = (progress / total) * 100;

  const handleApprove = (itemId: string) => {
    toast({
      title: "Clearance Approved",
      description: "Department clearance has been approved.",
    });
  };

  const handleReject = (itemId: string) => {
    toast({
      title: "Clearance Rejected",
      description: "Department clearance has been rejected.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Clearance Details</h1>
            <p className="text-muted-foreground">{student.name} - {student.matricNumber}</p>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Clearance Progress</CardTitle>
            <CardDescription>
              {progress} of {total} departments completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Overall Progress</span>
                <span className="text-muted-foreground">{progressPercent.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Full Name:</span>
                <span className="font-medium">{student.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Matric Number:</span>
                <span className="font-medium font-mono">{student.matricNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Department:</span>
                <span className="font-medium">{student.department}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Level:</span>
                <span className="font-medium">Level {student.level}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Session:</span>
                <span className="font-medium">{student.session}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{student.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clearance Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Clearance Status by Department
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {clearanceItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <div>
                        <h4 className="font-semibold">{item.department}</h4>
                        {item.approvedBy && (
                          <p className="text-sm text-muted-foreground">
                            Approved by {item.approvedBy} on{" "}
                            {new Date(item.approvedDate!).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>

                  {item.comments && (
                    <div className="mb-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm">{item.comments}</p>
                    </div>
                  )}

                  {item.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handleApprove(item.id)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(item.id)}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        {progress === total && (
          <Card className="border-green-500">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <h4 className="font-semibold">Clearance Complete</h4>
                    <p className="text-sm text-muted-foreground">
                      All departments have approved this student's clearance
                    </p>
                  </div>
                </div>
                <Button className="bg-green-500 hover:bg-green-600">
                  Generate Clearance Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
