"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Users, AlertCircle, FileText, Download } from "lucide-react";

export default function AdminFinancialPage() {
  const stats = [
    {
      title: "Total Revenue (YTD)",
      value: "₦1.2B",
      change: "+22.5%",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Outstanding Fees",
      value: "₦180M",
      change: "-5.2%",
      icon: AlertCircle,
      color: "text-yellow-500",
    },
    {
      title: "Collection Rate",
      value: "87.2%",
      change: "+3.1%",
      icon: TrendingUp,
      color: "text-blue-500",
    },
    {
      title: "Students with Debt",
      value: "1,245",
      change: "-8.5%",
      icon: Users,
      color: "text-red-500",
    },
  ];

  const paymentBreakdown = [
    { type: "Tuition Fees", amount: 950000000, percentage: 79.2 },
    { type: "Hostel Fees", amount: 120000000, percentage: 10.0 },
    { type: "Library Fees", amount: 48000000, percentage: 4.0 },
    { type: "Medical Fees", amount: 36000000, percentage: 3.0 },
    { type: "Late Registration", amount: 24000000, percentage: 2.0 },
    { type: "Others", amount: 22000000, percentage: 1.8 },
  ];

  const recentTransactions = [
    {
      id: "1",
      date: "2026-01-01",
      description: "Tuition Payment - John Doe",
      amount: 150000,
      type: "credit",
      reference: "PAY/2026/001234",
    },
    {
      id: "2",
      date: "2026-01-01",
      description: "Scholarship Disbursement",
      amount: 100000,
      type: "debit",
      reference: "SCH/2026/000045",
    },
    {
      id: "3",
      date: "2025-12-31",
      description: "Hostel Fee - Jane Smith",
      amount: 50000,
      type: "credit",
      reference: "PAY/2025/009876",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Financial Management</h1>
            <p className="text-muted-foreground">
              Comprehensive financial overview and management
            </p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
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
                  <p
                    className={`text-xs ${
                      stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change} from last period
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="debts">Outstanding Debts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Revenue Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>By payment type (This Year)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentBreakdown.map((item) => (
                      <div key={item.type}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">{item.type}</span>
                          <span className="font-medium">
                            ₦{(item.amount / 1000000).toFixed(1)}M ({item.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue Trend</CardTitle>
                  <CardDescription>Last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Chart placeholder - Monthly revenue trend
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest financial transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()} •{" "}
                          {transaction.reference}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "credit" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}₦
                          {transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {transaction.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown">
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Detailed financial breakdown by department, level, and payment type
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="debts">
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Students with outstanding fee balances
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-4">
          <Button variant="outline" className="justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Generate Invoice
          </Button>
          <Button variant="outline" className="justify-start">
            <DollarSign className="mr-2 h-4 w-4" />
            Payment Reminder
          </Button>
          <Button variant="outline" className="justify-start">
            <Download className="mr-2 h-4 w-4" />
            Financial Report
          </Button>
          <Button variant="outline" className="justify-start">
            <TrendingUp className="mr-2 h-4 w-4" />
            Revenue Analytics
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
