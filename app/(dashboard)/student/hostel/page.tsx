"use client";

import { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Home, Users, Bed } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import {
  studentService,
  type HostelInfo,
  type HostelApplication,
  type HostelApplicationRequest,
} from "@/lib/services";

export default function StudentHostelPage() {
  const { toast } = useToast();
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [form, setForm] = useState<HostelApplicationRequest>({
    hostelId: "",
    roomPreference: "single",
    specialRequirements: "",
  });

  const {
    data: hostelInfo,
    isLoading: isLoadingHostel,
    execute: loadHostelInfo,
  } = useApi<HostelInfo>();

  const {
    data: application,
    isLoading: isLoadingApplication,
    execute: loadApplication,
  } = useApi<HostelApplication>();

  const { isLoading: isSubmitting, execute: submitApplication } = useApi<HostelApplication>();

  useEffect(() => {
    loadHostelInfo(() => studentService.getHostelInfo(), {
      errorMessage: "Failed to load hostel info",
      onSuccess: (data) => {
        const hostelData = data as HostelInfo | null | undefined;
        const list = hostelData?.availableHostels ?? [];
        if (!form.hostelId && list.length) {
          setForm((prev) => ({ ...prev, hostelId: list[0].id }));
        }
      },
    });
    loadApplication(() => studentService.getHostelApplication(), {
      errorMessage: "Failed to load application",
    });
  }, [loadApplication, loadHostelInfo, form.hostelId]);

  const allocation = useMemo(() => hostelInfo?.currentAllocation, [hostelInfo]);
  const roommates = allocation?.roommates || [];
  type Roommate = NonNullable<HostelInfo["currentAllocation"]>["roommates"][number];
  type Hostel = HostelInfo["availableHostels"][number];

  const handleApply = async () => {
    if (!form.hostelId) {
      toast({ title: "Select a hostel", variant: "destructive" });
      return;
    }

    const applied = await submitApplication(async () => {
      await studentService.applyForHostel(form);
      const refreshed = await studentService.getHostelApplication();
      await loadHostelInfo(() => studentService.getHostelInfo());
      return refreshed;
    }, {
      successMessage: "Application submitted",
      errorMessage: "Could not submit application",
    });

    if (applied) {
      setShowApplicationDialog(false);
      await loadApplication(() => Promise.resolve(applied));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Hostel & Accommodation</h1>
          <p className="text-muted-foreground">Manage your hostel application and room</p>
        </div>

        {/* Current Application Status */}
        {isLoadingHostel && (
          <Card>
            <CardHeader>
              <CardTitle>Loading hostel information...</CardTitle>
              <CardDescription>Please wait while we fetch your allocation.</CardDescription>
            </CardHeader>
          </Card>
        )}

        {allocation && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Current Accommodation
              </CardTitle>
              <CardDescription>Your hostel allocation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status:</span>
                <Badge variant="secondary">
                  {application?.status || "allocated"}
                </Badge>
              </div>

              <div className="grid gap-3 md:grid-cols-2 border rounded-lg p-4 bg-muted/50">
                <div>
                  <span className="text-sm text-muted-foreground">Hostel</span>
                  <p className="font-medium">{allocation.hostelName}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Room Number</span>
                  <p className="font-medium">{allocation.roomNumber}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Room Type</span>
                  <p className="font-medium">{allocation.roomType}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Check-in</span>
                  <p className="font-medium">{allocation.checkInDate ? new Date(allocation.checkInDate).toLocaleDateString() : "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Roommates */}
        {roommates.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Roommates
              </CardTitle>
              <CardDescription>Your room companions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roommates.map((roommate: Roommate) => (
                  <div key={roommate.matricNumber} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{roommate.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {roommate.matricNumber} • {roommate.department} • Level {roommate.level}
                      </p>
                      {roommate.phone && (
                        <p className="text-sm text-muted-foreground">{roommate.phone}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Hostels */}
        {hostelInfo?.availableHostels?.length ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bed className="h-5 w-5" />
                    Available Hostels
                  </CardTitle>
                  <CardDescription>Select a hostel to apply</CardDescription>
                </div>
                <Button onClick={() => setShowApplicationDialog(true)} disabled={isLoadingHostel}>
                  Apply for Hostel
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {hostelInfo?.availableHostels?.map((hostel: Hostel) => (
                <div key={hostel.id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{hostel.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {hostel.gender} • {hostel.availableRooms} rooms available
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Facilities: {hostel.facilities.join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">₦{hostel.fees.toLocaleString()}</p>
                    <Button variant="outline" className="mt-2" onClick={() => {
                      setForm((prev) => ({ ...prev, hostelId: hostel.id }));
                      setShowApplicationDialog(true);
                    }}>
                      Choose
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No hostels available</CardTitle>
              <CardDescription>Check back later for new allocations.</CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Application Dialog */}
        <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for Hostel</DialogTitle>
              <DialogDescription>Select preferences and submit your request.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Hostel</Label>
                <Select
                  value={form.hostelId}
                  onChange={(e) => setForm((prev) => ({ ...prev, hostelId: e.target.value }))}
                >
                  <option value="">Select hostel</option>
                  {hostelInfo?.availableHostels?.map((hostel) => (
                    <option key={hostel.id} value={hostel.id}>
                      {hostel.name} ({hostel.gender})
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Room Preference</Label>
                <Select
                  value={form.roomPreference}
                  onChange={(e) => setForm((prev) => ({ ...prev, roomPreference: e.target.value }))}
                >
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="shared">Shared</option>
                </Select>
              </div>
              <div>
                <Label>Special Requirements</Label>
                <Textarea
                  rows={3}
                  value={form.specialRequirements || ""}
                  onChange={(e) => setForm((prev) => ({ ...prev, specialRequirements: e.target.value }))}
                  placeholder="Accessibility, medical, or other needs"
                />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={handleApply} disabled={isSubmitting || isLoadingApplication}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowApplicationDialog(false)}>
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
