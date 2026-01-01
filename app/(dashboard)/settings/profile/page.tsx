"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Upload, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProfileSettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  if (!user) return null;

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
      variant: "success",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>

        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile photo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.firstName} />
                <AvatarFallback className="text-2xl">
                  {getInitials(`${user.firstName} ${user.lastName}`)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Photo
                </Button>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue={user.firstName} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue={user.lastName} />
              </div>
            </div>

            {user.studentId && (
              <div>
                <Label htmlFor="studentId">Student/Staff ID</Label>
                <Input id="studentId" defaultValue={user.studentId} disabled />
              </div>
            )}

            {user.department && (
              <div>
                <Label htmlFor="department">Department</Label>
                <Input id="department" defaultValue={user.department} disabled />
              </div>
            )}

            {user.level && (
              <div>
                <Label htmlFor="level">Level</Label>
                <Input id="level" defaultValue={user.level} disabled />
              </div>
            )}

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>How can we reach you?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">
                <Mail className="inline-block mr-2 h-4 w-4" />
                Email Address
              </Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>

            <div>
              <Label htmlFor="phone">
                <Phone className="inline-block mr-2 h-4 w-4" />
                Phone Number
              </Label>
              <Input id="phone" type="tel" placeholder="+234 123 456 7890" />
            </div>

            <div>
              <Label htmlFor="address">
                <MapPin className="inline-block mr-2 h-4 w-4" />
                Address
              </Label>
              <Textarea
                id="address"
                placeholder="Enter your home address"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
            <CardDescription>Person to contact in case of emergency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="emergencyName">Full Name</Label>
                <Input id="emergencyName" placeholder="Contact person name" />
              </div>
              <div>
                <Label htmlFor="emergencyRelationship">Relationship</Label>
                <Input id="emergencyRelationship" placeholder="e.g., Parent, Guardian" />
              </div>
            </div>

            <div>
              <Label htmlFor="emergencyPhone">Phone Number</Label>
              <Input id="emergencyPhone" type="tel" placeholder="+234 123 456 7890" />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
