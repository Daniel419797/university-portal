"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Home, Users, Bed, DollarSign, Wrench } from "lucide-react";

interface HostelApplication {
  id: string;
  session: string;
  roomType: "single" | "double" | "shared";
  status: "pending" | "approved" | "rejected" | "allocated";
  appliedAt: string;
  allocatedRoom?: {
    hostelName: string;
    blockName: string;
    roomNumber: string;
    bedNumber: string;
  };
}

export default function StudentHostelPage() {
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);

  const currentApplication: HostelApplication | null = {
    id: "1",
    session: "2025/2026",
    roomType: "double",
    status: "allocated",
    appliedAt: "2025-08-15",
    allocatedRoom: {
      hostelName: "Unity Hall",
      blockName: "Block A",
      roomNumber: "A205",
      bedNumber: "Bed 2",
    },
  };

  const roommates = [
    {
      id: "1",
      name: "Michael Johnson",
      matricNumber: "STU/2023/005",
      department: "Computer Science",
      level: "400",
      phone: "+234 801 234 5678",
    },
  ];

  const maintenanceRequests = [
    {
      id: "1",
      issue: "Broken Window",
      description: "Window frame is damaged",
      priority: "high",
      status: "in_progress",
      reportedAt: "2025-12-20",
    },
    {
      id: "2",
      issue: "Faulty Light",
      description: "Ceiling light not working",
      priority: "medium",
      status: "resolved",
      reportedAt: "2025-12-10",
      resolvedAt: "2025-12-12",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "allocated":
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Hostel & Accommodation</h1>
          <p className="text-muted-foreground">Manage your hostel application and room</p>
        </div>

        {/* Current Application Status */}
        {currentApplication && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Current Accommodation
              </CardTitle>
              <CardDescription>Your hostel allocation for {currentApplication.session}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status:</span>
                <Badge variant={getStatusColor(currentApplication.status)}>
                  {currentApplication.status}
                </Badge>
              </div>

              {currentApplication.allocatedRoom && (
                <div className="grid gap-3 md:grid-cols-2 border rounded-lg p-4 bg-muted/50">
                  <div>
                    <span className="text-sm text-muted-foreground">Hostel</span>
                    <p className="font-medium">{currentApplication.allocatedRoom.hostelName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Block</span>
                    <p className="font-medium">{currentApplication.allocatedRoom.blockName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Room Number</span>
                    <p className="font-medium">{currentApplication.allocatedRoom.roomNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Bed Number</span>
                    <p className="font-medium">{currentApplication.allocatedRoom.bedNumber}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Roommates */}
        {currentApplication?.status === "allocated" && roommates.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Roommates
              </CardTitle>
              <CardDescription>Your room companions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roommates.map((roommate) => (
                  <div key={roommate.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{roommate.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {roommate.matricNumber} • {roommate.department} • Level {roommate.level}
                      </p>
                      {roommate.phone && (
                        <p className="text-sm text-muted-foreground">{roommate.phone}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Maintenance Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Maintenance Requests
                </CardTitle>
                <CardDescription>Report and track maintenance issues</CardDescription>
              </div>
              <Button onClick={() => setShowMaintenanceDialog(true)}>
                Report Issue
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {maintenanceRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{request.issue}</h3>
                      <p className="text-sm text-muted-foreground">{request.description}</p>
                    </div>
                    <Badge variant={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Reported: {new Date(request.reportedAt).toLocaleDateString()}</span>
                    <Badge variant="outline">{request.status}</Badge>
                    {request.resolvedAt && (
                      <span>Resolved: {new Date(request.resolvedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Hostel Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Make Payment</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                Hostel Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Rules & Guidelines
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Dialog */}
        <Dialog open={showMaintenanceDialog} onOpenChange={setShowMaintenanceDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report Maintenance Issue</DialogTitle>
              <DialogDescription>
                Describe the issue you want to report
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Issue Type</Label>
                <Select>
                  <option value="">Select issue type</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="furniture">Furniture</option>
                  <option value="structural">Structural</option>
                  <option value="other">Other</option>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Describe the issue in detail..." rows={4} />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Submit</Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowMaintenanceDialog(false)}
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
