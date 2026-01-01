"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GraduationCap, Users, DollarSign, TrendingUp, CheckCircle } from "lucide-react";

export default function BursaryScholarshipsPage() {
  const stats = [
    {
      title: "Active Scholarships",
      value: "12",
      icon: GraduationCap,
    },
    {
      title: "Total Recipients",
      value: "245",
      icon: Users,
    },
    {
      title: "Total Disbursed",
      value: "₦18.5M",
      icon: DollarSign,
    },
    {
      title: "Pending Applications",
      value: "78",
      icon: TrendingUp,
    },
  ];

  const scholarships = [
    {
      id: "1",
      name: "Merit Scholarship",
      amount: 100000,
      recipients: 50,
      budget: 5000000,
      disbursed: 5000000,
      status: "active",
    },
    {
      id: "2",
      name: "Need-Based Scholarship",
      amount: 75000,
      recipients: 100,
      budget: 7500000,
      disbursed: 7500000,
      status: "active",
    },
    {
      id: "3",
      name: "Sports Excellence Award",
      amount: 50000,
      recipients: 20,
      budget: 1000000,
      disbursed: 1000000,
      status: "active",
    },
  ];

  const applications = [
    {
      id: "1",
      studentName: "John Doe",
      matricNumber: "STU/2023/001",
      scholarshipName: "Merit Scholarship",
      amount: 100000,
      cgpa: 4.85,
      status: "pending",
      appliedAt: "2026-01-05",
    },
    {
      id: "2",
      studentName: "Jane Smith",
      matricNumber: "STU/2023/002",
      scholarshipName: "Need-Based Scholarship",
      amount: 75000,
      cgpa: 4.2,
      status: "approved",
      appliedAt: "2026-01-03",
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
              {scholarships.map((scholarship) => (
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
                        variant={scholarship.status === "active" ? "default" : "secondary"}
                      >
                        {scholarship.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Recipients</p>
                        <p className="font-medium">{scholarship.recipients} students</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">
                          ₦{(scholarship.budget / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Disbursed</p>
                        <p className="font-medium">
                          ₦{(scholarship.disbursed / 1000000).toFixed(1)}M
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Utilization</span>
                        <span className="font-medium">
                          {((scholarship.disbursed / scholarship.budget) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${(scholarship.disbursed / scholarship.budget) * 100}%`,
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
                  <TableHead>CGPA</TableHead>
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
                    <TableCell>{app.scholarshipName}</TableCell>
                    <TableCell className="font-semibold">
                      ₦{app.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">{app.cgpa}</Badge>
                    </TableCell>
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
