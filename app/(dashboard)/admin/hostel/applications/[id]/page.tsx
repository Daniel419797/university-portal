"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { User, Home, Calendar, FileText, CheckCircle, XCircle } from "lucide-react";

export default function HostelApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const applicationId = params?.id;

  const [showAllocateDialog, setShowAllocateDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const application = {
    id: applicationId,
    studentName: "Jane Smith",
    matricNumber: "STU/2023/002",
    email: "jane.smith@university.edu",
    phone: "+234 123 456 7890",
    department: "Computer Science",
    level: "400",
    roomType: "shared",
    status: "approved",
    appliedAt: "2025-12-30",
    allocatedRoom: "Unity Hall - Block A - Room 205",
    preferences: "Ground floor preferred due to mobility issues",
    emergencyContact: {
      name: "Mr. John Smith",
      relationship: "Father",
      phone: "+234 123 456 7899",
    },
  };

  const availableRooms = [
    { id: "1", name: "Unity Hall - Block A - Room 104", type: "Double", available: 2 },
    { id: "2", name: "Unity Hall - Block B - Room 203", type: "Shared", available: 4 },
    { id: "3", name: "Peace Hall - Block A - Room 105", type: "Single", available: 1 },
  ];

  const handleAllocate = () => {
    if (!selectedRoom) {
      toast({
        title: "Room Not Selected",
        description: "Please select a room to allocate.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Room Allocated",
      description: `${application.studentName} has been allocated to ${selectedRoom}.`,
    });
    setShowAllocateDialog(false);
    setTimeout(() => router.push("/admin/hostel"), 1500);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Application Rejected",
      description: "The hostel application has been rejected.",
      variant: "destructive",
    });
    setShowRejectDialog(false);
    setTimeout(() => router.push("/admin/hostel"), 1500);
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

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Hostel Application Details</h1>
            <p className="text-muted-foreground">Application ID: {applicationId}</p>
          </div>
          {getStatusBadge(application.status)}
        </div>

        {/* Student Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Applicant Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Full Name:</span>
                <span className="font-medium">{application.studentName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Matric Number:</span>
                <span className="font-medium font-mono">{application.matricNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{application.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{application.phone}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Department:</span>
                <span className="font-medium">{application.department}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Level:</span>
                <span className="font-medium">Level {application.level}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Applied Date:</span>
                <span className="font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(application.appliedAt).toLocaleDateString()}
                  </div>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Application Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Room Type Requested:</span>
              <Badge variant="outline" className="capitalize">
                {application.roomType}
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Application Status:</span>
              {getStatusBadge(application.status)}
            </div>
            {application.allocatedRoom && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Allocated Room:</span>
                <span className="font-medium">{application.allocatedRoom}</span>
              </div>
            )}
            {application.preferences && (
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Student Preferences:</p>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                  {application.preferences}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium">{application.emergencyContact.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Relationship:</span>
              <span className="font-medium">{application.emergencyContact.relationship}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-medium">{application.emergencyContact.phone}</span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        {application.status === "pending" && (
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Process this hostel application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  onClick={() => setShowAllocateDialog(true)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Allocate Room
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => setShowRejectDialog(true)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Application
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Button variant="outline" onClick={() => router.back()}>
          Back to Applications
        </Button>

        {/* Allocate Room Dialog */}
        <Dialog open={showAllocateDialog} onOpenChange={setShowAllocateDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Allocate Room</DialogTitle>
              <DialogDescription>
                Select a room to allocate to {application.studentName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Available Rooms</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                >
                  <option value="">Select a room...</option>
                  {availableRooms.map((room) => (
                    <option key={room.id} value={room.name}>
                      {room.name} ({room.type} - {room.available} available)
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAllocate} className="flex-1">
                  Confirm Allocation
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAllocateDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reject Application Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Application</DialogTitle>
              <DialogDescription>
                Provide a reason for rejecting this application
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Rejection Reason</Label>
                <Textarea
                  placeholder="Enter reason for rejection..."
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
                  onClick={() => setShowRejectDialog(false)}
                  className="flex-1"
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
