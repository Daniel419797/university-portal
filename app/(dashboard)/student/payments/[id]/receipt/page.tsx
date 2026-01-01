"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer, CheckCircle } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ReceiptPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const receiptId = params?.id;
  const shouldDownload = searchParams?.get("download") === "true";

  // Mock receipt data
  const receipt = {
    id: receiptId,
    receiptNumber: "UNIP/2025/TF/001234",
    studentName: "John Doe",
    matricNumber: "STU/2023/001",
    department: "Computer Science",
    level: "400",
    paymentType: "Tuition Fees",
    amount: 150000,
    processingFee: 100,
    total: 150100,
    date: "2025-12-15",
    session: "2025/2026",
    paymentMethod: "Debit Card",
    transactionId: "TXN123456789",
    status: "verified",
    verifiedBy: "Mrs. Sarah Johnson",
    verifiedDate: "2025-12-15",
  };

  useEffect(() => {
    if (shouldDownload) {
      window.print();
    }
  }, [shouldDownload]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between print:hidden">
          <div>
            <h1 className="text-3xl font-bold">Payment Receipt</h1>
            <p className="text-muted-foreground">Receipt #{receipt.receiptNumber}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button onClick={handlePrint}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Receipt Card */}
        <Card className="print:shadow-none print:border-0">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center border-b pb-6 mb-6">
              <h2 className="text-3xl font-bold">UNIVERSITY PORTAL</h2>
              <p className="text-lg text-muted-foreground">Official Payment Receipt</p>
              <p className="text-sm text-muted-foreground">
                123 University Road, Academic City, State
              </p>
              <p className="text-sm text-muted-foreground">
                Tel: +234 123 456 7890 | Email: bursary@university.edu
              </p>
            </div>

            {/* Receipt Info */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  RECEIPT DETAILS
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Receipt Number:</span>
                    <span className="font-mono font-medium">{receipt.receiptNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date Issued:</span>
                    <span className="font-medium">
                      {new Date(receipt.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Session:</span>
                    <span className="font-medium">{receipt.session}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction ID:</span>
                    <span className="font-mono text-xs">{receipt.transactionId}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  STUDENT INFORMATION
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{receipt.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Matric Number:</span>
                    <span className="font-mono font-medium">{receipt.matricNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="font-medium">{receipt.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level:</span>
                    <span className="font-medium">{receipt.level} Level</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="border-t border-b py-6 mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">
                PAYMENT DETAILS
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment Description:</span>
                  <span className="font-medium">{receipt.paymentType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-medium">{receipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">₦{receipt.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Processing Fee:</span>
                  <span className="font-medium">₦{receipt.processingFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total Amount Paid:</span>
                  <span>₦{receipt.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-200">
                    Payment Verified
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Verified by {receipt.verifiedBy} on{" "}
                    {new Date(receipt.verifiedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-2">
                This is an official receipt issued by the University Bursary Department
              </p>
              <p>For inquiries, contact: bursary@university.edu | +234 123 456 7890</p>
              <p className="mt-4 text-xs">
                Receipt generated on {new Date().toLocaleDateString()} at{" "}
                {new Date().toLocaleTimeString()}
              </p>
            </div>

            {/* Stamp Area */}
            <div className="mt-8 pt-8 border-t grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="border-t-2 border-gray-300 inline-block px-8 pt-2">
                  <p className="text-sm font-medium">Bursar&apos;s Signature</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t-2 border-gray-300 inline-block px-8 pt-2">
                  <p className="text-sm font-medium">Official Stamp</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions (Print Hidden) */}
        <Card className="print:hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Need help with this receipt? Contact the Bursary department
              </p>
              <Button variant="outline">Contact Support</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
