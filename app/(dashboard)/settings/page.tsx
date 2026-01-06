"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useApi } from "@/hooks/use-api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Upload } from "lucide-react";
import { userService, UserSettings } from "@/lib/services";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { User } from "@/lib/types";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SettingsPage() {
  const { user, setUser } = useAuth();
  const { isLoading: isLoadingProfile, execute: executeProfile } = useApi<User>();
  const { isLoading: isLoadingPassword, execute: executePassword } = useApi<void>();
  const { isLoading: isLoadingSettings, execute: executeSettings } = useApi<UserSettings>();
  const [settings, setSettings] = useState<UserSettings | null>(null);

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: "",
    },
  });

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>();

  // Load settings
  useEffect(() => {
    const loadSettings = async () => {
      const result = await executeSettings(
        () => userService.getSettings(),
        { errorMessage: "Failed to load settings" }
      );
      if (result) {
        setSettings(result);
      }
    };
    loadSettings();
  }, [executeSettings]);

  // Update profile
  const onSubmitProfile = async (data: ProfileFormData) => {
    await executeProfile(
      () => userService.updateProfile(data),
      {
        successMessage: "Profile updated successfully",
        onSuccess: (updatedUser) => {
        setUser(updatedUser as User);
          resetProfile(data);
        },
      }
    );
  };

  // Change password
  const onSubmitPassword = async (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    await executePassword(
      () => userService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }),
      {
        successMessage: "Password changed successfully",
        onSuccess: () => resetPassword(),
      }
    );
  };

  // Update settings
  const handleSettingsChange = async (key: string, value: boolean | string) => {
    const updatedSettings = { ...settings, [key]: value } as UserSettings;
    setSettings(updatedSettings);
    
    await executeSettings(
      () => userService.updateSettings({ [key]: value }),
      {
        successMessage: "Settings updated",
        errorMessage: "Failed to update settings",
      }
    );
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.avatar} alt={user.firstName} />
                      <AvatarFallback className="text-lg">
                        {getInitials(`${user.firstName} ${user.lastName}`)}
                      </AvatarFallback>
                    </Avatar>
                    <Button type="button" variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        {...registerProfile("firstName", { required: "First name is required" })}
                      />
                      {profileErrors.firstName && (
                        <p className="text-sm text-destructive mt-1">{profileErrors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        {...registerProfile("lastName", { required: "Last name is required" })}
                      />
                      {profileErrors.lastName && (
                        <p className="text-sm text-destructive mt-1">{profileErrors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" value={user.email} disabled />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...registerProfile("phone")}
                      placeholder="+234 XXX XXX XXXX"
                    />
                  </div>

                  {user.studentId && (
                    <div>
                      <Label>Student/Staff ID</Label>
                      <Input value={user.studentId} disabled />
                    </div>
                  )}

                  {user.department && (
                    <div>
                      <Label>Department</Label>
                      <Input value={user.department} disabled />
                    </div>
                  )}

                  <Button type="submit" disabled={isLoadingProfile}>
                    {isLoadingProfile ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      {...registerPassword("currentPassword", { required: "Current password is required" })}
                    />
                    {passwordErrors.currentPassword && (
                      <p className="text-sm text-destructive mt-1">{passwordErrors.currentPassword.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      {...registerPassword("newPassword", {
                        required: "New password is required",
                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                      })}
                    />
                    {passwordErrors.newPassword && (
                      <p className="text-sm text-destructive mt-1">{passwordErrors.newPassword.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      {...registerPassword("confirmPassword", { required: "Please confirm your password" })}
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="text-sm text-destructive mt-1">{passwordErrors.confirmPassword.message}</p>
                    )}
                  </div>
                  <Button type="submit" disabled={isLoadingPassword}>
                    {isLoadingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">
                      Require a verification code in addition to your password
                    </p>
                  </div>
                  <Switch
                    checked={settings?.twoFactorEnabled || false}
                    onCheckedChange={(checked) => handleSettingsChange("twoFactorEnabled", checked)}
                    disabled={isLoadingSettings}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">Deactivate Account</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch
                    checked={settings?.emailNotifications !== false}
                    onCheckedChange={(checked) => handleSettingsChange("emailNotifications", checked)}
                    disabled={isLoadingSettings}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive important alerts via SMS
                    </p>
                  </div>
                  <Switch
                    checked={settings?.smsNotifications || false}
                    onCheckedChange={(checked) => handleSettingsChange("smsNotifications", checked)}
                    disabled={isLoadingSettings}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications in your browser
                    </p>
                  </div>
                  <Switch
                    checked={settings?.pushNotifications !== false}
                    onCheckedChange={(checked) => handleSettingsChange("pushNotifications", checked)}
                    disabled={isLoadingSettings}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
                <CardDescription>Manage notification categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Assignments & Deadlines</p>
                    <p className="text-sm text-muted-foreground">
                      New assignments and deadline reminders
                    </p>
                  </div>
                  <Switch
                    checked={settings?.notifyAssignments !== false}
                    onCheckedChange={(checked) => handleSettingsChange("notifyAssignments", checked)}
                    disabled={isLoadingSettings}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Results & Grades</p>
                    <p className="text-sm text-muted-foreground">
                      When new results are published
                    </p>
                  </div>
                  <Switch
                    checked={settings?.notifyResults !== false}
                    onCheckedChange={(checked) => handleSettingsChange("notifyResults", checked)}
                    disabled={isLoadingSettings}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Messages</p>
                    <p className="text-sm text-muted-foreground">
                      New messages from lecturers and administrators
                    </p>
                  </div>
                  <Switch
                    checked={settings?.notifyMessages !== false}
                    onCheckedChange={(checked) => handleSettingsChange("notifyMessages", checked)}
                    disabled={isLoadingSettings}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Payment Reminders</p>
                    <p className="text-sm text-muted-foreground">
                      Fee payment deadlines and confirmations
                    </p>
                  </div>
                  <Switch
                    checked={settings?.notifyPayments !== false}
                    onCheckedChange={(checked) => handleSettingsChange("notifyPayments", checked)}
                    disabled={isLoadingSettings}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Customize the appearance of the portal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Color Theme</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={settings?.theme || "system"}
                    onChange={(e) => handleSettingsChange("theme", e.target.value)}
                    disabled={isLoadingSettings}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Display</CardTitle>
                <CardDescription>Adjust display preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Show more content on screen
                    </p>
                  </div>
                  <Switch
                    checked={settings?.compactMode || false}
                    onCheckedChange={(checked) => handleSettingsChange("compactMode", checked)}
                    disabled={isLoadingSettings}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Animations</p>
                    <p className="text-sm text-muted-foreground">
                      Enable smooth transitions and effects
                    </p>
                  </div>
                  <Switch
                    checked={settings?.showAnimations !== false}
                    onCheckedChange={(checked) => handleSettingsChange("showAnimations", checked)}
                    disabled={isLoadingSettings}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
