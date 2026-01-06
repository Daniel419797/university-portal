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
import { Upload, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useApi } from "@/hooks/use-api";
import { userService, type UpdateProfileRequest } from "@/lib/services";
import { type User } from "@/lib/types";

export default function ProfileSettingsPage() {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const { isLoading, execute } = useApi<User>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileRequest & { bio?: string; address?: string; emergencyName?: string; emergencyRelationship?: string; emergencyPhone?: string }>({
    defaultValues: user ? {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      dateOfBirth: user.dateOfBirth || "",
      nationality: user.nationality || "",
      stateOfOrigin: user.stateOfOrigin || "",
      bloodGroup: user.bloodGroup || "",
      bio: "",
      emergencyName: "",
      emergencyRelationship: "",
      emergencyPhone: "",
    } : {},
  });

  if (!user) return null;

  const onSubmit = async (data: UpdateProfileRequest & { bio?: string; address?: string; emergencyName?: string; emergencyRelationship?: string; emergencyPhone?: string }) => {
    const profileData: UpdateProfileRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
      nationality: data.nationality,
      stateOfOrigin: data.stateOfOrigin,
      bloodGroup: data.bloodGroup,
      bio: data.bio,
      emergencyContact: data.emergencyName || data.emergencyRelationship || data.emergencyPhone ? {
        name: data.emergencyName,
        relationship: data.emergencyRelationship,
        phone: data.emergencyPhone,
      } : undefined,
    };

    await execute(
      () => userService.updateProfile(profileData),
      {
        successMessage: "Profile updated successfully",
        onSuccess: (updatedUser) => {
          setUser(updatedUser);
          reset({
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            phoneNumber: updatedUser.phoneNumber || "",
            address: updatedUser.address || "",
            dateOfBirth: updatedUser.dateOfBirth || "",
            nationality: updatedUser.nationality || "",
            stateOfOrigin: updatedUser.stateOfOrigin || "",
            bloodGroup: updatedUser.bloodGroup || "",
            bio: data.bio || "",
            emergencyName: data.emergencyName || "",
            emergencyRelationship: data.emergencyRelationship || "",
            emergencyPhone: data.emergencyPhone || "",
          });
        },
      }
    );
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    {...register("firstName", { required: "First name is required" })}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    {...register("lastName", { required: "Last name is required" })}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName.message}</p>
                  )}
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
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber")}
                  placeholder="+234 XXX XXX XXXX"
                />
              </div>

              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                />
              </div>

              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  {...register("nationality")}
                  placeholder="e.g., Nigerian"
                />
              </div>

              <div>
                <Label htmlFor="stateOfOrigin">State of Origin</Label>
                <Input
                  id="stateOfOrigin"
                  {...register("stateOfOrigin")}
                  placeholder="e.g., Lagos"
                />
              </div>

              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Input
                  id="bloodGroup"
                  {...register("bloodGroup")}
                  placeholder="e.g., O+"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  {...register("bio")}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isLoading} size="lg">
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>How can we reach you? (Email cannot be changed)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">
                <Mail className="inline-block mr-2 h-4 w-4" />
                Email Address
              </Label>
              <Input id="email" type="email" defaultValue={user.email} disabled />
              <p className="text-xs text-muted-foreground mt-1">
                Contact support to change your email address
              </p>
            </div>

            <div>
              <Label htmlFor="address">
                <MapPin className="inline-block mr-2 h-4 w-4" />
                Address
              </Label>
              <Textarea
                id="address"
                {...register("address")}
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
                <Input
                  id="emergencyName"
                  {...register("emergencyName")}
                  placeholder="Contact person name"
                />
              </div>
              <div>
                <Label htmlFor="emergencyRelationship">Relationship</Label>
                <Input
                  id="emergencyRelationship"
                  {...register("emergencyRelationship")}
                  placeholder="e.g., Parent, Guardian"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="emergencyPhone">Phone Number</Label>
              <Input
                id="emergencyPhone"
                {...register("emergencyPhone")}
                type="tel"
                placeholder="+234 123 456 7890"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
