"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, Trash2, UserPlus } from "lucide-react";

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@university.edu",
      matricNumber: "STU/2023/001",
      department: "Computer Science",
      level: "400",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@university.edu",
      matricNumber: "STU/2023/002",
      department: "Computer Science",
      level: "400",
      status: "active",
    },
  ];

  const lecturers = [
    {
      id: "1",
      name: "Dr. Michael Anderson",
      email: "anderson@university.edu",
      department: "Computer Science",
      status: "active",
    },
    {
      id: "2",
      name: "Prof. Sarah Thompson",
      email: "thompson@university.edu",
      department: "Computer Science",
      status: "active",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage students, lecturers, and administrators</p>
          </div>
          <Button asChild>
            <Link href="/admin/users/create">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Link>
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="students">
          <TabsList>
            <TabsTrigger value="students">Students ({students.length})</TabsTrigger>
            <TabsTrigger value="lecturers">Lecturers ({lecturers.length})</TabsTrigger>
            <TabsTrigger value="admins">Administrators</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Students</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/users/bulk-upload">Bulk Upload</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Matric Number</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-mono">{student.matricNumber}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>
                          <Badge variant="outline">Level {student.level}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={student.status === "active" ? "default" : "secondary"}
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/users/${student.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lecturers">
            <Card>
              <CardHeader>
                <CardTitle>Lecturers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lecturers.map((lecturer) => (
                      <TableRow key={lecturer.id}>
                        <TableCell className="font-medium">{lecturer.name}</TableCell>
                        <TableCell>{lecturer.email}</TableCell>
                        <TableCell>{lecturer.department}</TableCell>
                        <TableCell>
                          <Badge
                            variant={lecturer.status === "active" ? "default" : "secondary"}
                          >
                            {lecturer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/users/${lecturer.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admins">
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Administrator management interface
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
