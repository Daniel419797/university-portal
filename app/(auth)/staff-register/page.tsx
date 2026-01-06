"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

const staffRegisterSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
  role: z.enum(["lecturer", "hod", "bursary", "admin"], {
    message: "Please select a valid role",
  }),
  department: z.string().min(2, "Please select a department"),
  staffId: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type StaffRegisterFormData = z.infer<typeof staffRegisterSchema>;

export default function StaffRegisterPage() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuth();
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StaffRegisterFormData>({
    resolver: zodResolver(staffRegisterSchema),
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: StaffRegisterFormData) => {
    try {
      setError("");
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        department: data.department,
        staffId: data.staffId,
      });

      // Redirect based on role
      const roleRoutes = {
        lecturer: "/lecturer/dashboard",
        hod: "/hod/dashboard",
        bursary: "/bursary/dashboard",
        admin: "/admin/dashboard",
      };

      router.push(roleRoutes[data.role] || "/login");
    } catch (err: unknown) {
      const errorMessage = err && typeof err === 'object' && 'message' in err
        ? String((err as { message: string }).message)
        : "Registration failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Staff Registration</CardTitle>
          <CardDescription>Register as a lecturer, HOD, or bursary staff member</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Fields */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@university.edu"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                {...register("role")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select your role</option>
                <option value="lecturer">Lecturer</option>
                <option value="hod">Head of Department (HOD)</option>
                <option value="bursary">Bursary Staff</option>
                <option value="admin">Administrator</option>
              </select>
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role.message}</p>
              )}
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <select
                id="department"
                {...register("department")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Data Science">Data Science</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Economics">Economics</option>
                <option value="Accounting">Accounting</option>
              </select>
              {errors.department && (
                <p className="text-sm text-destructive">{errors.department.message}</p>
              )}
            </div>

            {/* Staff ID (for lecturers and HODs) */}
            {(selectedRole === "lecturer" || selectedRole === "hod" || selectedRole === "admin") && (
              <div className="space-y-2">
                <Label htmlFor="staffId">Staff ID (Optional)</Label>
                <Input
                  id="staffId"
                  placeholder="STF/2024/001"
                  {...register("staffId")}
                />
                {errors.staffId && (
                  <p className="text-sm text-destructive">{errors.staffId.message}</p>
                )}
              </div>
            )}

            {/* Password Fields */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Staff Account"}
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>

            {/* Student Registration Link */}
            <p className="text-center text-sm text-muted-foreground">
              Are you a student?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Student Registration
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card className="mt-4 w-full max-w-2xl bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-center text-sm text-muted-foreground">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}