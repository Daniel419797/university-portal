"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { USER_ROLES } from "@/lib/constants";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect to appropriate dashboard based on role
      const roleRoutes = {
        [USER_ROLES.STUDENT]: "/student/dashboard",
        [USER_ROLES.LECTURER]: "/lecturer/dashboard",
        [USER_ROLES.ADMIN]: "/admin/dashboard",
        [USER_ROLES.HOD]: "/hod/dashboard",
        [USER_ROLES.BURSARY]: "/bursary/dashboard",
      };
      router.push(roleRoutes[user.role] || "/login");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
