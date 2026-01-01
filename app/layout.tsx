import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "University Portal",
  description: "Complete university management system for students, lecturers, and administrators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
