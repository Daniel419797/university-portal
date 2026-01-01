"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MessageSquare, Send, Inbox } from "lucide-react";

export default function LecturerMessagesPage() {
  const [showComposeDialog, setShowComposeDialog] = useState(false);

  const messages = [
    {
      id: "1",
      senderName: "John Doe",
      senderRole: "Student",
      subject: "Request for Assignment Extension",
      body: "Dear Dr. Anderson, I would like to request an extension...",
      read: false,
      sentAt: "2026-01-01T10:30:00",
    },
    {
      id: "2",
      senderName: "HOD Computer Science",
      senderRole: "HOD",
      subject: "Department Meeting",
      body: "There will be a department meeting next week...",
      read: true,
      sentAt: "2025-12-30T14:00:00",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground">Communicate with students and colleagues</p>
          </div>
          <Button onClick={() => setShowComposeDialog(true)}>
            <Send className="mr-2 h-4 w-4" />
            Compose
          </Button>
        </div>

        <div className="space-y-2">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                !message.read ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium ${!message.read ? "font-bold" : ""}`}>
                        {message.senderName}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {message.senderRole}
                      </Badge>
                    </div>
                    <h3 className={`text-sm mb-1 ${!message.read ? "font-semibold" : ""}`}>
                      {message.subject}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{message.body}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                    {new Date(message.sentAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Compose Message</DialogTitle>
              <DialogDescription>Send a message to students or colleagues</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">To</label>
                <Input placeholder="Enter recipient email or name" />
              </div>
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Enter subject" />
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="Type your message..." rows={6} />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowComposeDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
