import { api, PaginatedResponse } from './apiClient';
import apiClient from './apiClient';
import { Course, Assignment, Quiz, CourseMaterial, PaymentReceipt } from '@/lib/types';
import { Payment } from './adminService';

// Student service types
export interface UpcomingEvent {
  id: string;
  title: string;
  type: 'assignment' | 'quiz' | 'exam' | 'class' | 'meeting';
  date: string;
  time?: string;
  location?: string;
  courseCode?: string;
}

export interface DashboardStats {
  enrolledCourses: number;
  pendingAssignments: number;
  cgpa: number;
  paymentStatus: string;
  recentCourses: Course[];
  recentAssignments: Assignment[];
  upcomingEvents: UpcomingEvent[];
}

export interface EnrollmentRequest {
  courseIds: string[];
}

export interface SubmitAssignmentRequest {
  files: string[];
  comment?: string;
}

export interface AssignmentSubmissionDetails {
  id: string;
  assignmentId: string;
  studentId: string;
  files: Array<{
    id?: string;
    name: string;
    url: string;
    size: number;
    uploadedAt: string;
  }>;
  comment?: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
  totalMarks?: number;
}

export interface QuizAnswerRequest {
  attemptId: string;
  answers: Array<{
    questionId: string;
    answer: string;
  }>;
}

export interface QuizResult {
  attemptId: string;
  quizId: string;
  score: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  completedAt: string;
  timeTaken: number;
  answers: Array<{
    questionId: string;
    question: string;
    yourAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    marks: number;
  }>;
}

export interface Result {
  courseCode: string;
  courseTitle: string;
  score: number;
  grade: string;
  gradePoint: number;
  creditUnit: number;
  semester?: string;
  session?: string;
}

export interface ResultsResponse {
  results: Result[];
  gpa: number;
  cgpa: number;
}

export interface Transcript {
  studentInfo: {
    name: string;
    matricNumber: string;
    department: string;
    faculty: string;
    level: string;
  };
  semesters: Array<{
    semester: string;
    results: Result[];
    gpa: number;
  }>;
  cgpa: number;
  totalCredits: number;
  classification: string;
  generatedAt: string;
}

export interface Appeal {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  semester: string;
  reason: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewComment?: string;
}

export interface AttendanceRecord {
  courseCode: string;
  courseTitle: string;
  totalClasses: number;
  attended: number;
  percentage: number;
  status: string;
}

export interface PaymentRequest {
  amount: number;
  paymentType: string;
  paymentMethod: string;
  reference: string;
}

export interface InstallmentPlanRequest {
  totalAmount: number;
  numberOfInstallments: number;
  firstPaymentDate: string;
}

export interface PaymentDetails extends Payment {
  description: string;
  breakdown: Array<{
    item: string;
    amount: number;
  }>;
  receipt?: {
    receiptNumber: string;
    issueDate: string;
    downloadUrl: string;
  };
}

export interface InstallmentPlan {
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  installments: Array<{
    id: string;
    number: number;
    amount: number;
    dueDate: string;
    status: 'pending' | 'paid' | 'overdue';
    paidAt?: string;
  }>;
}

export interface HostelApplicationRequest {
  hostelId: string;
  roomPreference: string;
  specialRequirements?: string;
}

export interface HostelInfo {
  currentAllocation?: {
    hostelName: string;
    roomNumber: string;
    roomType: string;
    roommates: Array<{
      name: string;
      matricNumber: string;
      level: string;
      department?: string;
      phone?: string;
    }>;
    facilities: string[];
    checkInDate: string;
  };
  availableHostels: Array<{
    id: string;
    name: string;
    gender: 'Male' | 'Female';
    availableRooms: number;
    facilities: string[];
    fees: number;
  }>;
}

export interface HostelApplication {
  id: string;
  studentId: string;
  hostelId: string;
  hostelName: string;
  roomPreference: string;
  specialRequirements?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewComment?: string;
}

export interface ScholarshipApplicationRequest {
  scholarshipId: string;
  reason: string;
  documents: string[];
}

export interface Scholarship {
  id: string;
  name: string;
  description: string;
  amount: number;
  eligibilityCriteria: string[];
  deadline: string;
  status: 'open' | 'closed';
}

export interface ScholarshipApplication {
  id: string;
  scholarshipId: string;
  scholarshipName: string;
  reason: string;
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  awardedAmount?: number;
}

export interface ClearanceStatus {
  overallStatus: string;
  departments: Array<{
    name: string;
    status: 'pending' | 'approved' | 'rejected' | 'cleared';
    approvedBy?: string;
    approvedAt?: string;
    comment?: string;
  }>;
}

export interface DocumentRequest {
  documentType: string;
  purpose: string;
  deliveryMethod: string;
  urgency: string;
}

export interface Timetable {
  schedule: Array<{
    day: string;
    classes: Array<{
      courseCode: string;
      courseTitle: string;
      time: string;
      venue: string;
      lecturer: string;
    }>;
  }>;
}

export interface MessageRequest {
  recipientId: string;
  subject: string;
  message: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  recipientId: string;
  subject: string;
  message: string;
  isRead: boolean;
  sentAt: string;
  readAt?: string;
}

export interface MessageThread extends Message {
  replies: Array<{
    id: string;
    senderId: string;
    senderName: string;
    message: string;
    sentAt: string;
  }>;
}

export interface IDCard {
  name: string;
  matricNumber: string;
  email: string;
  phone: string;
  department: string;
  faculty: string;
  level: string;
  bloodGroup: string;
  photo: string;
  cardNumber: string;
  expiryDate: string;
  qrCode: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

// Student Service
export const studentService = {
  // Dashboard
  async getDashboard(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>('/students/dashboard');
    return response.data;
  },

  // Courses
  async getCourses(params?: { semester?: string; level?: string; page?: number; limit?: number }): Promise<PaginatedResponse<Course>> {
    const response = await api.get<PaginatedResponse<Course>>('/students/courses', { params });
    return response.data;
  },

  async getCourseDetails(courseId: string): Promise<Course> {
    const response = await api.get<Course>(`/students/courses/${courseId}`);
    return response.data;
  },

  async getCourseMaterials(courseId: string): Promise<CourseMaterial[]> {
    const response = await api.get<{ materials: CourseMaterial[] }>(`/students/courses/${courseId}/materials`);
    return response.data.materials;
  },

  async downloadMaterial(courseId: string, materialId: string): Promise<Blob> {
    const response = await apiClient.post(`/students/courses/${courseId}/materials/${materialId}/download`, {}, {
      responseType: 'blob',
    });
    return response.data as Blob;
  },

  // Enrollment
  async getAvailableCourses(): Promise<Course[]> {
    const response = await api.get<Course[]>('/students/enrollment/available-courses');
    return response.data;
  },

  async enrollCourses(data: EnrollmentRequest): Promise<void> {
    await api.post('/students/enrollment', data);
  },

  async dropCourse(courseId: string): Promise<void> {
    await api.delete(`/students/enrollment/${courseId}`);
  },

  // Assignments
  async getAssignments(params?: { status?: string; courseId?: string }): Promise<Assignment[]> {
    const response = await api.get<{ assignments: Assignment[] }>('/students/assignments', { params });
    return response.data.assignments;
  },

  async getAssignmentDetails(assignmentId: string): Promise<Assignment> {
    const response = await api.get<Assignment>(`/students/assignments/${assignmentId}`);
    return response.data;
  },

  async submitAssignment(assignmentId: string, data: SubmitAssignmentRequest): Promise<void> {
    await api.post(`/students/assignments/${assignmentId}/submit`, data);
  },

  async getSubmission(assignmentId: string): Promise<AssignmentSubmissionDetails> {
    const response = await api.get<AssignmentSubmissionDetails>(`/students/assignments/${assignmentId}/submission`);
    return response.data;
  },

  // Quizzes
  async getQuizzes(): Promise<Quiz[]> {
    const response = await api.get<Quiz[]>('/students/quizzes');
    const payload = response.data as unknown;

    // Backend may return multiple shapes: array of quizzes or object containing `quizzes` or `data`.
    if (Array.isArray(payload)) return payload as Quiz[];

    const obj = payload as { quizzes?: Quiz[]; data?: Quiz[] };
    if (Array.isArray(obj.quizzes)) return obj.quizzes;
    if (Array.isArray(obj.data)) return obj.data;

    // Fallback: attempt to extract from nested structures, or return empty array
    return [];
  },


  async getQuizDetails(quizId: string): Promise<Quiz> {
    const response = await api.get<Quiz>(`/students/quizzes/${quizId}`);
    return response.data;
  },

  async startQuiz(quizId: string): Promise<{ attemptId: string }> {
    const response = await api.post<{ attemptId: string }>(`/students/quizzes/${quizId}/start`);
    return response.data;
  },

  async submitQuiz(quizId: string, data: QuizAnswerRequest): Promise<void> {
    await api.post(`/students/quizzes/${quizId}/submit`, data);
  },

  async getMyQuizAttempt(quizId: string): Promise<QuizResult> {
    const response = await api.get<QuizResult>(`/students/quizzes/${quizId}/my-attempt`);
    return response.data;
  },

  async getQuizResults(quizId: string): Promise<QuizResult> {
    const response = await api.get<QuizResult>(`/students/quizzes/${quizId}/results`);
    return response.data;
  },

  // Results
  async getResults(params?: { semester?: string; level?: string }): Promise<ResultsResponse> {
    const response = await api.get<ResultsResponse>('/students/results', { params });
    return response.data;
  },

  async getTranscript(): Promise<Transcript> {
    const response = await api.get<Transcript>('/students/results/transcript');
    return response.data;
  },

  async submitAppeal(data: { courseId: string; semester: string; reason: string; description: string }): Promise<void> {
    await api.post('/students/results/appeal', data);
  },

  async getAppeals(): Promise<Appeal[]> {
    const response = await api.get<Appeal[]>('/students/results/appeals');
    return response.data;
  },

  // Attendance
  async getAttendance(): Promise<{ courses: AttendanceRecord[] }> {
    const response = await api.get<{ courses: AttendanceRecord[] }>('/students/attendance');
    return response.data;
  },

  // Payments
  async getPayments(): Promise<Payment[]> {
    const response = await api.get<Payment[]>('/students/payments');
    return response.data;
  },

  async getPaymentDetails(paymentId: string): Promise<PaymentDetails> {
    const response = await api.get<PaymentDetails>(`/students/payments/${paymentId}`);
    return response.data;
  },

  async getReceipt(paymentId: string): Promise<PaymentDetails['receipt']> {
    const response = await api.get<PaymentDetails['receipt']>(`/students/payments/${paymentId}/receipt`);
    return response.data;
  },

  async getPaymentReceipt(receiptId: string): Promise<PaymentReceipt> {
    const response = await api.get<PaymentReceipt>(`/students/payments/receipts/${receiptId}`);
    return response.data;
  },

  async makePayment(data: PaymentRequest): Promise<Payment> {
    const response = await api.post<Payment>('/students/payments', data);
    return response.data;
  },

  async getInstallments(): Promise<InstallmentPlan> {
    const response = await api.get<InstallmentPlan>('/students/payments/installments');
    return response.data;
  },

  async setupInstallments(data: InstallmentPlanRequest): Promise<void> {
    await api.post('/students/payments/installments', data);
  },

  // Hostel
  async getHostelInfo(): Promise<HostelInfo> {
    const response = await api.get<HostelInfo>('/students/hostel');
    return response.data;
  },

  async applyForHostel(data: HostelApplicationRequest): Promise<void> {
    await api.post('/students/hostel/apply', data);
  },

  async getHostelApplication(): Promise<HostelApplication> {
    const response = await api.get<HostelApplication>('/students/hostel/application');
    return response.data;
  },

  // Scholarships
  async getScholarships(): Promise<Scholarship[]> {
    const response = await api.get<Scholarship[]>('/students/scholarships');
    return response.data;
  },

  async applyForScholarship(data: ScholarshipApplicationRequest): Promise<void> {
    await api.post('/students/scholarships/apply', data);
  },

  async getScholarshipApplications(): Promise<ScholarshipApplication[]> {
    const response = await api.get<ScholarshipApplication[]>('/students/scholarships/applications');
    return response.data;
  },

  // Clearance
  async getClearanceStatus(): Promise<ClearanceStatus> {
    const response = await api.get<ClearanceStatus>('/students/clearance');
    return response.data;
  },

  async requestDocument(data: DocumentRequest): Promise<void> {
    await api.post('/students/clearance/documents/request', data);
  },

  // Timetable
  async getTimetable(): Promise<Timetable> {
    const response = await api.get<Timetable>('/students/timetable');
    return response.data;
  },

  // Messages
  async getMessages(): Promise<Message[]> {
    const response = await api.get<Message[]>('/students/messages');
    return response.data;
  },

  async sendMessage(data: MessageRequest): Promise<void> {
    await api.post('/students/messages', data);
  },

  async getMessageThread(messageId: string): Promise<MessageThread> {
    const response = await api.get<MessageThread>(`/students/messages/${messageId}`);
    return response.data;
  },

  // ID Card
  async getIDCard(): Promise<IDCard> {
    const response = await api.get<IDCard>('/students/id-card');
    return response.data;
  },

  // Notifications
  async getNotifications(params?: { filter?: string; type?: string; page?: number; limit?: number }): Promise<{ notifications: Notification[]; unreadCount: number; total: number }> {
    const response = await api.get<{ notifications: Notification[]; unreadCount: number; total: number }>('/students/notifications', { params });
    return response.data;
  },

  async markNotificationAsRead(notificationId: string): Promise<void> {
    await api.put(`/students/notifications/${notificationId}/read`);
  },

  async markAllNotificationsAsRead(): Promise<void> {
    await api.put('/students/notifications/read-all');
  },

  async deleteNotification(notificationId: string): Promise<void> {
    await api.delete(`/students/notifications/${notificationId}`);
  },
};

export default studentService;
