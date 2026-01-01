"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  DollarSign,
  Home as HomeIcon,
  Calendar,
  Trophy,
  MessageSquare,
  Bell,
  Settings,
  Users,
  GraduationCap,
  ClipboardList,
  BarChart3,
  FileCheck,
  Building2,
  UserCheck,
} from "lucide-react";
import { UserRole } from "@/lib/types";

interface SidebarProps {
  userRole: UserRole;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const studentNavItems: NavItem[] = [
  { title: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { title: "Courses", href: "/student/courses", icon: BookOpen },
  { title: "Timetable", href: "/student/timetable", icon: Calendar },
  { title: "Assignments", href: "/student/assignments", icon: FileText, badge: 3 },
  { title: "Quizzes", href: "/student/quizzes", icon: ClipboardList },
  { title: "Results", href: "/student/results", icon: Trophy },
  { title: "Payments", href: "/student/payments", icon: DollarSign },
  { title: "Hostel", href: "/student/hostel", icon: HomeIcon },
  { title: "Scholarships", href: "/student/scholarships", icon: GraduationCap },
  { title: "Messages", href: "/student/messages", icon: MessageSquare },
  { title: "Clearance", href: "/student/clearance", icon: FileCheck },
];

const lecturerNavItems: NavItem[] = [
  { title: "Dashboard", href: "/lecturer/dashboard", icon: LayoutDashboard },
  { title: "Courses", href: "/lecturer/courses", icon: BookOpen },
  { title: "Students", href: "/lecturer/students", icon: Users },
  { title: "Assignments", href: "/lecturer/assignments", icon: FileText },
  { title: "Quizzes", href: "/lecturer/quizzes", icon: ClipboardList },
  { title: "Attendance", href: "/lecturer/attendance", icon: UserCheck },
  { title: "Results", href: "/lecturer/results", icon: Trophy },
  { title: "Analytics", href: "/lecturer/analytics", icon: BarChart3 },
  { title: "Messages", href: "/lecturer/messages", icon: MessageSquare },
];

const adminNavItems: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Courses", href: "/admin/courses", icon: BookOpen },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { title: "Hostel", href: "/admin/hostel", icon: HomeIcon },
  { title: "Clearance", href: "/admin/clearance", icon: FileCheck },
  { title: "Financial", href: "/admin/financial", icon: DollarSign },
  { title: "Announcements", href: "/admin/announcements", icon: Bell },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

const hodNavItems: NavItem[] = [
  { title: "Dashboard", href: "/hod/dashboard", icon: LayoutDashboard },
  { title: "Department", href: "/hod/department", icon: Building2 },
  { title: "Results Approval", href: "/hod/results/approval", icon: FileCheck },
  { title: "Staff", href: "/hod/staff", icon: Users },
  { title: "Analytics", href: "/hod/analytics", icon: BarChart3 },
];

const bursaryNavItems: NavItem[] = [
  { title: "Dashboard", href: "/bursary/dashboard", icon: LayoutDashboard },
  { title: "Payments", href: "/bursary/payments", icon: DollarSign },
  { title: "Scholarships", href: "/bursary/scholarships", icon: GraduationCap },
  { title: "Reports", href: "/bursary/reports", icon: BarChart3 },
];

const navItemsByRole: Record<UserRole, NavItem[]> = {
  student: studentNavItems,
  lecturer: lecturerNavItems,
  admin: adminNavItems,
  hod: hodNavItems,
  bursary: bursaryNavItems,
};

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();
  const navItems = navItemsByRole[userRole] || studentNavItems;

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card transition-transform">
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center px-3">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">UniPortal</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <span className="rounded-full bg-destructive px-2 py-0.5 text-xs text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t border-border pt-4">
          <Link
            href="/settings"
            className={cn(
              "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/settings"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
