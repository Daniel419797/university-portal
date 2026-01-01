"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, BookOpen, Save, Trash2, Edit, Calendar } from "lucide-react";

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const userId = params?.id;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phone: "+234 123 456 7890",
    role: "student",
    department: "Computer Science",
    matricNumber: "CS/2022/001",
    level: "400",
    status: "active",
    enrollmentDate: "2022-09-01",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Changes Saved",
      description: "User profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete this user? This action cannot be undone.");
    if (!confirmed) return;

    toast({
      title: "User Deleted",
      description: "The user has been deleted successfully.",
      variant: "destructive",
    });

    setTimeout(() => {
      router.push("/admin/users");
    }, 1500);
  };

  const handleResetPassword = () => {
    toast({
      title: "Password Reset",
      description: "A password reset link has been sent to the user's email.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {formData.firstName} {formData.lastName}
            </h1>
            <p className="text-muted-foreground">
              {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} • {formData.department}
            </p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Status Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className="text-lg px-4 py-1" variant={formData.status === "active" ? "default" : "secondary"}>
                  {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Enrolled since {new Date(formData.enrollmentDate).toLocaleDateString()}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleResetPassword}>
                Reset Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Details Tabs */}
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="academic">Academic Info</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Full Name:</span>
                      <span className="font-medium">
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Info Tab */}
          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Matric Number:</span>
                  <span className="font-medium">{formData.matricNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">{formData.department}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Level:</span>
                  <span className="font-medium">{formData.level} Level</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Enrollment Date:</span>
                  <span className="font-medium">
                    {new Date(formData.enrollmentDate).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>User activity and login history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Login</p>
                      <p className="text-sm text-muted-foreground">Last login from Chrome on Windows</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Password Changed</p>
                      <p className="text-sm text-muted-foreground">User changed their password</p>
                    </div>
                    <span className="text-sm text-muted-foreground">3 days ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Profile Updated</p>
                      <p className="text-sm text-muted-foreground">Contact information updated</p>
                    </div>
                    <span className="text-sm text-muted-foreground">1 week ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Back Button */}
        <Button variant="outline" onClick={() => router.back()}>
          Back to Users
        </Button>
      </div>
    </DashboardLayout>
  );
}
