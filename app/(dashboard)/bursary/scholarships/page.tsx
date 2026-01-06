"use client";

import { useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GraduationCap, Users, DollarSign, TrendingUp, CheckCircle } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { bursaryService } from "@/lib/services/hodBursaryService";
import { Scholarship } from "@/lib/types";

export default function BursaryScholarshipsPage() {
  const { data: applications, isLoading: applicationsLoading, execute: executeApplications } = useApi<Array<{ id: string; studentId: string; studentName: string; scholarshipName: string; amountRequested: number; status: string; appliedAt: string }>>();
  const { data: programs, isLoading: programsLoading, execute: executePrograms } = useApi<Scholarship[]>();

  useEffect(() => {
    executeApplications(() => bursaryService.getScholarships(), {
      errorMessage: "Failed to load scholarship applications"
    });
    executePrograms(() => bursaryService.getScholarshipPrograms(), {
      errorMessage: "Failed to load scholarship programs"
    });
  }, [executeApplications, executePrograms]);

  if (applicationsLoading || programsLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading scholarships...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const pendingCount = applications?.filter((a) => a.status === "pending").length || 0;
  const approvedCount = applications?.filter((a) => a.status === "approved").length || 0;
  
  const stats = [
    {
      title: "Total Applications",
      value: applications?.length.toString() || "0",
      icon: GraduationCap,
    },
    {
      title: "Pending Review",
      value: pendingCount.toString(),
      icon: TrendingUp,
    },
    {
      title: "Approved",
      value: approvedCount.toString(),
      icon: CheckCircle,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Scholarship Management</h1>
          <p className="text-muted-foreground">Manage scholarships and applications</p>
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

        {/* Scholarships Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Scholarship Programs</CardTitle>
            <CardDescription>Active scholarship programs and budgets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {programs?.map((scholarship) => (
                <Card key={scholarship.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{scholarship.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ₦{scholarship.amount.toLocaleString()} per recipient
                        </p>
                      </div>
                      <Badge
                        variant={scholarship.status === "open" ? "default" : "secondary"}
                      >
                        {scholarship.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Recipients</p>
                        <p className="font-medium">{scholarship.recipients || 0} students</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">
                          ₦{((scholarship.budget || 0) / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Disbursed</p>
                        <p className="font-medium">
                          ₦{((scholarship.disbursed || 0) / 1000000).toFixed(1)}M
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Utilization</span>
                        <span className="font-medium">
                          {scholarship.budget ? ((scholarship.disbursed || 0) / scholarship.budget * 100).toFixed(0) : 0}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${scholarship.budget ? ((scholarship.disbursed || 0) / scholarship.budget) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Scholarship applications requiring review</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Matric Number</TableHead>
                  <TableHead>Scholarship</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications?.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.studentName}</TableCell>
                    <TableCell className="font-mono">{app.studentId}</TableCell>
                    <TableCell>{app.scholarshipName}</TableCell>
                    <TableCell className="font-semibold">
                      ₦{app.amountRequested.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{app.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {app.status === "pending" ? (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/bursary/scholarships/${app.id}`}>
                              Review
                            </Link>
                          </Button>
                          <Button size="sm" className="bg-green-500 hover:bg-green-600" asChild>
                            <Link href={`/bursary/scholarships/${app.id}`}>
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Approve
                            </Link>
                          </Button>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/bursary/scholarships/${app.id}`}>
                            View
                          </Link>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
