"use client";

import { useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, TrendingUp, CheckCircle } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { bursaryService, BursaryDashboardStats } from "@/lib/services/hodBursaryService";

export default function BursaryDashboardPage() {
  const { data, isLoading, execute } = useApi<BursaryDashboardStats>();

  useEffect(() => {
    execute(() => bursaryService.getDashboard(), {
      errorMessage: "Failed to load bursary dashboard"
    });
  }, [execute]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-muted-foreground">No dashboard data available</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const totalPayments = Number(data.totalPayments ?? 0);
  const verifiedPayments = Number(data.verifiedPayments ?? 0);
  const pendingScholarships = Number(data.pendingScholarships ?? 0);
  const totalRevenue = Number(data.totalRevenue ?? 0);

  const stats = [
    {
      title: "Total Revenue",
      value: `₦${(totalRevenue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Total Payments",
      value: totalPayments.toLocaleString(),
      icon: Users,
      color: "text-yellow-500",
    },
    {
      title: "Verified Payments",
      value: verifiedPayments.toLocaleString(),
      icon: CheckCircle,
      color: "text-blue-500",
    },
    {
      title: "Pending Scholarships",
      value: String(pendingScholarships),
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Bursary Dashboard</h1>
          <p className="text-muted-foreground">Financial management and payment tracking</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription>{stat.title}</CardDescription>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Payment Overview</CardTitle>
                <CardDescription>Financial summary and pending items</CardDescription>
              </div>
              <Button asChild>
                <Link href="/bursary/payments">View All Payments</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Total Payments Received</p>
                  <p className="text-2xl font-bold mt-1">{totalPayments.toLocaleString()}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Verified Payments</p>
                  <p className="text-2xl font-bold mt-1">{verifiedPayments.toLocaleString()}</p>
                </div>
                <Badge className="text-lg">
                  {totalPayments === 0 ? '0%' : `${((verifiedPayments / totalPayments) * 100).toFixed(1)}%`}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Pending Scholarships</p>
                  <p className="text-2xl font-bold mt-1">{pendingScholarships}</p>
                </div>
                <Button asChild size="sm">
                  <Link href="/bursary/scholarships">Review</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Statistics */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: "Tuition", amount: 350000000, percentage: 77.8 },
                  { type: "Hostel", amount: 50000000, percentage: 11.1 },
                  { type: "Library", amount: 20000000, percentage: 4.4 },
                  { type: "Medical", amount: 15000000, percentage: 3.3 },
                  { type: "Others", amount: 15200000, percentage: 3.4 },
                ].map((item) => (
                  <div key={item.type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.type}</span>
                      <span className="font-medium">₦{(item.amount / 1000000).toFixed(1)}M ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Trend</CardTitle>
              <CardDescription>Monthly collection over the year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-50 flex items-center justify-center text-muted-foreground">
                Chart placeholder - Payment trend
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
