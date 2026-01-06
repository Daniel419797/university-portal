"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, BookOpen, Save } from "lucide-react";
import { adminService } from "@/lib/services";

export default function CreateUserPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    department: "",
    matricNumber: "",
    level: "",
    staffId: "",
  });

  const roles = ["student", "lecturer", "admin", "hod", "bursary"];
  const departments = ["Computer Science", "Software Engineering", "Information Technology", "Cyber Security"];
  const levels = ["100", "200", "300", "400", "500"];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.role) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Generate a temporary password if not provided
      const password = formData.password || Math.random().toString(36).slice(-12) + "Temp!";

      const userData = {
        email: formData.email,
        password: password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role as 'student' | 'lecturer' | 'admin' | 'hod' | 'bursary',
        department: formData.department || undefined,
        level: formData.role === 'student' ? formData.level : undefined,
        matricNumber: formData.role === 'student' ? formData.matricNumber : undefined,
      };

      await adminService.createUser(userData);

      toast({
        title: "User Created Successfully",
        description: `User has been created with role: ${formData.role}. Temporary password: ${password}`,
      });

      setTimeout(() => {
        router.push("/admin/users");
      }, 2000);
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create user. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New User</h1>
          <p className="text-muted-foreground">Add a new user to the system</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@university.edu"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 123 456 7890"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Leave blank to auto-generate"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Leave blank to auto-generate a temporary password
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Role & Department */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Role & Department
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">
                  User Role <span className="text-red-500">*</span>
                </Label>
                <select
                  id="role"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  required
                >
                  <option value="">Select role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <select
                  id="department"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Student-specific fields */}
              {formData.role === "student" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="matricNumber">Matric Number</Label>
                    <Input
                      id="matricNumber"
                      placeholder="CS/2022/001"
                      value={formData.matricNumber}
                      onChange={(e) => handleChange("matricNumber", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <select
                      id="level"
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.level}
                      onChange={(e) => handleChange("level", e.target.value)}
                    >
                      <option value="">Select level</option>
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level} Level
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Staff-specific fields */}
              {(formData.role === "lecturer" || formData.role === "hod") && (
                <div className="space-y-2">
                  <Label htmlFor="staffId">Staff ID</Label>
                  <Input
                    id="staffId"
                    placeholder="STF/2022/001"
                    value={formData.staffId}
                    onChange={(e) => handleChange("staffId", e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Create User
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
