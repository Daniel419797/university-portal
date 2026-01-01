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
import { Search, CheckCircle, XCircle, Eye, FileText } from "lucide-react";

export default function BursaryPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const payments = [
    {
      id: "1",
      studentName: "John Doe",
      matricNumber: "STU/2023/001",
      amount: 150000,
      type: "Tuition",
      reference: "PAY/2026/001234",
      date: "2026-01-01",
      status: "pending",
    },
    {
      id: "2",
      studentName: "Jane Smith",
      matricNumber: "STU/2023/002",
      amount: 150000,
      type: "Tuition",
      reference: "PAY/2026/001235",
      date: "2026-01-01",
      status: "verified",
    },
    {
      id: "3",
      studentName: "Michael Johnson",
      matricNumber: "STU/2023/005",
      amount: 50000,
      type: "Hostel",
      reference: "PAY/2026/001236",
      date: "2025-12-30",
      status: "verified",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500">Verified</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const pendingPayments = payments.filter((p) => p.status === "pending");
  const verifiedPayments = payments.filter((p) => p.status === "verified");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payment Management</h1>
          <p className="text-muted-foreground">Verify and manage student payments</p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by student name, matric number, or reference..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">
              Pending Verification ({pendingPayments.length})
            </TabsTrigger>
            <TabsTrigger value="verified">
              Verified ({verifiedPayments.length})
            </TabsTrigger>
            <TabsTrigger value="all">All Payments ({payments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Verification</CardTitle>
                <CardDescription>Payments awaiting verification</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Matric Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.studentName}</TableCell>
                        <TableCell className="font-mono">{payment.matricNumber}</TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell className="font-semibold">
                          ₦{payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {payment.reference}
                        </TableCell>
                        <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/bursary/payments/${payment.id}`}>
                                <Eye className="mr-1 h-3 w-3" />
                                View
                              </Link>
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Verify
                            </Button>
                            <Button variant="destructive" size="sm">
                              <XCircle className="mr-1 h-3 w-3" />
                              Reject
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

          <TabsContent value="verified">
            <Card>
              <CardHeader>
                <CardTitle>Verified Payments</CardTitle>
                <CardDescription>Successfully verified payments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Matric Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verifiedPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.studentName}</TableCell>
                        <TableCell className="font-mono">{payment.matricNumber}</TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell className="font-semibold">
                          ₦{payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {payment.reference}
                        </TableCell>
                        <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                All payments list
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Button variant="outline" className="justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" className="justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Export Payments
          </Button>
          <Button variant="outline" className="justify-start">
            <CheckCircle className="mr-2 h-4 w-4" />
            Bulk Verify
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
