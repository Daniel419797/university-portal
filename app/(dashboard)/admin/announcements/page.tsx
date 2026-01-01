"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { Bell, Plus, Send, Edit, Trash2 } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  target: "all" | "students" | "lecturers" | "staff";
  priority: "low" | "medium" | "high";
  publishedAt: string;
  author: string;
  status: "draft" | "published";
}

export default function AdminAnnouncementsPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTarget, setEditTarget] = useState("all");
  const [editPriority, setEditPriority] = useState("medium");

  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setEditTitle(announcement.title);
    setEditContent(announcement.content);
    setEditTarget(announcement.target);
    setEditPriority(announcement.priority);
    setShowEditDialog(true);
  };

  const handleDelete = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setShowDeleteDialog(true);
  };

  const confirmEdit = () => {
    // Handle edit logic here
    setShowEditDialog(false);
    setSelectedAnnouncement(null);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    setShowDeleteDialog(false);
    setSelectedAnnouncement(null);
  };

  const announcements: Announcement[] = [
    {
      id: "1",
      title: "Mid-Semester Break Announcement",
      content:
        "The mid-semester break will commence on January 15, 2026. All students are expected to resume on January 29, 2026.",
      target: "all",
      priority: "high",
      publishedAt: "2026-01-01T10:00:00",
      author: "Admin Office",
      status: "published",
    },
    {
      id: "2",
      title: "Library Opening Hours Extended",
      content:
        "The library will now be open from 7:00 AM to 11:00 PM on weekdays during the examination period.",
      target: "students",
      priority: "medium",
      publishedAt: "2025-12-30T14:30:00",
      author: "Library Department",
      status: "published",
    },
    {
      id: "3",
      title: "Upcoming Faculty Meeting",
      content:
        "All faculty members are required to attend the departmental meeting scheduled for January 10, 2026 at 10:00 AM.",
      target: "lecturers",
      priority: "high",
      publishedAt: "2025-12-28T09:00:00",
      author: "HOD Computer Science",
      status: "published",
    },
    {
      id: "4",
      title: "New Course Registration Guidelines",
      content: "Updated guidelines for course registration will be available soon.",
      target: "students",
      priority: "low",
      publishedAt: "2025-12-25T15:00:00",
      author: "Academic Office",
      status: "draft",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getTargetBadge = (target: string) => {
    const colors: Record<string, string> = {
      all: "bg-purple-500",
      students: "bg-blue-500",
      lecturers: "bg-green-500",
      staff: "bg-yellow-500",
    };
    return colors[target] || "bg-gray-500";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Announcements</h1>
            <p className="text-muted-foreground">
              Create and manage institutional announcements
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Announcements</CardDescription>
              <div className="text-2xl font-bold">{announcements.length}</div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Published</CardDescription>
              <div className="text-2xl font-bold">
                {announcements.filter((a) => a.status === "published").length}
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Drafts</CardDescription>
              <div className="text-2xl font-bold">
                {announcements.filter((a) => a.status === "draft").length}
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>High Priority</CardDescription>
              <div className="text-2xl font-bold">
                {announcements.filter((a) => a.priority === "high").length}
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle>{announcement.title}</CardTitle>
                      <Badge variant={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                      <Badge className={getTargetBadge(announcement.target)}>
                        {announcement.target}
                      </Badge>
                      <Badge variant={announcement.status === "published" ? "default" : "outline"}>
                        {announcement.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      By {announcement.author} •{" "}
                      {new Date(announcement.publishedAt).toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(announcement)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(announcement)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{announcement.content}</p>
                {announcement.status === "draft" && (
                  <Button size="sm" className="mt-4">
                    <Send className="mr-2 h-3 w-3" />
                    Publish
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>
                Compose and publish an announcement to users
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input placeholder="Enter announcement title" />
              </div>
              <div>
                <Label>Target Audience</Label>
                <Select>
                  <option value="all">All Users</option>
                  <option value="students">Students Only</option>
                  <option value="lecturers">Lecturers Only</option>
                  <option value="staff">Staff Only</option>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </div>
              <div>
                <Label>Content</Label>
                <Textarea placeholder="Enter announcement content..." rows={6} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="send-email" />
                <Label htmlFor="send-email">Send email notification</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="send-sms" />
                <Label htmlFor="send-sms">Send SMS notification</Label>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  Publish Now
                </Button>
                <Button variant="outline" className="flex-1">
                  Save as Draft
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Announcement</DialogTitle>
              <DialogDescription>Update announcement details</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  placeholder="Announcement title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>

              <div>
                <Label>Content</Label>
                <Textarea
                  placeholder="Announcement content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={5}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Target Audience</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={editTarget}
                    onChange={(e) => setEditTarget(e.target.value)}
                  >
                    <option value="all">All Users</option>
                    <option value="students">Students Only</option>
                    <option value="lecturers">Lecturers Only</option>
                    <option value="staff">Staff Only</option>
                  </select>
                </div>

                <div>
                  <Label>Priority</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={confirmEdit} className="flex-1">
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowEditDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Announcement</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this announcement? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            {selectedAnnouncement && (
              <div className="p-4 bg-muted rounded-lg mb-4">
                <p className="font-medium">{selectedAnnouncement.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedAnnouncement.content.substring(0, 100)}...
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="destructive" onClick={confirmDelete} className="flex-1">
                Delete Permanently
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
