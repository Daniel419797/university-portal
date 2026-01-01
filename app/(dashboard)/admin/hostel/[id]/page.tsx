"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Home, Users, Bed, Edit, Save, X } from "lucide-react";

export default function HostelBlockManagementPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const hostelId = params?.id;

  const [isEditing, setIsEditing] = useState(false);

  const hostelBlock = {
    id: hostelId,
    hostelName: "Unity Hall",
    blockName: "Block A",
    totalRooms: 50,
    occupiedRooms: 45,
    capacity: 100,
    occupied: 92,
    warden: "Dr. James Wilson",
    wardenPhone: "+234 801 234 5678",
    wardenEmail: "james.wilson@university.edu",
    floors: 5,
    roomsPerFloor: 10,
    facilities: ["24/7 Electricity", "Water Supply", "Wi-Fi", "Security", "Laundry"],
  };

  const rooms = [
    { number: "101", type: "Single", capacity: 1, occupied: 1, status: "occupied" },
    { number: "102", type: "Double", capacity: 2, occupied: 2, status: "occupied" },
    { number: "103", type: "Shared", capacity: 4, occupied: 4, status: "occupied" },
    { number: "104", type: "Double", capacity: 2, occupied: 0, status: "vacant" },
    { number: "105", type: "Single", capacity: 1, occupied: 1, status: "occupied" },
    { number: "106", type: "Double", capacity: 2, occupied: 2, status: "occupied" },
    { number: "107", type: "Shared", capacity: 4, occupied: 3, status: "partial" },
    { number: "108", type: "Double", capacity: 2, occupied: 0, status: "maintenance" },
  ];

  const residents = [
    {
      id: "1",
      name: "John Doe",
      matricNumber: "STU/2023/001",
      room: "101",
      checkIn: "2025-09-01",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      matricNumber: "STU/2023/002",
      room: "102",
      checkIn: "2025-09-01",
      status: "active",
    },
    {
      id: "3",
      name: "Michael Johnson",
      matricNumber: "STU/2023/005",
      room: "102",
      checkIn: "2025-09-01",
      status: "active",
    },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Changes Saved",
      description: "Hostel block information has been updated.",
    });
  };

  const getRoomStatusBadge = (status: string) => {
    switch (status) {
      case "occupied":
        return <Badge className="bg-green-500">Occupied</Badge>;
      case "vacant":
        return <Badge className="bg-blue-500">Vacant</Badge>;
      case "partial":
        return <Badge variant="secondary">Partial</Badge>;
      case "maintenance":
        return <Badge variant="destructive">Maintenance</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {hostelBlock.hostelName} - {hostelBlock.blockName}
            </h1>
            <p className="text-muted-foreground">Hostel block management</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Rooms</CardDescription>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hostelBlock.totalRooms}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Occupied Rooms</CardDescription>
              <Bed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hostelBlock.occupiedRooms}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Residents</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hostelBlock.occupied}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Occupancy Rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((hostelBlock.occupied / hostelBlock.capacity) * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Block Information */}
        <Card>
          <CardHeader>
            <CardTitle>Block Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Hostel Name</Label>
                <Input value={hostelBlock.hostelName} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label>Block Name</Label>
                <Input value={hostelBlock.blockName} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label>Total Capacity</Label>
                <Input value={hostelBlock.capacity} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label>Floors</Label>
                <Input value={hostelBlock.floors} disabled={!isEditing} />
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Warden Information</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={hostelBlock.warden} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={hostelBlock.wardenPhone} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={hostelBlock.wardenEmail} disabled={!isEditing} />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Facilities</h4>
              <div className="flex flex-wrap gap-2">
                {hostelBlock.facilities.map((facility, index) => (
                  <Badge key={index} variant="outline">
                    {facility}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rooms Table */}
        <Card>
          <CardHeader>
            <CardTitle>Rooms</CardTitle>
            <CardDescription>Room allocation and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Occupied</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.number}>
                    <TableCell className="font-mono font-semibold">{room.number}</TableCell>
                    <TableCell>{room.type}</TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell>{room.occupied}</TableCell>
                    <TableCell>{getRoomStatusBadge(room.status)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/hostel/${params.id}/rooms/${room.number}`}>
                          Manage
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Current Residents */}
        <Card>
          <CardHeader>
            <CardTitle>Current Residents</CardTitle>
            <CardDescription>Students residing in this block</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Matric Number</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check-In Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {residents.map((resident) => (
                  <TableRow key={resident.id}>
                    <TableCell className="font-medium">{resident.name}</TableCell>
                    <TableCell className="font-mono">{resident.matricNumber}</TableCell>
                    <TableCell className="font-mono">{resident.room}</TableCell>
                    <TableCell>{new Date(resident.checkIn).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={resident.status === "active" ? "default" : "secondary"}>
                        {resident.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Button variant="outline" onClick={() => router.back()}>
          Back to Hostel Management
        </Button>
      </div>
    </DashboardLayout>
  );
}
