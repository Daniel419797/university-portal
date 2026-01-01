"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, FileText, AlertCircle, CheckCircle } from "lucide-react";

export default function BulkUploadPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Downloading Template",
      description: "CSV template is being downloaded.",
    });
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a CSV file to upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Upload Successful",
        description: "45 users have been created successfully. 3 records were skipped due to errors.",
      });

      setTimeout(() => {
        router.push("/admin/users");
      }, 2000);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Bulk Upload Users</h1>
          <p className="text-muted-foreground">Import multiple users from CSV file</p>
        </div>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Upload Instructions
            </CardTitle>
            <CardDescription>Follow these steps to bulk upload users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-2 list-decimal list-inside text-sm text-muted-foreground">
              <li>Download the CSV template file</li>
              <li>Fill in the user details in the template (do not modify column headers)</li>
              <li>Save the file as CSV format</li>
              <li>Upload the completed CSV file using the form below</li>
              <li>Review any errors and fix them before final import</li>
            </ol>

            <Button variant="outline" onClick={handleDownloadTemplate}>
              <Download className="mr-2 h-4 w-4" />
              Download CSV Template
            </Button>
          </CardContent>
        </Card>

        {/* CSV Format Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>CSV Format Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium mb-2">Required Columns:</p>
                <p className="text-muted-foreground">
                  firstName, lastName, email, role, department
                </p>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium mb-2">Optional Columns:</p>
                <p className="text-muted-foreground">
                  phone, matricNumber, staffId, level
                </p>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium mb-2">Valid Roles:</p>
                <p className="text-muted-foreground">
                  student, lecturer, admin, hod, bursary
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex gap-2 text-blue-800 dark:text-blue-200">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Important Notes</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Email addresses must be unique</li>
                      <li>For students, matricNumber is required</li>
                      <li>For staff (lecturer/hod), staffId is required</li>
                      <li>Department must match existing departments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload CSV File
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csvFile">Select CSV File</Label>
              <Input
                id="csvFile"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                disabled={uploading}
              />
              {file && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button onClick={handleUpload} disabled={!file || uploading} className="flex-1">
                {uploading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload and Import
                  </>
                )}
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sample Data Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Sample CSV Data</CardTitle>
            <CardDescription>Example of how your CSV should be formatted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border">
                <thead className="bg-muted">
                  <tr>
                    <th className="border p-2">firstName</th>
                    <th className="border p-2">lastName</th>
                    <th className="border p-2">email</th>
                    <th className="border p-2">role</th>
                    <th className="border p-2">department</th>
                    <th className="border p-2">matricNumber</th>
                    <th className="border p-2">level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">John</td>
                    <td className="border p-2">Doe</td>
                    <td className="border p-2">john.doe@university.edu</td>
                    <td className="border p-2">student</td>
                    <td className="border p-2">Computer Science</td>
                    <td className="border p-2">CS/2022/001</td>
                    <td className="border p-2">400</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Jane</td>
                    <td className="border p-2">Smith</td>
                    <td className="border p-2">jane.smith@university.edu</td>
                    <td className="border p-2">lecturer</td>
                    <td className="border p-2">Computer Science</td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
