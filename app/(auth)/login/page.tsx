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
import { USER_ROLES } from "@/lib/constants";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum([USER_ROLES.STUDENT, USER_ROLES.LECTURER, USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.BURSARY]),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: USER_ROLES.STUDENT,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");
      await login(data.email, data.password, data.role);
      
      // Redirect based on role
      const roleRoutes = {
        [USER_ROLES.STUDENT]: "/student/dashboard",
        [USER_ROLES.LECTURER]: "/lecturer/dashboard",
        [USER_ROLES.ADMIN]: "/admin/dashboard",
        [USER_ROLES.HOD]: "/hod/dashboard",
        [USER_ROLES.BURSARY]: "/bursary/dashboard",
      };
      
      router.push(roleRoutes[data.role]);
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your university portal account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role">Login As</Label>
              <select
                id="role"
                {...register("role")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value={USER_ROLES.STUDENT}>Student</option>
                <option value={USER_ROLES.LECTURER}>Lecturer</option>
                <option value={USER_ROLES.ADMIN}>Admin</option>
                <option value={USER_ROLES.HOD}>Head of Department</option>
                <option value={USER_ROLES.BURSARY}>Bursary</option>
              </select>
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@university.edu"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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

            {/* Error Message */}
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Register Link */}
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register as Student
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Demo Credentials */}
      <Card className="mt-4 w-full max-w-md bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm font-medium mb-2">Demo Credentials:</p>
          <p className="text-xs text-muted-foreground">
            Any email/password will work for demo purposes
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
