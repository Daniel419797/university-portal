"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { authService } from "@/lib/services/authService";
import { removeAuthToken } from "@/lib/services/apiClient";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated on mount
    const initializeAuth = async () => {
      try {
        const isAuth = authService.isAuthenticated();
        
        if (isAuth) {
          // Get user from localStorage or fetch from API
          const user = authService.getCurrentUser();
          if (user) {
            setUser(user);
          } else {
            // Token exists but no user data, clear everything softly
            removeAuthToken();
            setUser(null);
            router.push("/login");
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // Clear invalid auth state softly
        removeAuthToken();
        setUser(null);
        router.push("/login");
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [setUser, router]);

  // Listen for unauthorized events from API client
  useEffect(() => {
    const onUnauthorized = () => {
      removeAuthToken();
      setUser(null);
      router.push("/login");
    };

    // Register listener
    if (typeof window !== "undefined") {
      window.addEventListener("auth:unauthorized", onUnauthorized as EventListener);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("auth:unauthorized", onUnauthorized as EventListener);
      }
    };
  }, [router, setUser]);

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
