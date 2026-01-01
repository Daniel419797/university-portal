import { UserRole } from "./constants";

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  studentId?: string;
  department?: string;
  level?: string;
}

// Course Types
export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  level: string;
  semester: string;
  department: string;
  lecturer: string;
  lecturerId: string;
  schedule?: CourseSchedule[];
  enrolled?: number;
  capacity?: number;
}

export interface CourseSchedule {
  day: string;
  startTime: string;
  endTime: string;
  venue: string;
}

export interface CourseMaterial {
  id: string;
  courseId: string;
  title: string;
  type: "pdf" | "video" | "slides" | "document";
  url: string;
  uploadedAt: string;
  size?: string;
}

// Assignment Types
export interface Assignment {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  status: "pending" | "submitted" | "graded" | "late" | "overdue";
  submission?: AssignmentSubmission;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  files: UploadedFile[];
  comment?: string;
  grade?: number;
  feedback?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

// Quiz Types
export interface Quiz {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  questionsCount: number;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "completed" | "graded";
  attempt?: QuizAttempt;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple_choice" | "true_false" | "short_answer";
  options?: string[];
  correctAnswer?: string;
  marks: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  startedAt: string;
  submittedAt?: string;
  score?: number;
  answers: { questionId: string; answer: string }[];
}

// Result Types
export interface Result {
  id: string;
  studentId: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  credits: number;
  score: number;
  grade: string;
  gradePoints: number;
  semester: string;
  session: string;
}

export interface Transcript {
  studentId: string;
  studentName: string;
  matricNumber: string;
  department: string;
  level: string;
  results: Result[];
  gpa: number;
  cgpa: number;
}

// Payment Types
export interface Payment {
  id: string;
  studentId: string;
  type: string;
  amount: number;
  status: "pending" | "verified" | "rejected" | "processing";
  reference: string;
  description: string;
  date: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface PaymentReceipt {
  id: string;
  paymentId: string;
  receiptNumber: string;
  studentName: string;
  matricNumber: string;
  amount: number;
  type: string;
  date: string;
  session: string;
}

// Hostel Types
export interface HostelApplication {
  id: string;
  studentId: string;
  session: string;
  roomType: "single" | "double" | "shared";
  specialNeeds?: string;
  status: "pending" | "approved" | "rejected" | "allocated";
  appliedAt: string;
  allocatedRoom?: RoomAllocation;
}

export interface RoomAllocation {
  id: string;
  hostelName: string;
  blockName: string;
  roomNumber: string;
  bedNumber: string;
  roommates?: Roommate[];
}

export interface Roommate {
  id: string;
  name: string;
  matricNumber: string;
  department: string;
  level: string;
  phone?: string;
}

export interface MaintenanceRequest {
  id: string;
  studentId: string;
  hostelName: string;
  roomNumber: string;
  issue: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "resolved";
  reportedAt: string;
  resolvedAt?: string;
}

// Clearance Types
export interface ClearanceStatus {
  id: string;
  studentId: string;
  session: string;
  departments: ClearanceDepartment[];
  overallStatus: "pending" | "partial" | "completed";
  appliedAt: string;
}

export interface ClearanceDepartment {
  name: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
  approvedAt?: string;
  comment?: string;
}

// Attendance Types
export interface AttendanceRecord {
  id: string;
  courseId: string;
  courseName: string;
  studentId: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  markedBy: string;
}

export interface CourseAttendance {
  courseId: string;
  courseName: string;
  totalClasses: number;
  attended: number;
  percentage: number;
  records: AttendanceRecord[];
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  subject: string;
  body: string;
  read: boolean;
  sentAt: string;
  replies?: Message[];
}

// Scholarship Types
export interface Scholarship {
  id: string;
  name: string;
  description: string;
  amount: number;
  eligibilityCriteria: string;
  deadline: string;
  status: "open" | "closed";
  slots: number;
  applicants: number;
}

export interface ScholarshipApplication {
  id: string;
  scholarshipId: string;
  scholarshipName: string;
  studentId: string;
  cgpa: number;
  essay: string;
  documents: UploadedFile[];
  status: "pending" | "under_review" | "approved" | "rejected";
  appliedAt: string;
}

// Analytics Types
export interface DashboardStats {
  totalStudents?: number;
  totalCourses?: number;
  totalPayments?: number;
  totalRevenue?: number;
  pendingAssignments?: number;
  upcomingQuizzes?: number;
  unreadMessages?: number;
  unreadNotifications?: number;
}

export interface AnalyticsData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

// Timetable Types
export interface TimetableEntry {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  day: string;
  startTime: string;
  endTime: string;
  venue: string;
  lecturer: string;
  type: "lecture" | "practical" | "tutorial";
}

// Admin Types
export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  changes?: Record<string, unknown>;
  ipAddress: string;
  timestamp: string;
}

export interface SystemSettings {
  siteName: string;
  siteEmail: string;
  currentSession: string;
  currentSemester: string;
  registrationOpen: boolean;
  paymentDeadline: string;
  lateRegistrationFee: number;
}
