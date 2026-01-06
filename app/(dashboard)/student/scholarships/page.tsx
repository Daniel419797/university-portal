"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { GraduationCap, DollarSign, Calendar } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import {
  studentService,
  type Scholarship,
  type ScholarshipApplication,
  type ScholarshipApplicationRequest,
} from "@/lib/services";

export default function StudentScholarshipsPage() {
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [applicationForm, setApplicationForm] = useState<ScholarshipApplicationRequest>({
    scholarshipId: "",
    reason: "",
    documents: [],
  });

  const {
    data: scholarships,
    isLoading: loadingScholarships,
    execute: loadScholarships,
  } = useApi<Scholarship[]>();

  const {
    data: applications,
    isLoading: loadingApplications,
    execute: loadApplications,
  } = useApi<ScholarshipApplication[]>();

  const { isLoading: submitting, execute: submitApplication } = useApi<ScholarshipApplication>();

  useEffect(() => {
    loadScholarships(() => studentService.getScholarships(), {
      errorMessage: "Failed to load scholarships",
    });
    loadApplications(() => studentService.getScholarshipApplications(), {
      errorMessage: "Failed to load applications",
    });
  }, [loadApplications, loadScholarships]);

  const handleApply = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setApplicationForm({ scholarshipId: scholarship.id, reason: "", documents: [] });
    setShowApplicationDialog(true);
  };

  const submit = async () => {
    if (!applicationForm.scholarshipId || !applicationForm.reason) return;

    await submitApplication(async () => {
      await studentService.applyForScholarship(applicationForm);
      const refreshed = await studentService.getScholarshipApplications();
      await loadApplications(() => Promise.resolve(refreshed));
      return refreshed[0] || null;
    }, {
      successMessage: "Application submitted",
      errorMessage: "Could not submit application",
    });

    setShowApplicationDialog(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Scholarships</h1>
          <p className="text-muted-foreground">Browse and apply for available scholarships</p>
        </div>

        {/* My Applications */}
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>Track your scholarship applications</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingApplications && <p className="text-sm text-muted-foreground">Loading applications...</p>}
            {!loadingApplications && (!applications || applications.length === 0) && (
              <p className="text-sm text-muted-foreground">No scholarship applications yet.</p>
            )}
            <div className="space-y-3">
              {applications?.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{app.scholarshipName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Applied: {new Date(app.submittedAt).toLocaleDateString()}
                    </p>
                    {app.awardedAmount && (
                      <p className="text-sm font-medium mt-1">₦{app.awardedAmount.toLocaleString()}</p>
                    )}
                  </div>
                  <Badge
                    variant={
                      app.status === "approved"
                        ? "success"
                        : app.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Scholarships */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Scholarships</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {loadingScholarships && <p className="text-sm text-muted-foreground">Loading scholarships...</p>}

            {!loadingScholarships && scholarships?.map((scholarship) => {
              const hasApplied = applications?.some(
                (app) => app.scholarshipId === scholarship.id
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
                    </div>

                    <div className="border-t pt-3">
                      <p className="text-sm font-medium mb-1">Eligibility Criteria</p>
                      <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                        {scholarship.eligibilityCriteria.map((criteria: string, idx: number) => (
                          <li key={idx}>{criteria}</li>
                        ))}
                      </ul>
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
                <Label>Personal Statement</Label>
                <Textarea
                  placeholder="Explain why you should be awarded this scholarship..."
                  rows={5}
                  value={applicationForm.reason}
                  onChange={(e) =>
                    setApplicationForm((prev) => ({ ...prev, reason: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Supporting Documents</Label>
                <Input type="file" multiple disabled />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload via portal once enabled. Currently optional.
                </p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={submit} disabled={submitting || !applicationForm.reason}>
                  {submitting ? "Submitting..." : "Submit Application"}
                </Button>
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
