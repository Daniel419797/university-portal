"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, TrendingUp, DollarSign } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { bursaryService } from "@/lib/services/hodBursaryService";
import { useToast } from "@/hooks/use-toast";

export default function BursaryReportsPage() {
  const [reportType, setReportType] = useState("payment-summary");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2026-01-01");
  const { toast } = useToast();
  
  const { data: reportData, isLoading, execute } = useApi<{ reportType: string; period: string; data: Array<Record<string, unknown>>; summary: { totalRevenue: number; totalPayments: number; pendingAmount: number } }>();

  useEffect(() => {
    execute(() => bursaryService.getReports({ 
      reportType,
      dateFrom: startDate,
      dateTo: endDate 
    }), {
      errorMessage: "Failed to load reports"
    });
  }, [execute, reportType, startDate, endDate]);

  const handleGenerateReport = async () => {
    try {
      const result = await bursaryService.generateCustomReport({
        reportType,
        startDate,
        endDate
      });
      toast({
        title: "Report Generated",
        description: `Report generated successfully. Download URL: ${result.downloadUrl}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive"
      });
    }
  };
  const reportTypes = [
    {
      id: "payment-summary",
      title: "Payment Summary Report",
      description: "Overview of all payments received",
      icon: DollarSign,
    },
    {
      id: "revenue-analysis",
      title: "Revenue Analysis",
      description: "Detailed revenue breakdown by type and period",
      icon: TrendingUp,
    },
    {
      id: "outstanding-debts",
      title: "Outstanding Debts Report",
      description: "Students with pending fee payments",
      icon: FileText,
    },
    {
      id: "scholarship-disbursement",
      title: "Scholarship Disbursement",
      description: "Scholarship awards and disbursements",
      icon: FileText,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Financial Reports</h1>
          <p className="text-muted-foreground">Generate and export financial reports</p>
        </div>

        <Tabs defaultValue="generate">
          <TabsList>
            <TabsTrigger value="generate">Generate Report</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
            <TabsTrigger value="history">Report History</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generate New Report</CardTitle>
                <CardDescription>Select report type and parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Report Type</label>
                  <Select>
                    <option value="">Select report type</option>
                    {reportTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.title}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Start Date</label>
                    <input
                      type="date"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue="2025-01-01"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">End Date</label>
                    <input
                      type="date"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue="2026-01-01"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Format</label>
                  <Select>
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel (XLSX)</option>
                    <option value="csv">CSV</option>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Filter By</label>
                  <Select>
                    <option value="all">All Departments</option>
                    <option value="cs">Computer Science</option>
                    <option value="eng">Engineering</option>
                    <option value="med">Medicine</option>
                    <option value="law">Law</option>
                    <option value="bus">Business</option>
                  </Select>
                </div>

                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Quick Reports */}
            <div className="grid gap-4 md:grid-cols-2">
              {reportTypes.map((report) => {
                const Icon = report.icon;
                return (
                  <Card key={report.id} className="cursor-pointer hover:bg-muted/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Icon className="h-5 w-5" />
                            {report.title}
                          </CardTitle>
                          <CardDescription>{report.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="mr-2 h-3 w-3" />
                        Quick Generate
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="scheduled">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Automatically generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No scheduled reports configured</p>
                  <Button variant="outline" className="mt-4">
                    Create Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Report History</CardTitle>
                <CardDescription>Previously generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      name: "Payment Summary - December 2025",
                      date: "2026-01-01",
                      size: "2.4 MB",
                      format: "PDF",
                    },
                    {
                      name: "Revenue Analysis - Q4 2025",
                      date: "2025-12-31",
                      size: "1.8 MB",
                      format: "Excel",
                    },
                    {
                      name: "Outstanding Debts - December 2025",
                      date: "2025-12-30",
                      size: "856 KB",
                      format: "PDF",
                    },
                  ].map((report, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(report.date).toLocaleDateString()} • {report.size} •{" "}
                          {report.format}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
