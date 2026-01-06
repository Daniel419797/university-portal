"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/lib/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    // Check if user has the required role
    if (allowedRoles && !allowedRoles.includes(user.role as UserRole)) {
      // Redirect to their appropriate dashboard
      const roleRoutes: Record<string, string> = {
        student: "/student/dashboard",
        lecturer: "/lecturer/dashboard",
        admin: "/admin/dashboard",
        hod: "/hod/dashboard",
        bursary: "/bursary/dashboard",
      };
      
      router.push(roleRoutes[user.role] || "/login");
    }
  }, [isAuthenticated, user, allowedRoles, router]);

  // Show nothing while checking authentication
  if (!isAuthenticated || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check role authorization
  if (allowedRoles && !allowedRoles.includes(user.role as UserRole)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
