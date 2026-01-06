"use client";

import { useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { studentService, type Timetable } from "@/lib/services";

export default function StudentTimetablePage() {
  const { data, isLoading, execute } = useApi<Timetable>();

  useEffect(() => {
    execute(() => studentService.getTimetable(), {
      errorMessage: "Failed to load timetable",
    });
  }, [execute]);

  const schedule = data?.schedule || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Timetable</h1>
          <p className="text-muted-foreground">Your weekly class schedule</p>
        </div>

        {isLoading && (
          <Card>
            <CardHeader>
              <CardTitle>Loading timetable...</CardTitle>
              <CardDescription>Please wait while we fetch your classes.</CardDescription>
            </CardHeader>
          </Card>
        )}

        <div className="grid gap-4">
          {!isLoading && schedule.length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>No classes scheduled</CardTitle>
                <CardDescription>Once your timetable is published, it will appear here.</CardDescription>
              </CardHeader>
            </Card>
          )}

          {schedule.map((day) => (
            <Card key={day.day}>
              <CardHeader>
                <CardTitle>{day.day}</CardTitle>
                <CardDescription>{day.classes.length} classes scheduled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {day.classes.map((slot, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 border-l-4 pl-4 py-2"
                      style={{ borderLeftColor: "#0ea5e9" }}
                    >
                      <div className="flex-shrink-0">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {slot.time}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{slot.courseCode}</span>
                        </div>
                        <p className="text-sm">{slot.courseTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          {slot.venue} • {slot.lecturer}
                        </p>
                      </div>
                    </div>
                  ))}
                  {day.classes.length === 0 && (
                    <p className="text-sm text-muted-foreground">No classes scheduled</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
