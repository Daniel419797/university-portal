"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PaymentReceiptsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const receipts = [
    {
      id: "RCP001",
      paymentType: "Tuition Fees",
      amount: 150000,
      date: "2025-12-15",
      session: "2025/2026",
      status: "verified",
      receiptNumber: "UNIP/2025/TF/001234",
    },
    {
      id: "RCP002",
      paymentType: "Hostel Fees",
      amount: 45000,
      date: "2025-11-20",
      session: "2025/2026",
      status: "verified",
      receiptNumber: "UNIP/2025/HF/005678",
    },
    {
      id: "RCP003",
      paymentType: "Library Fees",
      amount: 3000,
      date: "2025-11-10",
      session: "2025/2026",
      status: "verified",
      receiptNumber: "UNIP/2025/LF/009012",
    },
    {
      id: "RCP004",
      paymentType: "Medical Fees",
      amount: 2500,
      date: "2025-10-25",
      session: "2025/2026",
      status: "verified",
      receiptNumber: "UNIP/2025/MF/003456",
    },
    {
      id: "RCP005",
      paymentType: "Examination Fees",
      amount: 5000,
      date: "2025-10-15",
      session: "2024/2025",
      status: "verified",
      receiptNumber: "UNIP/2024/EF/007890",
    },
  ];

  const filteredReceipts = receipts.filter(
    (receipt) =>
      receipt.paymentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPaid = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Payment Receipts</h1>
            <p className="text-muted-foreground">View and download all your payment receipts</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download All (PDF)
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Paid</CardDescription>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{totalPaid.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Receipts</CardDescription>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{receipts.length}</div>
              <p className="text-xs text-muted-foreground">Verified payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Current Session</CardDescription>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2025/2026</div>
              <p className="text-xs text-muted-foreground">Active academic year</p>
            </CardContent>
          </Card>
        </div>

        {/* Receipts List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Receipts</CardTitle>
                <CardDescription>Complete history of your payments</CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search receipts..."
                  className="pl-10"
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
                  <TableHead>Receipt Number</TableHead>
                  <TableHead>Payment Type</TableHead>
                  <TableHead>Session</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReceipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-mono text-sm">
                      {receipt.receiptNumber}
                    </TableCell>
                    <TableCell className="font-medium">{receipt.paymentType}</TableCell>
                    <TableCell>{receipt.session}</TableCell>
                    <TableCell className="font-semibold">
                      ₦{receipt.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(receipt.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {receipt.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/student/payments/${receipt.id}/receipt`}>
                            <FileText className="mr-1 h-3 w-3" />
                            View
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/student/payments/${receipt.id}/receipt?download=true`}>
                            <Download className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle>Receipt Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              • All receipts are automatically verified by the Bursary department
            </p>
            <p className="text-muted-foreground">
              • Keep your receipts for clearance and verification purposes
            </p>
            <p className="text-muted-foreground">
              • Contact the Bursary for any discrepancies or missing receipts
            </p>
            <Button variant="outline" className="mt-4">
              Contact Bursary
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
