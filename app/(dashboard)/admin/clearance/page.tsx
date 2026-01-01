"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, FileCheck, Search } from "lucide-react";

export default function AdminClearancePage() {
  const pendingClearances = [
    {
      id: "1",
      studentName: "John Doe",
      matricNumber: "STU/2023/001",
      department: "Computer Science",
      level: "400",
      session: "2025/2026",
      progress: 3,
      total: 5,
      status: "partial",
    },
    {
      id: "2",
      studentName: "Jane Smith",
      matricNumber: "STU/2023/002",
      department: "Computer Science",
      level: "400",
      session: "2025/2026",
      progress: 5,
      total: 5,
      status: "completed",
    },
  ];

  const clearanceDepartments = [
    { name: "Library", pending: 45, approved: 320, rejected: 5 },
    { name: "Bursary", pending: 32, approved: 310, rejected: 8 },
    { name: "Department", pending: 28, approved: 325, rejected: 2 },
    { name: "Hostel", pending: 15, approved: 180, rejected: 3 },
    { name: "Student Affairs", pending: 52, approved: 298, rejected: 10 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Clearance Management</h1>
          <p className="text-muted-foreground">Manage student clearances across departments</p>
        </div>

        {/* Department Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {clearanceDepartments.map((dept) => (
            <Card key={dept.name}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{dept.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-medium text-yellow-600">{dept.pending}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Approved</span>
                  <span className="font-medium text-green-600">{dept.approved}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Rejected</span>
                  <span className="font-medium text-red-600">{dept.rejected}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Student Clearance Status</CardTitle>
                    <CardDescription>Track clearance progress for all students</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search students..." className="pl-10 w-64" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Matric Number</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Session</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingClearances.map((clearance) => (
                      <TableRow key={clearance.id}>
                        <TableCell className="font-medium">{clearance.studentName}</TableCell>
                        <TableCell className="font-mono">{clearance.matricNumber}</TableCell>
                        <TableCell>{clearance.department}</TableCell>
                        <TableCell>
                          <Badge variant="outline">Level {clearance.level}</Badge>
                        </TableCell>
                        <TableCell>{clearance.session}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-secondary rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{
                                  width: `${(clearance.progress / clearance.total) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {clearance.progress}/{clearance.total}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              clearance.status === "completed"
                                ? "default"
                                : clearance.status === "partial"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {clearance.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/clearance/${clearance.id}`}>View Details</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Pending clearances list
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Completed clearances list
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Button variant="outline" className="justify-start">
            <FileCheck className="mr-2 h-4 w-4" />
            Bulk Approve
          </Button>
          <Button variant="outline" className="justify-start">
            <CheckCircle className="mr-2 h-4 w-4" />
            Generate Clearance Letters
          </Button>
          <Button variant="outline" className="justify-start">
            <XCircle className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
