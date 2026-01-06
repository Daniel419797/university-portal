"use client";

import { useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Mail, Phone, BookOpen } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { hodService } from "@/lib/services/hodBursaryService";

export default function HODStaffPage() {
  const { data: staffMembers, isLoading, execute } = useApi<Array<{ id: string; name: string; email: string; specialization: string; coursesAssigned: number; phone?: string; studentsSupervised?: number; status?: string }>>();

  useEffect(() => {
    execute(() => hodService.getStaff(), {
      errorMessage: "Failed to load staff members"
    });
  }, [execute]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading staff members...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const stats = [
    { title: "Total Faculty", value: staffMembers?.length.toString() || "0", icon: Users },
    { title: "Active Courses", value: staffMembers?.reduce((sum, s) => sum + s.coursesAssigned, 0).toString() || "0", icon: BookOpen },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Department Staff</h1>
            <p className="text-muted-foreground">Manage faculty members and lecturers</p>
          </div>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Add Staff Member
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

        {/* Staff Table */}
        <Card>
          <CardHeader>
            <CardTitle>Faculty Members</CardTitle>
            <CardDescription>All staff members in the department</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(staffMembers || []).map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell className="font-medium">{staff.name}</TableCell>
                    <TableCell>N/A</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {staff.specialization}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        {staff.coursesAssigned}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {staff.studentsSupervised || 0}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {staff.email}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {staff.phone || 'N/A'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={(staff.status || 'active') === "active" ? "default" : "secondary"}
                      >
                        {staff.status || 'active'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/hod/staff/${staff.id}`}>View Profile</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Workload Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Workload Distribution</CardTitle>
            <CardDescription>Course and student distribution among faculty</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(staffMembers || []).map((staff) => (
                <div key={staff.id}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{staff.name}</span>
                    <span className="text-muted-foreground">
                      {staff.coursesAssigned} courses • {staff.studentsSupervised || 0} students
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${((staff.studentsSupervised || 0) / 60) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
