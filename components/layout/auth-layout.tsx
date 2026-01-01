"use client";

import { ReactNode } from "react";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center space-x-2">
          <GraduationCap className="h-12 w-12 text-primary" />
          <span className="text-3xl font-bold">UniPortal</span>
        </Link>

        {/* Content */}
        {children}

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 University Portal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
