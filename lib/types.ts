import { UserRole as UserRoleType } from "./constants";

// Re-export UserRole type
export type UserRole = UserRoleType;

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phoneNumber?: string;
  studentId?: string;
  department?: string;
  level?: string;
  address?: string;
  dateOfBirth?: string;
  nationality?: string;
  stateOfOrigin?: string;
  bloodGroup?: string;
  emergencyContact?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
  courseCode?: string;
  course?: string;
  title: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  passingMarks?: number;
  status: "pending" | "submitted" | "graded" | "late" | "overdue";
  submission?: AssignmentSubmission;
  submissions?: number;
  graded?: number;
  totalStudents?: number;
  submissionStatus?: "submitted" | "graded" | "pending";
  submittedDate?: string;
  instructions?: string[];
  requirements?: string[];
  lecturer?: string;
  grade?: number;
  feedback?: string;
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
  isLate?: boolean;
  studentName?: string;
  matricNumber?: string;
  status?: 'pending' | 'graded';
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
  courseCode?: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  questionsCount: number;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "completed" | "graded" | "closed";
  attempt?: QuizAttempt;
  totalStudents?: number;
  attemptedCount?: number;
  completedCount?: number;
  averageScore?: number;
  passingMarks?: number;
  attemptsAllowed?: number;
  questionTypes?: { type: string; count: number }[];
  instructions?: string[];
  highestScore?: number;
  lowestScore?: number;
  createdAt?: string;
  shuffleQuestions?: boolean;
  showResults?: boolean;
  attemptsUsed?: number;
  lecturer?: string;
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
  matricNumber?: string;
  studentName?: string;
  ca?: number;
  exam?: number;
  total?: number;
  status?: string;
  code?: string;
  title?: string;
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
  studentName: string;
  matricNumber: string;
  email: string;
  phone: string;
  department: string;
  level: string;
  session: string;
  semester: string;
  type: string;
  amount: number;
  paymentMethod: string;
  bank: string;
  reference: string;
  bankReference: string;
  proofOfPayment: string;
  status: "pending" | "verified" | "rejected" | "processing" | "completed" | "failed" | "cancelled";
  date: string;
  verifiedBy?: string;
  verifiedAt?: string;
  description?: string;
  paymentDate?: string;
  dueDate?: string;
  currency: string;
  transactionId?: string;
  paymentType?: string;
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
  transactionId?: string;
  department?: string;
  level?: string;
  paymentType?: string;
  paymentMethod?: string;
  processingFee?: number;
  total?: number;
  verifiedBy?: string;
  verifiedDate?: string;
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
  createdAt?: string;
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
  recipients?: number;
  budget?: number;
  disbursed?: number;
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

// Staff Types
export interface StaffMember {
  id: string;
  staffId?: string;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  department?: string;
  office?: string;
  joinDate?: string;
  status?: string;
  qualifications?: string[];
  specialization?: string[];
  courses?: {
    code: string;
    name: string;
    level: string;
    students: number;
  }[];
  students?: {
    name: string;
    matricNumber: string;
    level: string;
    project: string;
  }[];
  publications?: {
    title: string;
    journal: string;
    year: number;
  }[];
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
