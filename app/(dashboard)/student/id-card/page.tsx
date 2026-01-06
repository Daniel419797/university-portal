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
import { useState, useEffect } from "react";
import { useApi } from "@/hooks/use-api";
import { studentService, type IDCard } from "@/lib/services";
import { getInitials } from "@/lib/utils";

type IDCardProfile = IDCard & {
  address?: string;
  dateOfBirth?: string;
  enrollmentDate?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
};

export default function StudentIDCardPage() {
  const [isFlipped, setIsFlipped] = useState(false);

  const { data: profile, isLoading, execute } = useApi<IDCardProfile>();

  useEffect(() => {
    execute(() => studentService.getIDCard(), {
      errorMessage: "Failed to load student ID card"
    });
  }, [execute]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading ID card...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Profile not found</p>
        </div>
      </DashboardLayout>
    );
  }

  // Map backend response fields to local student object
  // Map backend response fields to local student object, avoiding 'any'
  const backend = profile as IDCardProfile & {
    fullName?: string;
    student_id?: string;
    departmentCode?: string;
    issuedAt?: string;
    avatar?: string;
  };

  const student = {
    name: backend.fullName || backend.name || "-",
    matricNumber: backend.student_id || backend.matricNumber || "-",
    email: backend.email || "-",
    phone: backend.phone || "-",
    department: backend.department || backend.departmentCode || "-",
    faculty: backend.faculty || "-",
    level: backend.level || "-",
    bloodGroup: backend.bloodGroup || "-",
    address: backend.address || "-",
    dateOfBirth: backend.dateOfBirth || "-",
    enrollmentDate: backend.issuedAt || backend.enrollmentDate || "-",
    expiryDate: backend.expiryDate || "-",
    photo: backend.avatar || backend.photo || "",
    cardNumber:
      backend.cardNumber ||
      (backend.student_id
        ? `UNI${String(backend.student_id).replace(/\//g, "")}`
        : backend.matricNumber
        ? `UNI${String(backend.matricNumber).replace(/\//g, "")}`
        : "-"),
    emergencyContact: backend.emergencyContact || { name: "-", relationship: "-", phone: "-" },
    qrCode: backend.qrCode || "",
  };

  const handleDownload = () => {
    alert("ID card download will be implemented");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Student ID Card</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Your digital student identification</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={handlePrint} className="flex-1 sm:flex-none" size="sm">
              <Download className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button onClick={handleDownload} className="flex-1 sm:flex-none" size="sm">
              <Download className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Download</span>
              <span className="sm:hidden">Save</span>
            </Button>
          </div>
        </div>

        {/* Digital ID Card - Flip Card */}
        <div className="flip-card-container">
          <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
            <div className="flip-card-inner">
              {/* Front Side */}
              <div className="flip-card-front">
                <Card className="h-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white print:break-inside-avoid">
                  <CardContent className="p-4 sm:p-6 h-full flex flex-col">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 gap-2">
                      <div>
                        <h2 className="text-lg sm:text-2xl font-bold">UNIVERSITY PORTAL</h2>
                        <p className="text-blue-100 text-xs sm:text-sm">Student Identification Card</p>
                      </div>
                      <Shield className="h-8 w-8 sm:h-12 sm:w-12 text-blue-200" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1">
                      {/* Photo Section */}
                      <div className="flex justify-center sm:block shrink-0">
                        <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white">
                          <div className="bg-blue-400 h-full w-full flex items-center justify-center text-3xl sm:text-4xl font-bold">
                            {getInitials(student.name)}
                          </div>
                        </Avatar>
                      </div>

                      {/* Details Section */}
                      <div className="flex-1 space-y-2 sm:space-y-3">
                        <div className="text-center sm:text-left">
                          <h3 className="text-xl sm:text-2xl font-bold">{student.name}</h3>
                          <p className="text-blue-100 text-base sm:text-lg">{student.matricNumber}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                          <div>
                            <p className="text-blue-200">Department</p>
                            <p className="font-semibold truncate">{student.department}</p>
                          </div>
                          <div>
                            <p className="text-blue-200">Faculty</p>
                            <p className="font-semibold truncate">{student.faculty}</p>
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

                        <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
                          <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            Valid until: {new Date(student.expiryDate).toLocaleDateString()}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-3 sm:pt-4 border-t border-blue-400 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
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
              </div>

              {/* Back Side */}
              <div className="flip-card-back">
                <Card className="h-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 text-white print:break-inside-avoid">
                  <CardContent className="p-4 sm:p-6 h-full flex flex-col items-center justify-center">
                    <div className="text-center space-y-4">
                      <Shield className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto" />
                      <h3 className="text-lg sm:text-xl font-bold">Scan to Verify</h3>
                      <div className="bg-white p-4 sm:p-6 rounded-lg">
                        <QrCode className="h-32 w-32 sm:h-48 sm:w-48 text-gray-800 mx-auto" />
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300 max-w-xs">
                        This QR code contains your student verification information.
                        University staff can scan this code to instantly verify your identity and student status.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Flip Button */}
          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => setIsFlipped(!isFlipped)}>
              {isFlipped ? 'Show Front' : 'Flip Card'}
            </Button>
          </div>
        </div>

        {/* Student Information Card */}
        <Card className="print:break-inside-avoid">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium text-sm sm:text-base break-words">{student.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium text-sm sm:text-base">{student.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium text-sm sm:text-base">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Enrollment Date</p>
                  <p className="font-medium text-sm sm:text-base">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Address</p>
                  <p className="font-medium text-sm sm:text-base break-words">{student.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact Card */}
        <Card className="print:break-inside-avoid">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Name</p>
                <p className="font-medium text-sm sm:text-base break-words">{student.emergencyContact?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Relationship</p>
                <p className="font-medium text-sm sm:text-base">{student.emergencyContact?.relationship || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium text-sm sm:text-base">{student.emergencyContact?.phone || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Guidelines */}
        <Card className="bg-blue-50 border-blue-200 print:hidden">
          <CardContent className="p-3 sm:p-4">
            <div className="flex gap-3">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-2 text-xs sm:text-sm">
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

        .flip-card-container {
          perspective: 1000px;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .flip-card {
          position: relative;
          width: 100%;
          height: 400px;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card.flipped {
          transform: rotateY(180deg);
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </DashboardLayout>
  );
}