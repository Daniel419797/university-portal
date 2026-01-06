"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, User, Bed, Wrench, 
  CheckCircle, XCircle, Edit, Save, Phone
} from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { adminService, RoomDetails } from "@/lib/services/adminService";

export default function RoomManagementPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [roomCapacity, setRoomCapacity] = useState("4");
  const [roomType, setRoomType] = useState("Shared");

  const hostelId = params.id as string;
  const roomNumber = params.roomNumber as string;

  const { data: roomData, isLoading, execute } = useApi<RoomDetails>();

  useEffect(() => {
    if (hostelId && roomNumber) {
      execute(() => adminService.getHostelRoom(hostelId, roomNumber), {
        errorMessage: "Failed to load room details"
      });
    }
  }, [execute, hostelId, roomNumber]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading room details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!roomData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Room not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const room = roomData;
  const occupants = roomData.occupants || [];
  const maintenanceRequests = roomData.maintenanceRequests || [];

  const availableBeds = [1, 2, 3, 4].filter(
    bedNum => !occupants.some(occ => occ.bedNumber === bedNum.toString())
  );

  const handleSave = () => {
    toast({
      title: "Room Updated",
      description: "Room details have been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleEvict = (studentId: string) => {
    toast({
      title: "Student Evicted",
      description: "Student has been removed from the room.",
    });
  };

  const handleMarkResolved = (requestId: string) => {
    toast({
      title: "Request Resolved",
      description: "Maintenance request has been marked as resolved.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "occupied":
        return <Badge className="bg-blue-500">Occupied</Badge>;
      case "available":
        return <Badge className="bg-green-500">Available</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-500">Maintenance</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-yellow-600">Pending</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="text-blue-600">In Progress</Badge>;
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="text-yellow-600">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
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
              <h1 className="text-3xl font-bold">Room {room.roomNumber} Management</h1>
              <p className="text-muted-foreground">{room.hostelName} - {room.blockName}</p>
            </div>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Room
            </Button>
          )}
        </div>

        {/* Room Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Bed className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold">{room.capacity}</p>
                <p className="text-sm text-muted-foreground">Bed Capacity</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <User className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-bold">{room.occupied}</p>
                <p className="text-sm text-muted-foreground">Occupied</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <p className="text-2xl font-bold">{availableBeds.length}</p>
                <p className="text-sm text-muted-foreground">Available Beds</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Wrench className="h-8 w-8 mx-auto mb-2 text-red-500" />
                <p className="text-2xl font-bold">
                  {maintenanceRequests.filter(r => r.status !== "resolved").length}
                </p>
                <p className="text-sm text-muted-foreground">Pending Issues</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Room Details */}
          <Card>
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <Label>Room Type</Label>
                    <select
                      className="w-full p-2 border rounded-md mt-1"
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                    >
                      <option value="Shared">Shared</option>
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                    </select>
                  </div>

                  <div>
                    <Label>Capacity</Label>
                    <Input
                      type="number"
                      value={roomCapacity}
                      onChange={(e) => setRoomCapacity(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Room Number</p>
                    <p className="font-bold text-lg">{room.roomNumber}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Floor</p>
                    <p className="font-medium">{room.floor}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{room.type}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-medium">{room.capacity} Beds</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    {getStatusBadge(room.status)}
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-bold text-lg">{room.price}</p>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium mb-2">Amenities</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {room.hasAC ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                        <span className="text-sm">Air Conditioning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {room.hasWardrobe ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                        <span className="text-sm">Wardrobe</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {room.hasBathroom ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                        <span className="text-sm">Private Bathroom</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Occupants & Maintenance */}
          <div className="md:col-span-2 space-y-6">
            {/* Current Occupants */}
            <Card>
              <CardHeader>
                <CardTitle>Current Occupants</CardTitle>
                <CardDescription>{room.occupied} of {room.capacity} beds occupied</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {occupants.map((occupant) => (
                    <div
                      key={occupant.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {occupant.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium">{occupant.name}</p>
                          <p className="text-sm text-muted-foreground font-mono">{occupant.matricNumber}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">{occupant.phone}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Bed {occupant.bedNumber}</p>
                          <p className="text-xs text-muted-foreground">
                            Since {new Date(occupant.checkInDate).toLocaleDateString()}
                          </p>
                        </div>
                        {getStatusBadge(occupant.status)}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleEvict(occupant.id)}
                        >
                          Evict
                        </Button>
                      </div>
                    </div>
                  ))}

                  {availableBeds.length > 0 && (
                    <div className="p-4 border-2 border-dashed rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">
                        Available Beds: {availableBeds.join(", ")}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Allocate Bed
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Maintenance Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Requests</CardTitle>
                <CardDescription>Room maintenance and repair requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {maintenanceRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 border rounded-lg space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                            <p className="font-medium">{request.issue}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{request.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <p className="text-xs text-muted-foreground">
                              Reported by {request.reportedBy} on{" "}
                              {new Date(request.reportedDate).toLocaleDateString()}
                            </p>
                          </div>
                          {request.resolvedDate && (
                            <p className="text-xs text-green-600 mt-1">
                              Resolved on {new Date(request.resolvedDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          {getPriorityBadge(request.priority)}
                          {getStatusBadge(request.status)}
                        </div>
                      </div>
                      {request.status !== "resolved" && (
                        <div className="flex gap-2 pt-2 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleMarkResolved(request.id)}
                          >
                            Mark Resolved
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Assign Technician
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
