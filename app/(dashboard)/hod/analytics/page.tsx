"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Award, BookOpen } from "lucide-react";

export default function HODAnalyticsPage() {
  const stats = [
    {
      title: "Department Ranking",
      value: "#3",
      change: "+1 position",
      icon: Award,
    },
    {
      title: "Average CGPA",
      value: "4.2",
      change: "+0.15",
      icon: TrendingUp,
    },
    {
      title: "Graduate Employment Rate",
      value: "92%",
      change: "+5%",
      icon: Users,
    },
    {
      title: "Research Publications",
      value: "45",
      change: "+12",
      icon: BookOpen,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Department Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics for Computer Science Department
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription>{stat.title}</CardDescription>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-500">{stat.change} from last year</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Performance by Level */}
        <Card>
          <CardHeader>
            <CardTitle>Student Performance by Level</CardTitle>
            <CardDescription>Average CGPA across all levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { level: "100", cgpa: 3.8, students: 450 },
                { level: "200", cgpa: 4.0, students: 420 },
                { level: "300", cgpa: 4.2, students: 380 },
                { level: "400", cgpa: 4.5, students: 250 },
              ].map((level) => (
                <div key={level.level}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Level {level.level}</span>
                    <span className="text-muted-foreground">
                      {level.students} students • {level.cgpa} CGPA
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(level.cgpa / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Course Success Rate */}
          <Card>
            <CardHeader>
              <CardTitle>Course Success Rate</CardTitle>
              <CardDescription>Pass rate by course level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Chart placeholder - Course success rates
              </div>
            </CardContent>
          </Card>

          {/* Faculty Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Faculty Performance</CardTitle>
              <CardDescription>Average student ratings for lecturers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Dr. Anderson", rating: 4.8, courses: 3 },
                  { name: "Prof. Thompson", rating: 4.9, courses: 2 },
                  { name: "Dr. Martinez", rating: 4.6, courses: 4 },
                ].map((lecturer) => (
                  <div key={lecturer.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{lecturer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {lecturer.courses} courses
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="font-bold">{lecturer.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrollment Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
            <CardDescription>Student enrollment over the past 5 years</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart placeholder - Enrollment trends
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
