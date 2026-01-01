"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Globe, DollarSign, Calendar, Mail } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">Configure system-wide settings</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>Basic system configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Institution Name</Label>
                  <Input defaultValue="University of Excellence" />
                </div>
                <div>
                  <Label>Institution Email</Label>
                  <Input type="email" defaultValue="info@university.edu" />
                </div>
                <div>
                  <Label>Institution Phone</Label>
                  <Input type="tel" defaultValue="+234 123 456 7890" />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input defaultValue="123 University Road, City, State" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Academic Settings
                </CardTitle>
                <CardDescription>Configure academic year and semester settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Current Session</Label>
                  <Input defaultValue="2025/2026" />
                </div>
                <div>
                  <Label>Current Semester</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="first">First Semester</option>
                    <option value="second">Second Semester</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="registration" defaultChecked />
                  <Label htmlFor="registration">Course Registration Open</Label>
                </div>
                <div>
                  <Label>Registration Deadline</Label>
                  <Input type="date" defaultValue="2026-02-28" />
                </div>
                <div>
                  <Label>Late Registration Fee</Label>
                  <Input type="number" defaultValue="5000" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Settings
                </CardTitle>
                <CardDescription>Configure payment and fee settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tuition Fee (Per Semester)</Label>
                  <Input type="number" defaultValue="150000" />
                </div>
                <div>
                  <Label>Hostel Fee (Per Semester)</Label>
                  <Input type="number" defaultValue="50000" />
                </div>
                <div>
                  <Label>Payment Deadline</Label>
                  <Input type="date" defaultValue="2026-01-31" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="installment" defaultChecked />
                  <Label htmlFor="installment">Allow Installment Payments</Label>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Email Notifications</Label>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>SMS Notifications</Label>
                    <input type="checkbox" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Push Notifications</Label>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>
                <div>
                  <Label>SMTP Server</Label>
                  <Input defaultValue="smtp.gmail.com" />
                </div>
                <div>
                  <Label>SMTP Port</Label>
                  <Input type="number" defaultValue="587" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
