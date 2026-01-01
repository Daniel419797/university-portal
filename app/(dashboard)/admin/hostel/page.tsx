"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Users, Bed, Building2, Search, Plus } from "lucide-react";

interface HostelBlock {
  id: string;
  hostelName: string;
  blockName: string;
  totalRooms: number;
  occupiedRooms: number;
  capacity: number;
  occupied: number;
}

export default function AdminHostelPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const hostels: HostelBlock[] = [
    {
      id: "1",
      hostelName: "Unity Hall",
      blockName: "Block A",
      totalRooms: 50,
      occupiedRooms: 45,
      capacity: 100,
      occupied: 92,
    },
    {
      id: "2",
      hostelName: "Unity Hall",
      blockName: "Block B",
      totalRooms: 50,
      occupiedRooms: 48,
      capacity: 100,
      occupied: 96,
    },
    {
      id: "3",
      hostelName: "Peace Hall",
      blockName: "Block A",
      totalRooms: 40,
      occupiedRooms: 35,
      capacity: 80,
      occupied: 70,
    },
  ];

  const applications = [
    {
      id: "1",
      studentName: "John Doe",
      matricNumber: "STU/2023/001",
      roomType: "double",
      status: "pending",
      appliedAt: "2026-01-01",
    },
    {
      id: "2",
      studentName: "Jane Smith",
      matricNumber: "STU/2023/002",
      roomType: "shared",
      status: "approved",
      appliedAt: "2025-12-30",
      allocatedRoom: "Unity Hall - Block A - Room 205",
    },
  ];

  const stats = [
    { title: "Total Capacity", value: "1,200", icon: Bed },
    { title: "Occupied", value: "980", icon: Users },
    { title: "Available", value: "220", icon: Home },
    { title: "Occupancy Rate", value: "81.7%", icon: Building2 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Hostel Management</h1>
            <p className="text-muted-foreground">Manage hostels, rooms, and allocations</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Hostel
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription>{stat.title}</CardDescription>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="hostels">
          <TabsList>
            <TabsTrigger value="hostels">Hostels & Blocks</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="hostels" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hostel Blocks</CardTitle>
                <CardDescription>Overview of all hostel blocks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {hostels.map((hostel) => (
                    <Card key={hostel.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{hostel.hostelName}</CardTitle>
                        <CardDescription>{hostel.blockName}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Rooms</span>
                          <span className="font-medium">
                            {hostel.occupiedRooms}/{hostel.totalRooms}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Capacity</span>
                          <span className="font-medium">
                            {hostel.occupied}/{hostel.capacity}
                          </span>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Occupancy</span>
                            <span className="font-medium">
                              {((hostel.occupied / hostel.capacity) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(hostel.occupied / hostel.capacity) * 100}%` }}
                            />
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link href={`/admin/hostel/${hostel.id}`}>Manage</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Hostel Applications</CardTitle>
                    <CardDescription>Review and process applications</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      className="pl-10 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Matric Number</TableHead>
                      <TableHead>Room Type</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.studentName}</TableCell>
                        <TableCell className="font-mono">{app.matricNumber}</TableCell>
                        <TableCell className="capitalize">{app.roomType}</TableCell>
                        <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              app.status === "approved"
                                ? "default"
                                : app.status === "pending"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {app.status === "pending" && (
                              <>
                                <Button variant="outline" size="sm">
                                  Allocate
                                </Button>
                                <Button variant="outline" size="sm">
                                  Reject
                                </Button>
                              </>
                            )}
                            {app.status === "approved" && (
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/hostel/applications/${app.id}`}>View Details</Link>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Maintenance requests management interface
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
