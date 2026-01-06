"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, FileCheck, Library, DollarSign, Building2 } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { studentService, ClearanceStatus } from "@/lib/services";

export default function StudentClearancePage() {
  const { toast } = useToast();
  const [showDocumentDialog, setShowDocumentDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [requestPurpose, setRequestPurpose] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("email");

  const { data: clearanceStatus, isLoading, execute } = useApi<ClearanceStatus>();

  useEffect(() => {
    execute(() => studentService.getClearanceStatus(), {
      errorMessage: "Failed to load clearance status"
    });
  }, [execute]);

  const handleDocumentRequest = (documentType: string) => {
    setSelectedDocument(documentType);
    setShowDocumentDialog(true);
  };

  const handleSubmitRequest = () => {
    if (!requestPurpose.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide the purpose for this request.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request Submitted",
      description: `Your ${selectedDocument} request has been submitted successfully.`,
    });

    setShowDocumentDialog(false);
    setRequestPurpose("");
    setSelectedDocument("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getDepartmentIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "library":
        return <Library className="h-5 w-5" />;
      case "bursary":
        return <DollarSign className="h-5 w-5" />;
      case "department":
      case "student affairs":
        return <Building2 className="h-5 w-5" />;
      case "hostel":
        return <FileCheck className="h-5 w-5" />;
      default:
        return <FileCheck className="h-5 w-5" />;
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading clearance status...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!clearanceStatus) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Clearance status not available</p>
        </div>
      </DashboardLayout>
    );
  }

  const approvedCount = clearanceStatus.departments.filter(
    (d) => d.status === "approved"
  ).length;
  const totalCount = clearanceStatus.departments.length;
  const progressPercentage = (approvedCount / totalCount) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">School Clearance</h1>
          <p className="text-muted-foreground">
            Track your clearance status across all departments
          </p>
        </div>

        {/* Overall Status */}
        <Card>
          <CardHeader>
            <CardTitle>Clearance Status</CardTitle>
            <CardDescription>
              Current clearance status for graduation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Status</span>
              <Badge
                variant={
                  clearanceStatus.overallStatus === "completed"
                    ? "default"
                    : clearanceStatus.overallStatus === "partial"
                    ? "secondary"
                    : "outline"
                }
              >
                {clearanceStatus.overallStatus}
              </Badge>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span className="font-medium">
                  {approvedCount}/{totalCount} departments cleared
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Clearances */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Department Clearances</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {clearanceStatus.departments.map((dept, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getDepartmentIcon(dept.name)}
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                    </div>
                    {getStatusIcon(dept.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    {getStatusBadge(dept.status)}
                  </div>

                  {dept.approvedBy && (
                    <div>
                      <span className="text-sm text-muted-foreground">Approved by</span>
                      <p className="text-sm font-medium">{dept.approvedBy}</p>
                    </div>
                  )}

                  {dept.approvedAt && (
                    <div>
                      <span className="text-sm text-muted-foreground">Approved on</span>
                      <p className="text-sm font-medium">
                        {new Date(dept.approvedAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {dept.comment && (
                    <div className="border-t pt-3">
                      <span className="text-sm text-muted-foreground">Comment</span>
                      <p className="text-sm">{dept.comment}</p>
                    </div>
                  )}

                  {dept.status === "pending" && (
                    <Button variant="outline" className="w-full" size="sm">
                      Request Update
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Document Requests</CardTitle>
            <CardDescription>Request official documents and certificates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => handleDocumentRequest("Clearance Letter")}
              >
                <FileCheck className="mr-2 h-4 w-4" />
                Request Clearance Letter
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => handleDocumentRequest("ID Card")}
              >
                <FileCheck className="mr-2 h-4 w-4" />
                Request ID Card
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => handleDocumentRequest("Letter of Introduction")}
              >
                <FileCheck className="mr-2 h-4 w-4" />
                Letter of Introduction
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => handleDocumentRequest("Recommendation Letter")}
              >
                <FileCheck className="mr-2 h-4 w-4" />
                Recommendation Letter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Document Request Dialog */}
        <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request {selectedDocument}</DialogTitle>
              <DialogDescription>
                Provide details for your document request
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Purpose of Request *</Label>
                <Textarea
                  placeholder="Enter the purpose for this request..."
                  value={requestPurpose}
                  onChange={(e) => setRequestPurpose(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label>Delivery Method</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                >
                  <option value="email">Email (PDF)</option>
                  <option value="pickup">Physical Pickup</option>
                  <option value="post">Postal Service</option>
                </select>
              </div>

              <div>
                <Label>Urgency Level</Label>
                <select className="w-full p-2 border rounded-md">
                  <option value="normal">Normal (5-7 working days)</option>
                  <option value="urgent">Urgent (2-3 working days)</option>
                  <option value="express">Express (24 hours)</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmitRequest} className="flex-1">
                  Submit Request
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDocumentDialog(false)}
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
