"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { 
  Download, QrCode, Calendar, Mail, Phone, MapPin, 
  CreditCard, Shield, Hash, Building2
} from "lucide-react";
import { useState } from "react";

export default function StudentIDCardPage() {
  const [showQR, setShowQR] = useState(false);

  // Mock student data
  const student = {
    name: "Sarah Williams",
    matricNumber: "CS/2021/001",
    email: "sarah.williams@university.edu",
    phone: "+234 801 234 5678",
    department: "Computer Science",
    faculty: "Science",
    level: "400 Level",
    bloodGroup: "O+",
    address: "123 University Road, Campus",
    dateOfBirth: "1999-05-15",
    enrollmentDate: "2021-09-01",
    expiryDate: "2025-08-31",
    photo: "/placeholder-avatar.jpg",
    cardNumber: "UNI2021CS001",
    emergencyContact: {
      name: "John Williams",
      phone: "+234 803 456 7890",
      relationship: "Father"
    }
  };

  const handleDownload = () => {
    // Placeholder for download functionality
    alert("ID card download will be implemented");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Student ID Card</h1>
            <p className="text-muted-foreground">Your digital student identification</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Download className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Digital ID Card - Front */}
        <Card className="overflow-hidden bg-linear-to-br from-blue-600 to-blue-800 text-white print:break-inside-avoid">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">UNIVERSITY PORTAL</h2>
                <p className="text-blue-100 text-sm">Student Identification Card</p>
              </div>
              <Shield className="h-12 w-12 text-blue-200" />
            </div>

            <div className="flex gap-6">
              {/* Photo Section */}
              <div className="shrink-0">
                <Avatar className="h-32 w-32 border-4 border-white">
                  <div className="bg-blue-400 h-full w-full flex items-center justify-center text-4xl font-bold">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </Avatar>
              </div>

              {/* Details Section */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-2xl font-bold">{student.name}</h3>
                  <p className="text-blue-100 text-lg">{student.matricNumber}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-blue-200">Department</p>
                    <p className="font-semibold">{student.department}</p>
                  </div>
                  <div>
                    <p className="text-blue-200">Faculty</p>
                    <p className="font-semibold">{student.faculty}</p>
                  </div>
                  <div>
                    <p className="text-blue-200">Level</p>
                    <p className="font-semibold">{student.level}</p>
                  </div>
                  <div>
                    <p className="text-blue-200">Blood Group</p>
                    <p className="font-semibold">{student.bloodGroup}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                    <Calendar className="h-3 w-3 mr-1" />
                    Valid until: {new Date(student.expiryDate).toLocaleDateString()}
                  </Badge>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="shrink-0">
                <div 
                  className="bg-white p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                  onClick={() => setShowQR(!showQR)}
                >
                  <QrCode className="h-24 w-24 text-blue-600" />
                </div>
                <p className="text-xs text-center mt-2 text-blue-100">Scan to verify</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-400 flex justify-between items-center text-xs">
              <div className="flex items-center gap-1">
                <Hash className="h-3 w-3" />
                <span>Card No: {student.cardNumber}</span>
              </div>
              <div>
                Issued: {new Date(student.enrollmentDate).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Information Card */}
        <Card className="print:break-inside-avoid">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{student.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{student.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Enrollment Date</p>
                  <p className="font-medium">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:col-span-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{student.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact Card */}
        <Card className="print:break-inside-avoid">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{student.emergencyContact.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Relationship</p>
                <p className="font-medium">{student.emergencyContact.relationship}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium">{student.emergencyContact.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Guidelines */}
        <Card className="bg-blue-50 border-blue-200 print:hidden">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-blue-900">ID Card Guidelines</p>
                <ul className="space-y-1 text-blue-800">
                  <li>• This digital ID card is valid for official university identification</li>
                  <li>• Always carry your ID card on campus</li>
                  <li>• Report lost or stolen cards immediately to the registrar&apos;s office</li>
                  <li>• The QR code can be scanned for instant verification</li>
                  <li>• Download and save a copy on your mobile device</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Modal/Details */}
        {showQR && (
          <Card className="border-blue-300 print:hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
                  <QrCode className="h-48 w-48 text-blue-600" />
                </div>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  This QR code contains your student verification information. 
                  University staff can scan this code to instantly verify your identity and student status.
                </p>
                <Button variant="outline" onClick={() => setShowQR(false)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:break-inside-avoid,
          .print\\:break-inside-avoid * {
            visibility: visible;
          }
          .print\\:break-inside-avoid {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
