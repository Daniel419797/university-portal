"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, Award, CheckCircle, XCircle, FileText, Download
} from "lucide-react";

export default function BursaryScholarshipReviewPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [approvalAmount, setApprovalAmount] = useState("");
  const [approvalDuration, setApprovalDuration] = useState("");
  const [approvalNotes, setApprovalNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  // Mock scholarship application data
  const application = {
    id: params.id,
    studentName: "Sarah Williams",
    matricNumber: "CS/2021/004",
    email: "sarah.williams@university.edu",
    phone: "+234 803 456 7890",
    level: "400 Level",
    department: "Computer Science",
    cgpa: 4.95,
    scholarshipType: "Academic Excellence",
    requestedAmount: "₦500,000",
    academicYear: "2025/2026",
    status: "pending",
    appliedDate: "2025-12-15",
    reason: "I am applying for this scholarship to support my final year research project on Artificial Intelligence and Machine Learning. My research aims to develop innovative solutions for healthcare diagnostics. The funding will be used for computational resources, research materials, and conference attendance.",
    achievements: [
      "Best Student Award 2023",
      "Dean's List (2021-2024)",
      "1st Place - National Programming Competition",
      "Research Paper Published in IEEE Conference"
    ],
    financialNeed: "High",
    previousScholarships: "None",
    parentIncome: "₦200,000/month",
    siblings: "3",
    guardianOccupation: "Teacher",
  };

  const documents = [
    { name: "Academic Transcript", status: "verified", uploadedDate: "2025-12-14" },
    { name: "Recommendation Letter", status: "verified", uploadedDate: "2025-12-14" },
    { name: "Financial Statement", status: "verified", uploadedDate: "2025-12-14" },
    { name: "Research Proposal", status: "verified", uploadedDate: "2025-12-15" },
  ];

  const handleApprove = () => {
    if (!approvalAmount || !approvalDuration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Scholarship Approved",
      description: `${application.studentName}'s scholarship application has been approved for ${approvalAmount}.`,
    });

    setTimeout(() => {
      router.push("/bursary/scholarships");
    }, 2000);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Missing Reason",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Application Rejected",
      description: "The scholarship application has been rejected.",
      variant: "destructive",
    });

    setTimeout(() => {
      router.push("/bursary/scholarships");
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500">Verified</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="destructive">Unverified</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Scholarship Application Review</h1>
              <p className="text-muted-foreground">Detailed application assessment</p>
            </div>
          </div>
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            {application.status}
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Student Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center pb-4 border-b">
                  <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    {application.studentName.split(" ").map(n => n[0]).join("")}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{application.studentName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Matric Number</p>
                    <p className="font-mono">{application.matricNumber}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-sm">{application.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-sm">{application.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Level</p>
                    <p className="font-medium">{application.level}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium">{application.department}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">CGPA</p>
                    <p className="text-2xl font-bold text-green-600">{application.cgpa}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Financial Need</p>
                  <Badge variant="destructive">{application.financialNeed}</Badge>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Parent/Guardian Income</p>
                  <p className="font-medium">{application.parentIncome}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Guardian Occupation</p>
                  <p className="font-medium">{application.guardianOccupation}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Number of Siblings</p>
                  <p className="font-medium">{application.siblings}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Previous Scholarships</p>
                  <p className="font-medium">{application.previousScholarships}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Scholarship Details */}
            <Card>
              <CardHeader>
                <CardTitle>Scholarship Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Scholarship Type</p>
                    <p className="font-medium text-lg">{application.scholarshipType}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Requested Amount</p>
                    <p className="font-bold text-2xl text-blue-600">{application.requestedAmount}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Academic Year</p>
                    <p className="font-medium">{application.academicYear}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Application Date</p>
                    <p className="font-medium">{new Date(application.appliedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Statement */}
            <Card>
              <CardHeader>
                <CardTitle>Application Statement</CardTitle>
                <CardDescription>Reason for scholarship request</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{application.reason}</p>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {application.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <p className="font-medium">{achievement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Supporting Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Uploaded: {new Date(doc.uploadedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(doc.status)}
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {application.status === "pending" && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Actions</CardTitle>
                  <CardDescription>Approve or reject this scholarship application</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      size="lg"
                      onClick={() => setShowApproveDialog(true)}
                    >
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Approve Application
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      size="lg"
                      onClick={() => setShowRejectDialog(true)}
                    >
                      <XCircle className="mr-2 h-5 w-5" />
                      Reject Application
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Approve Dialog */}
        <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Approve Scholarship</DialogTitle>
              <DialogDescription>
                Provide approval details for {application.studentName}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Approved Amount *</Label>
                <Input
                  placeholder="e.g., ₦500,000"
                  value={approvalAmount}
                  onChange={(e) => setApprovalAmount(e.target.value)}
                />
              </div>

              <div>
                <Label>Duration *</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={approvalDuration}
                  onChange={(e) => setApprovalDuration(e.target.value)}
                >
                  <option value="">Select duration</option>
                  <option value="1-semester">1 Semester</option>
                  <option value="2-semesters">2 Semesters (1 Academic Year)</option>
                  <option value="4-semesters">4 Semesters (2 Academic Years)</option>
                  <option value="full-program">Full Program Duration</option>
                </select>
              </div>

              <div>
                <Label>Approval Notes (Optional)</Label>
                <Textarea
                  placeholder="Add any conditions or notes..."
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700">
                  Confirm Approval
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowApproveDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Application</DialogTitle>
              <DialogDescription>
                Provide a reason for rejecting this application
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Rejection Reason *</Label>
                <Textarea
                  placeholder="Enter detailed reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="destructive" onClick={handleReject} className="flex-1">
                  Confirm Rejection
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowRejectDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
