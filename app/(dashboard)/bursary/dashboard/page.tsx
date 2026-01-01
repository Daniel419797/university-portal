"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, TrendingUp, CheckCircle } from "lucide-react";

export default function BursaryDashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₦450.2M",
      change: "+18.5%",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Pending Payments",
      value: "2,845",
      change: "-12%",
      icon: Users,
      color: "text-yellow-500",
    },
    {
      title: "Verified Payments",
      value: "5,605",
      change: "+25%",
      icon: CheckCircle,
      color: "text-blue-500",
    },
    {
      title: "Payment Rate",
      value: "66.3%",
      change: "+8.2%",
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  const recentPayments = [
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
      status: "pending",
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
                  <p className="text-xs text-green-500">{stat.change} from last month</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Payments awaiting verification</CardDescription>
              </div>
              <Button asChild>
                <Link href="/bursary/payments">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{payment.studentName}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.matricNumber} • {payment.type} • {payment.reference}
                    </p>
                    <p className="text-sm font-semibold mt-1">₦{payment.amount.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Badge variant="secondary">{payment.status}</Badge>
                    <Button size="sm">Verify</Button>
                  </div>
                </div>
              ))}
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
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                Chart placeholder - Payment trend
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
