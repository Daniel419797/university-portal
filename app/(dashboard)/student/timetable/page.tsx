"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface TimetableEntry {
  day: string;
  slots: {
    time: string;
    courseCode: string;
    courseTitle: string;
    venue: string;
    lecturer: string;
    type: "lecture" | "practical" | "tutorial";
  }[];
}

export default function StudentTimetablePage() {
  const timetable: TimetableEntry[] = [
    {
      day: "Monday",
      slots: [
        {
          time: "08:00 - 10:00",
          courseCode: "CSC 401",
          courseTitle: "Data Structures",
          venue: "LT1",
          lecturer: "Dr. Anderson",
          type: "lecture",
        },
        {
          time: "14:00 - 16:00",
          courseCode: "CSC 403",
          courseTitle: "Software Engineering",
          venue: "Lab 2",
          lecturer: "Prof. Thompson",
          type: "practical",
        },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        {
          time: "10:00 - 12:00",
          courseCode: "CSC 402",
          courseTitle: "Operating Systems",
          venue: "LT2",
          lecturer: "Dr. Martinez",
          type: "lecture",
        },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        {
          time: "08:00 - 10:00",
          courseCode: "CSC 401",
          courseTitle: "Data Structures",
          venue: "Lab 3",
          lecturer: "Dr. Anderson",
          type: "practical",
        },
        {
          time: "12:00 - 14:00",
          courseCode: "CSC 404",
          courseTitle: "Computer Networks",
          venue: "LT1",
          lecturer: "Prof. Garcia",
          type: "lecture",
        },
      ],
    },
    {
      day: "Thursday",
      slots: [
        {
          time: "10:00 - 12:00",
          courseCode: "CSC 405",
          courseTitle: "Artificial Intelligence",
          venue: "LT3",
          lecturer: "Dr. Rodriguez",
          type: "lecture",
        },
      ],
    },
    {
      day: "Friday",
      slots: [
        {
          time: "14:00 - 16:00",
          courseCode: "CSC 402",
          courseTitle: "Operating Systems",
          venue: "Lab 1",
          lecturer: "Dr. Martinez",
          type: "tutorial",
        },
      ],
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-blue-500";
      case "practical":
        return "bg-green-500";
      case "tutorial":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Timetable</h1>
          <p className="text-muted-foreground">Your weekly class schedule</p>
        </div>

        <div className="grid gap-4">
          {timetable.map((day) => (
            <Card key={day.day}>
              <CardHeader>
                <CardTitle>{day.day}</CardTitle>
                <CardDescription>{day.slots.length} classes scheduled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {day.slots.map((slot, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 border-l-4 pl-4 py-2"
                      style={{ borderLeftColor: getTypeColor(slot.type).replace('bg-', '#') }}
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
                          <Badge variant="outline" className="capitalize">
                            {slot.type}
                          </Badge>
                        </div>
                        <p className="text-sm">{slot.courseTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          {slot.venue} • {slot.lecturer}
                        </p>
                      </div>
                    </div>
                  ))}
                  {day.slots.length === 0 && (
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
