"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, DollarSign, Calendar, Users, FileText } from "lucide-react";

interface Scholarship {
  id: string;
  name: string;
  description: string;
  amount: number;
  eligibilityCriteria: string;
  deadline: string;
  status: "open" | "closed";
  slots: number;
  applicants: number;
}

interface ScholarshipApplication {
  id: string;
  scholarshipName: string;
  amount: number;
  status: "pending" | "under_review" | "approved" | "rejected";
  appliedAt: string;
}

export default function StudentScholarshipsPage() {
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  const scholarships: Scholarship[] = [
    {
      id: "1",
      name: "Merit Scholarship",
      description: "For students with outstanding academic performance",
      amount: 100000,
      eligibilityCriteria: "CGPA ≥ 4.5, No failed courses",
      deadline: "2026-02-28",
      status: "open",
      slots: 50,
      applicants: 32,
    },
    {
      id: "2",
      name: "Need-Based Scholarship",
      description: "Financial assistance for students from low-income families",
      amount: 75000,
      eligibilityCriteria: "Proven financial need, CGPA ≥ 3.5",
      deadline: "2026-03-15",
      status: "open",
      slots: 100,
      applicants: 78,
    },
    {
      id: "3",
      name: "Sports Excellence Award",
      description: "For students with exceptional sports achievements",
      amount: 50000,
      eligibilityCriteria: "State/National level sports participation",
      deadline: "2026-02-15",
      status: "open",
      slots: 20,
      applicants: 15,
    },
    {
      id: "4",
      name: "Research Grant",
      description: "Support for undergraduate research projects",
      amount: 150000,
      eligibilityCriteria: "Research proposal required, CGPA ≥ 4.0",
      deadline: "2026-01-31",
      status: "open",
      slots: 10,
      applicants: 8,
    },
  ];

  const myApplications: ScholarshipApplication[] = [
    {
      id: "1",
      scholarshipName: "Merit Scholarship",
      amount: 100000,
      status: "under_review",
      appliedAt: "2026-01-05",
    },
  ];

  const handleApply = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setShowApplicationDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "under_review":
        return "secondary";
      case "pending":
        return "outline";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Scholarships</h1>
          <p className="text-muted-foreground">Browse and apply for available scholarships</p>
        </div>

        {/* My Applications */}
        {myApplications.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
              <CardDescription>Track your scholarship applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{app.scholarshipName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Applied: {new Date(app.appliedAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-medium mt-1">₦{app.amount.toLocaleString()}</p>
                    </div>
                    <Badge variant={getStatusColor(app.status)}>{app.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Scholarships */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Scholarships</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {scholarships.map((scholarship) => {
              const progress = (scholarship.applicants / scholarship.slots) * 100;
              const hasApplied = myApplications.some(
                (app) => app.scholarshipName === scholarship.name
              );

              return (
                <Card key={scholarship.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <GraduationCap className="h-5 w-5 mt-1 text-primary" />
                        <div>
                          <CardTitle>{scholarship.name}</CardTitle>
                          <CardDescription>{scholarship.description}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={scholarship.status === "open" ? "default" : "secondary"}
                      >
                        {scholarship.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-lg">
                          ₦{scholarship.amount.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>
                          {scholarship.applicants}/{scholarship.slots} applicants
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Application Progress</span>
                        <span className="font-medium">{progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>

                    <div className="border-t pt-3">
                      <p className="text-sm font-medium mb-1">Eligibility Criteria</p>
                      <p className="text-sm text-muted-foreground">
                        {scholarship.eligibilityCriteria}
                      </p>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => handleApply(scholarship)}
                      disabled={hasApplied || scholarship.status === "closed"}
                    >
                      {hasApplied ? "Already Applied" : "Apply Now"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Application Dialog */}
        <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for Scholarship</DialogTitle>
              <DialogDescription>
                {selectedScholarship?.name} - ₦{selectedScholarship?.amount.toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Current CGPA</Label>
                <Input type="number" step="0.01" min="0" max="5" placeholder="4.50" />
              </div>
              <div>
                <Label>Personal Statement</Label>
                <Textarea
                  placeholder="Explain why you should be awarded this scholarship..."
                  rows={5}
                />
              </div>
              <div>
                <Label>Supporting Documents</Label>
                <Input type="file" multiple />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload transcripts, certificates, or other relevant documents
                </p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Submit Application</Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowApplicationDialog(false)}
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
