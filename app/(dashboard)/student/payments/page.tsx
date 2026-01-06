"use client";

import { useEffect, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CheckCircle, Clock, AlertCircle, Download, Plus } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useApi } from "@/hooks/use-api";
import { studentService, type Payment } from "@/lib/services";

export default function StudentPaymentsPage() {
  const { data: payments, isLoading, execute } = useApi<Payment[]>();

  useEffect(() => {
    execute(() => studentService.getPayments(), {
      errorMessage: "Failed to load payments",
    });
  }, [execute]);

  const paymentList = useMemo(() => {
    if (Array.isArray(payments)) return payments;
    const nested = (payments as unknown as { payments?: Payment[] } | undefined)?.payments;
    return Array.isArray(nested) ? nested : [];
  }, [payments]);

  const totals = useMemo(() => {
    const list = paymentList;
    const verifiedTotal = list
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    const pendingTotal = list
      .filter((p) => p.status === "pending")
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    return { verifiedTotal, pendingTotal };
  }, [paymentList]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "success"> = {
      verified: "success",
      pending: "secondary",
      processing: "secondary",
      failed: "destructive",
    };
    return variants[status] || "default";
  };

  const getStatusIcon = (status: string) => {
    if (status === "verified") return <CheckCircle className="h-4 w-4" />;
    if (status === "failed") return <AlertCircle className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Payments</h1>
            <p className="text-muted-foreground">
              Manage your school fees and other payments
            </p>
          </div>
          <Button asChild>
            <Link href="/student/payments/make-payment">
              <Plus className="mr-2 h-4 w-4" />
              Make Payment
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totals.verifiedTotal)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {formatCurrency(totals.pendingTotal)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totals.pendingTotal === 0 ? (
                  <Badge variant="success" className="text-base">Up to Date</Badge>
                ) : (
                  <Badge variant="secondary" className="text-base">Pending</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Payment Options</CardTitle>
            <CardDescription>Select a payment type to proceed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <Button variant="outline" className="h-auto flex-col py-4" asChild>
                <Link href="/student/payments/make-payment?type=tuition">
                  <DollarSign className="h-8 w-8 mb-2" />
                  <span className="font-semibold">Tuition Fees</span>
                  <span className="text-xs text-muted-foreground">Pay school fees</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-4" asChild>
                <Link href="/student/payments/make-payment?type=hostel">
                  <DollarSign className="h-8 w-8 mb-2" />
                  <span className="font-semibold">Hostel Fees</span>
                  <span className="text-xs text-muted-foreground">Pay accommodation</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-4" asChild>
                <Link href="/student/payments/make-payment?type=exam">
                  <DollarSign className="h-8 w-8 mb-2" />
                  <span className="font-semibold">Exam Fees</span>
                  <span className="text-xs text-muted-foreground">Pay examination fees</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Payment History</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/student/payments/receipts">View All Receipts</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading && <p className="text-sm text-muted-foreground">Loading payments...</p>}

              {!isLoading && paymentList.length === 0 && (
                <p className="text-sm text-muted-foreground">No payments found.</p>
              )}

              {!isLoading && paymentList.map((payment) => {
                const createdAt = (payment as Payment & { createdAt?: string; date?: string }).createdAt ||
                  (payment as Payment & { date?: string }).date;

                const description = payment.description;

                return (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="rounded-full bg-primary/10 p-3">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{description}</p>
                          <Badge variant={getStatusBadge(payment.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(payment.status)}
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </span>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Reference: {payment.reference}
                        </p>
                        {createdAt && (
                          <p className="text-sm text-muted-foreground">
                            Date: {formatDate(createdAt)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-lg font-bold">{formatCurrency(payment.amount)}</p>
                      {payment.status === "completed" && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/student/payments/${payment.id}/receipt`}>
                            <Download className="mr-2 h-4 w-4" />
                            Receipt
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Installment Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Installment Payment Plans</CardTitle>
            <CardDescription>
              Available payment plans for your convenience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Standard Plan</p>
                  <p className="text-sm text-muted-foreground">
                    Pay in 3 installments over the semester
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/student/payments/installments">View Plan</Link>
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Flexible Plan</p>
                  <p className="text-sm text-muted-foreground">
                    Custom payment schedule based on your needs
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/student/payments/installments">Apply</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
