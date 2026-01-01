"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Download, Receipt, User, Calendar, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PaymentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const paymentId = params?.id;

  const payment = {
    id: paymentId,
    studentName: "John Doe",
    matricNumber: "STU/2023/001",
    email: "john.doe@university.edu",
    phone: "+234 123 456 7890",
    department: "Computer Science",
    level: "400",
    amount: 150000,
    type: "Tuition",
    reference: "PAY/2026/001234",
    bankReference: "FLW-123456789",
    paymentMethod: "Bank Transfer",
    bank: "First Bank Nigeria",
    date: "2026-01-01T10:30:00",
    status: "pending",
    proofOfPayment: "receipt_001234.pdf",
    session: "2025/2026",
    semester: "First Semester",
  };

  const handleVerify = () => {
    toast({
      title: "Payment Verified",
      description: `Payment ${payment.reference} has been verified successfully.`,
    });
    setTimeout(() => router.push("/bursary/payments"), 1500);
  };

  const handleReject = () => {
    toast({
      title: "Payment Rejected",
      description: `Payment ${payment.reference} has been rejected.`,
      variant: "destructive",
    });
    setTimeout(() => router.push("/bursary/payments"), 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500">Verified</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending Verification</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Payment Details</h1>
            <p className="text-muted-foreground">Reference: {payment.reference}</p>
          </div>
          {getStatusBadge(payment.status)}
        </div>

        {/* Student Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Full Name:</span>
                <span className="font-medium">{payment.studentName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Matric Number:</span>
                <span className="font-medium font-mono">{payment.matricNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{payment.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{payment.phone}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Department:</span>
                <span className="font-medium">{payment.department}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Level:</span>
                <span className="font-medium">Level {payment.level}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Session:</span>
                <span className="font-medium">{payment.session}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Semester:</span>
                <span className="font-medium">{payment.semester}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment Type:</span>
                  <span className="font-medium">{payment.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-bold text-lg">₦{payment.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-medium">{payment.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bank:</span>
                  <span className="font-medium">{payment.bank}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reference:</span>
                  <span className="font-medium font-mono">{payment.reference}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bank Reference:</span>
                  <span className="font-medium font-mono">{payment.bankReference}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(payment.date).toLocaleString()}
                    </div>
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  {getStatusBadge(payment.status)}
                </div>
              </div>
            </div>

            {/* Proof of Payment */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Proof of Payment</p>
                  <p className="text-xs text-muted-foreground">{payment.proofOfPayment}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Receipt
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        {payment.status === "pending" && (
          <Card>
            <CardHeader>
              <CardTitle>Verification Actions</CardTitle>
              <CardDescription>Review and verify this payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  onClick={handleVerify}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Verify Payment
                </Button>
                <Button variant="destructive" className="flex-1" onClick={handleReject}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Back to Payments
          </Button>
          <Button variant="outline">
            <Receipt className="mr-2 h-4 w-4" />
            View Student Payment History
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
