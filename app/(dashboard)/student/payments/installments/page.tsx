"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle, Calendar, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function InstallmentsPage() {
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const { toast } = useToast();

  const currentPlan = {
    totalAmount: 150000,
    paidAmount: 100000,
    remainingAmount: 50000,
    installments: [
      {
        id: 1,
        amount: 50000,
        dueDate: "2025-11-15",
        status: "paid",
        paidDate: "2025-11-12",
      },
      {
        id: 2,
        amount: 50000,
        dueDate: "2025-12-15",
        status: "paid",
        paidDate: "2025-12-10",
      },
      {
        id: 3,
        amount: 50000,
        dueDate: "2026-01-15",
        status: "pending",
        paidDate: null,
      },
    ],
  };

  const progressPercentage = (currentPlan.paidAmount / currentPlan.totalAmount) * 100;

  const handleApply = () => {
    toast({
      title: "Application Submitted",
      description: "Your installment plan application has been submitted for review.",
      variant: "success",
    });
    setShowApplyDialog(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Installment Payment Plan</h1>
          <p className="text-muted-foreground">Manage your payment installments</p>
        </div>

        {/* Plan Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Amount</CardDescription>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₦{currentPlan.totalAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Tuition Fees 2025/2026</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Amount Paid</CardDescription>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₦{currentPlan.paidAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {currentPlan.installments.filter((i) => i.status === "paid").length} of{" "}
                {currentPlan.installments.length} installments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Remaining</CardDescription>
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                ₦{currentPlan.remainingAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Next due: Jan 15, 2026</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Progress</CardTitle>
            <CardDescription>Track your installment payment progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Overall Progress</span>
                <span className="font-semibold">{progressPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                ₦{currentPlan.paidAmount.toLocaleString()} of ₦
                {currentPlan.totalAmount.toLocaleString()}
              </span>
              <span className="text-muted-foreground">
                {currentPlan.installments.filter((i) => i.status === "paid").length}/
                {currentPlan.installments.length} completed
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Installments Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Installment Schedule</CardTitle>
            <CardDescription>Your payment schedule breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentPlan.installments.map((installment, index) => (
                <div
                  key={installment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        installment.status === "paid"
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      {installment.status === "paid" ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <span className="font-bold text-muted-foreground">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">Installment {index + 1}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Due: {new Date(installment.dueDate).toLocaleDateString()}
                        </span>
                        {installment.paidDate && (
                          <span>
                            Paid: {new Date(installment.paidDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ₦{installment.amount.toLocaleString()}
                    </p>
                    <Badge
                      variant={
                        installment.status === "paid"
                          ? "default"
                          : installment.status === "overdue"
                          ? "destructive"
                          : "secondary"
                      }
                      className={
                        installment.status === "paid"
                          ? "bg-green-500"
                          : installment.status === "pending"
                          ? ""
                          : ""
                      }
                    >
                      {installment.status === "paid" ? (
                        <>
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Paid
                        </>
                      ) : installment.status === "overdue" ? (
                        <>
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Overdue
                        </>
                      ) : (
                        <>
                          <Clock className="mr-1 h-3 w-3" />
                          Pending
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Make Payment</CardTitle>
              <CardDescription>Pay your next installment</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                Pay Next Installment (₦50,000)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Modify or inquire about your plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => setShowApplyDialog(true)}>
                Apply for New Plan
              </Button>
              <Button variant="outline" className="w-full">
                Contact Bursary
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Plan Terms */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Installment payments must be made before the due date</p>
            <p>• A late payment fee of ₦5,000 applies for overdue installments</p>
            <p>• Minimum of 3 installments required for any payment plan</p>
            <p>• All installments must be completed before examination period</p>
            <p>• Contact the Bursary for payment difficulties or plan modifications</p>
          </CardContent>
        </Card>

        {/* Apply Dialog */}
        <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for Installment Plan</DialogTitle>
              <DialogDescription>
                Request a new installment payment plan
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Payment Type</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>Tuition Fees</option>
                  <option>Hostel Fees</option>
                  <option>Other Fees</option>
                </select>
              </div>
              <div>
                <Label>Total Amount</Label>
                <Input type="number" placeholder="150000" />
              </div>
              <div>
                <Label>Number of Installments</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>3 Installments</option>
                  <option>4 Installments</option>
                  <option>5 Installments</option>
                </select>
              </div>
              <div>
                <Label>Reason for Installment Plan</Label>
                <Input placeholder="Brief explanation..." />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowApplyDialog(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleApply}>
                  Submit Application
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
