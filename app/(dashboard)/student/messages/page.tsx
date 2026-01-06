"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MessageSquare, Send, Inbox, Archive, Search } from "lucide-react";
import { useEffect } from "react";
import { useApi } from "@/hooks/use-api";
import { messageService } from "@/lib/services";
import { Message } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";

export default function StudentMessagesPage() {
  const [activeTab, setActiveTab] = useState<"inbox" | "sent">("inbox");
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useAuthStore();
  const { data: messagesData, isLoading, execute } = useApi<{ messages: Message[]; total: number }>();

  useEffect(() => {
    execute(() => messageService.getMessages(), {
      errorMessage: "Failed to load messages"
    });
  }, [execute]);

  const messages = messagesData?.messages || [];
  const inboxMessages = messages.filter(msg => msg.recipientId === user?.id);
  const sentMessages = messages.filter(msg => msg.senderId === user?.id);

  const filteredInbox = inboxMessages.filter(
    (msg) =>
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.senderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSent = sentMessages.filter(
    (msg) =>
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground">Communicate with lecturers and administrators</p>
          </div>
          <Button onClick={() => setShowComposeDialog(true)}>
            <Send className="mr-2 h-4 w-4" />
            Compose
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b">
          <button
            onClick={() => setActiveTab("inbox")}
            className={`flex items-center gap-2 px-4 py-2 -mb-px ${
              activeTab === "inbox"
                ? "border-b-2 border-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            <Inbox className="h-4 w-4" />
            Inbox ({inboxMessages.filter((m) => !m.read).length})
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`flex items-center gap-2 px-4 py-2 -mb-px ${
              activeTab === "sent"
                ? "border-b-2 border-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            <Archive className="h-4 w-4" />
            Sent ({sentMessages.length})
          </button>
        </div>

        {/* Messages List */}
        <div className="space-y-2">
          {activeTab === "inbox" &&
            filteredInbox.map((message) => (
              <Card
                key={message.id}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                  !message.read ? "border-l-4 border-l-primary" : ""
                }`}
                onClick={() => setSelectedMessage(message)}
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
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {message.body}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                      {new Date(message.sentAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}

          {activeTab === "sent" &&
            filteredSent.map((message) => (
              <Card
                key={message.id}
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => setSelectedMessage(message)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium mb-1">{message.subject}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {message.body}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                      {new Date(message.sentAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Compose Dialog */}
        <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Compose Message</DialogTitle>
              <DialogDescription>Send a message to a lecturer or administrator</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">To</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="">Select recipient</option>
                  <option value="lecturer-1">Dr. Michael Anderson (Lecturer)</option>
                  <option value="lecturer-2">Prof. Sarah Thompson (Lecturer)</option>
                  <option value="admin-1">Admin Office</option>
                  <option value="hod-1">HOD Computer Science</option>
                </select>
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

        {/* View Message Dialog */}
        {selectedMessage && (
          <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedMessage.subject}</DialogTitle>
                <DialogDescription>
                  From: {selectedMessage.senderName} ({selectedMessage.senderRole})
                  <br />
                  Date: {new Date(selectedMessage.sentAt).toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-t pt-4">
                  <p className="text-sm">{selectedMessage.body}</p>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">Reply</Button>
                  <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
}
