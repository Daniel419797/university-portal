import { api } from './apiClient';

// Admin service types
export interface Activity {
  id: string;
  type: string;
  description: string;
  user: string;
  timestamp: string;
}

export interface AdminDashboardStats {
  users: {
    total: number;
    students: number;
    lecturers: number;
    admins: number;
    active: number;
  };
  courses: {
    total: number;
    active: number;
  };
  enrollments: {
    total: number;
    active: number;
  };
  payments: {
    verified: {
      count: number;
      amount: number;
    };
    pending: {
      count: number;
      amount: number;
    };
  };
  hostels: {
    total: number;
    applications: number;
    approved: number;
  };
  academic: {
    assignments: number;
    quizzes: number;
    submissions: number;
  };
  recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    created_at: string;
  }>;
  recentPayments: Payment[];
  unreadNotifications: number;
  recentActivities?: Activity[];
} 

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'lecturer' | 'admin' | 'hod' | 'bursary';
  department?: string;
  level?: string;
  matricNumber?: string;
}

export interface BulkUploadRequest {
  role: string;
  csvData: string; // base64
}

export interface CreateCourseRequest {
  code: string;
  title: string;
  description: string;
  credits: number;
  level: string;
  semester: string;
  department: string;
  lecturerId: string;
}

export interface MaintenanceRequest {
  id: string;
  issue: string;
  reportedBy: string;
  reportedDate: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: string;
  description: string;
  resolvedDate?: string;
}

export interface RoomDetails {
  hostelId: string;
  hostelName: string;
  blockName: string;
  roomNumber: string;
  floor: string;
  type: string;
  capacity: number;
  occupied: number;
  status: string;
  price: string;
  hasAC: boolean;
  hasWardrobe: boolean;
  hasBathroom: boolean;
  occupants: Array<{
    id: string;
    name: string;
    matricNumber: string;
    phone: string;
    bedNumber: string;
    checkInDate: string;
    status: string;
  }>;
  maintenanceRequests: MaintenanceRequest[];
}

export interface HostelInfo {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  capacity: number;
  location: string;
  facilities: string[];
  warden: string;
}

export interface RoomInfo {
  number: string;
  type: string;
  capacity: number;
  floor: string;
  occupied: number;
}

export interface Occupant {
  id: string;
  name: string;
  matricNumber: string;
  level: string;
  checkInDate: string;
}

export interface MaintenanceRequest {
  id: string;
  issue: string;
  status: 'pending' | 'in-progress' | 'resolved';
  reportedBy: string;
  reportedAt: string;
  resolvedAt?: string;
}

export interface HostelDetails {
  hostelInfo: HostelInfo;
  occupancy: {
    total: number;
    occupied: number;
    available: number;
    percentage: number;
  };
  rooms: RoomInfo[];
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  matricNumber: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  paymentMethod: string;
  reference: string;
  transactionId?: string;
  paymentDate?: string;
  dueDate: string;
  description: string;
  semester: string;
  level: string;
}

export interface PaymentStats {
  totalPayments: number;
  totalAmount: number;
  pendingPayments: number;
  completedPayments: number;
  failedPayments: number;
  monthlyRevenue: Array<{
    month: string;
    amount: number;
    count: number;
  }>;
  revenueByType: Record<string, number>;
}

export interface InitializePaymentRequest {
  studentId: string;
  amount: number;
  description: string;
  semester: string;
  level: string;
  dueDate: string;
}

export interface PaymentReceipt {
  id: string;
  paymentId: string;
  receiptNumber: string;
  studentInfo: {
    name: string;
    matricNumber: string;
    department: string;
    level: string;
  };
  paymentDetails: {
    amount: number;
    description: string;
    paymentDate: string;
    reference: string;
  };
  generatedAt: string;
}

export interface CreateHostelRequest {
  name: string;
  gender: 'Male' | 'Female';
  capacity: number;
  location: string;
  facilities: string[];
}

export interface ClearanceData {
  student: {
    id: string;
    name: string;
    matricNumber: string;
    department: string;
    level: string;
    session: string;
    email: string;
    phone: string;
  };
  clearanceItems: Array<{
    id: string;
    department: string;
    status: string;
    approvedBy: string | null;
    approvedDate: string | null;
    comments: string | null;
  }>;
}

export interface RoomOccupancyDetails {
  roomInfo: {
    number: string;
    type: string;
    capacity: number;
    floor: string;
    facilities: string[];
  };
  occupants: Occupant[];
  maintenanceRequests: MaintenanceRequest[];
}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  targetAudience: 'All Users' | 'Students Only' | 'Lecturers Only' | 'Staff Only';
  priority: 'Low' | 'Medium' | 'High';
  expiryDate?: string;
}

export interface Transaction {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  type: string;
  status: string;
  date: string;
}

export interface PaymentMethod {
  method: string;
  count: number;
  totalAmount: number;
}

export interface FinancialOverview {
  revenue: {
    total: number;
    paid: number;
    pending: number;
  };
  recentTransactions: Transaction[];
  paymentMethods: Record<string, PaymentMethod>;
}

export interface GenerateInvoiceRequest {
  studentId: string;
  amount: number;
  description: string;
  dueDate: string;
}

export interface SystemSettings {
  academicYear: string;
  currentSemester: string;
  registrationOpen: boolean;
  paymentDeadline: string;
}

export interface UserAnalytics {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  usersByRole: Record<string, number>;
}

export interface CourseAnalytics {
  totalCourses: number;
  activeCourses: number;
  averageEnrollment: number;
  popularCourses: Array<{ code: string; title: string; enrollments: number }>;
}

export interface FinancialAnalytics {
  totalRevenue: number;
  collectionRate: number;
  outstandingAmount: number;
  monthlyTrend: Array<{ month: string; revenue: number }>;
}

export interface PerformanceAnalytics {
  averageCGPA: number;
  passRate: number;
  graduationRate: number;
  departmentPerformance: Array<{ department: string; averageGPA: number }>;
}

export interface TrendData {
  enrollmentTrend: Array<{ period: string; count: number }>;
  performanceTrend: Array<{ period: string; averageGPA: number }>;
  revenueTrend: Array<{ period: string; amount: number }>;
}

export interface AdminAnalytics {
  users?: UserAnalytics;
  courses?: CourseAnalytics;
  financials?: FinancialAnalytics;
  performance?: PerformanceAnalytics;
  trends?: TrendData;

  // Simplified fields returned by some backend endpoints
  totals?: {
    users?: number;
    students?: number;
    lecturers?: number;
    courses?: number;
  };

  finance?: {
    pendingPayments?: number;
    publishedResults?: number;
  };

  hostels?: {
    capacity?: number;
    occupied?: number;
    occupancyRate?: number; // fraction (0-1) or percentage (0-100)
  };
}

// Admin Service
export const adminService = {
  // Dashboard
  async getDashboard(): Promise<AdminDashboardStats> {
    const response = await api.get<AdminDashboardStats>('/admin/dashboard');
    return response.data;
  },

  // Users
  async getUsers(params?: { role?: string; department?: string; status?: string; search?: string }): Promise<Array<{ id: string; name: string; email: string; role: string; department?: string; status: string; createdAt: string }>> {
    // The backend may return either a raw array or a paginated object with a `users` or `data` field.
    const response = await api.get<{ users?: Array<{ id: string; name: string; email: string; role: string; department?: string; status: string; createdAt: string }>
      } | Array<{ id: string; name: string; email: string; role: string; department?: string; status: string; createdAt: string }>>('/admin/users', { params });

    const data = response.data as unknown;

    if (Array.isArray(data)) {
      return normalizeUsers(data as Array<RawUser>);
    }

    const asObj = data as { users?: Array<RawUser>; data?: Array<RawUser> };

    if (Array.isArray(asObj.users)) return normalizeUsers(asObj.users);
    if (Array.isArray(asObj.data)) return normalizeUsers(asObj.data);

    // Fallback to empty array
    return [];

    // Raw user type from backend
    type RawUser = {
      id: string;
      name?: string;
      firstName?: string;
      lastName?: string;
      email: string;
      role: string;
      department?: string;
      status?: string;
      isActive?: boolean;
      createdAt: string;
      matricNumber?: string;
      studentId?: string;
      level?: string;
    };

    // Helper to normalize user objects to include `name`
    function normalizeUsers(arr: Array<RawUser>) {
      return arr.map((u) => {
        const name = u.name ?? `${(u.firstName || "").trim()} ${(u.lastName || "").trim()}`.trim();
        return {
          id: u.id,
          name: name || "",
          email: u.email,
          role: u.role,
          department: u.department,
          status: u.status ?? (u.isActive ? 'active' : 'inactive'),
          createdAt: u.createdAt,
          // preserve possible student fields
          matricNumber: u.matricNumber ?? u.studentId ?? null,
          level: u.level ?? null,
        };
      });
    }
  },

  async createUser(data: CreateUserRequest): Promise<{ id: string; email: string; role: string }> {
    const response = await api.post<{ id: string; email: string; role: string }>('/admin/users', data);
    return response.data;
  },

  async getUserDetails(userId: string): Promise<{ id: string; firstName: string; lastName: string; email: string; phone?: string; role: string; department?: string; status: string; createdAt: string }> {
    const response = await api.get<{ id: string; firstName: string; lastName: string; email: string; phone?: string; role: string; department?: string; status: string; createdAt: string }>(`/admin/users/${userId}`);
    return response.data;
  },

  async updateUser(userId: string, data: Partial<CreateUserRequest>): Promise<{ id: string; email: string; role: string }> {
    const response = await api.put<{ id: string; email: string; role: string }>(`/admin/users/${userId}`, data);
    return response.data;
  },

  async deactivateUser(userId: string): Promise<void> {
    await api.delete(`/admin/users/${userId}`);
  },

  async bulkUploadUsers(data: BulkUploadRequest): Promise<void> {
    await api.post('/admin/users/bulk-upload', data);
  },

  // Courses
  async getCourses(): Promise<Array<{ id: string; code: string; title: string; credits: number; level: string; semester: string; department: string; lecturerName: string; enrolledStudents: number }>> {
    const response = await api.get<Array<{ id: string; code: string; title: string; credits: number; level: string; semester: string; department: string; lecturerName: string; enrolledStudents: number }>>('/admin/courses');
    return response.data;
  },

  async createCourse(data: CreateCourseRequest): Promise<{ id: string; code: string; title: string }> {
    const response = await api.post<{ id: string; code: string; title: string }>('/admin/courses', data);
    return response.data;
  },

  async getCourseDetails(courseId: string): Promise<{ id: string; code: string; title: string; description: string; credits: number; level: string; semester: string; department: string; lecturerId: string; lecturerName: string; enrolledStudents: number }> {
    const response = await api.get<{ id: string; code: string; title: string; description: string; credits: number; level: string; semester: string; department: string; lecturerId: string; lecturerName: string; enrolledStudents: number }>(`/admin/courses/${courseId}`);
    return response.data;
  },

  async updateCourse(courseId: string, data: Partial<CreateCourseRequest>): Promise<{ id: string; code: string; title: string }> {
    const response = await api.put<{ id: string; code: string; title: string }>(`/admin/courses/${courseId}`, data);
    return response.data;
  },

  async deleteCourse(courseId: string): Promise<void> {
    await api.delete(`/admin/courses/${courseId}`);
  },

  // Hostel
  async getHostels(): Promise<Array<{ id: string; name: string; gender: 'Male' | 'Female'; capacity: number; occupied: number; location: string }>> {
    const response = await api.get<Array<{ id: string; name: string; gender: 'Male' | 'Female'; capacity: number; occupied: number; location: string }>>('/admin/hostel');
    return response.data;
  },

  async createHostel(data: CreateHostelRequest): Promise<{ id: string; name: string; capacity: number }> {
    const response = await api.post<{ id: string; name: string; capacity: number }>('/admin/hostel', data);
    return response.data;
  },

  async getHostelDetails(hostelId: string): Promise<HostelDetails> {
    const response = await api.get<HostelDetails>(`/admin/hostel/${hostelId}`);
    return response.data;
  },

  async getRoomDetails(hostelId: string, roomNumber: string): Promise<RoomDetails> {
    const response = await api.get<RoomDetails>(`/admin/hostel/${hostelId}/rooms/${roomNumber}`);
    return response.data;
  },

  async updateRoom(hostelId: string, roomNumber: string, data: { type?: string; capacity?: number; facilities?: string[]; status?: string }): Promise<void> {
    await api.put(`/admin/hostel/${hostelId}/rooms/${roomNumber}`, data);
  },

  async assignStudentToRoom(hostelId: string, roomNumber: string, data: { studentId: string }): Promise<void> {
    await api.post(`/admin/hostel/${hostelId}/rooms/${roomNumber}/assign`, data);
  },

  async evictStudent(hostelId: string, roomNumber: string, data: { studentId: string }): Promise<void> {
    await api.post(`/admin/hostel/${hostelId}/rooms/${roomNumber}/evict`, data);
  },

  async getHostelApplications(): Promise<Array<{ id: string; studentId: string; studentName: string; hostelName: string; status: string; appliedAt: string }>> {
    const response = await api.get<Array<{ id: string; studentId: string; studentName: string; hostelName: string; status: string; appliedAt: string }>>('/admin/hostel/applications');
    return response.data;
  },

  async getApplicationDetails(applicationId: string): Promise<{ id: string; studentId: string; studentName: string; hostelId: string; hostelName: string; roomPreference: string; specialRequirements?: string; status: string; appliedAt: string }> {
    const response = await api.get<{ id: string; studentId: string; studentName: string; hostelId: string; hostelName: string; roomPreference: string; specialRequirements?: string; status: string; appliedAt: string }>(`/admin/hostel/applications/${applicationId}`);
    return response.data;
  },

  async approveApplication(applicationId: string, data: { hostelId: string; roomNumber: string }): Promise<void> {
    await api.post(`/admin/hostel/applications/${applicationId}/approve`, data);
  },

  async rejectApplication(applicationId: string, data: { reason: string }): Promise<void> {
    await api.post(`/admin/hostel/applications/${applicationId}/reject`, data);
  },

  // Clearance
  async getClearanceRequests(): Promise<Array<{ id: string; studentId: string; studentName: string; documentType: string; status: string; requestedAt: string }>> {
    const response = await api.get<Array<{ id: string; studentId: string; studentName: string; documentType: string; status: string; requestedAt: string }>>('/admin/clearance');
    return response.data;
  },

  async getClearanceDetails(clearanceId: string): Promise<{ id: string; studentId: string; studentName: string; documentType: string; purpose: string; status: string; requestedAt: string }> {
    const response = await api.get<{ id: string; studentId: string; studentName: string; documentType: string; purpose: string; status: string; requestedAt: string }>(`/admin/clearance/${clearanceId}`);
    return response.data;
  },

  async approveClearance(clearanceId: string, data: { comment: string }): Promise<void> {
    await api.post(`/admin/clearance/${clearanceId}/approve`, data);
  },

  async rejectClearance(clearanceId: string, data: { reason: string }): Promise<void> {
    await api.post(`/admin/clearance/${clearanceId}/reject`, data);
  },

  async addDepartmentToClearance(clearanceId: string, data: { departmentId: string; departmentName: string }): Promise<void> {
    await api.post(`/admin/clearance/${clearanceId}/departments`, data);
  },

  // Announcements
  async getAnnouncements(): Promise<Array<{ id: string; title: string; content: string; targetAudience: string; priority: string; createdAt: string; expiryDate?: string }>> {
    const response = await api.get<Array<{ id: string; title: string; content: string; targetAudience: string; priority: string; createdAt: string; expiryDate?: string }>>('/admin/announcements');
    return response.data;
  },

  async createAnnouncement(data: CreateAnnouncementRequest): Promise<{ id: string; title: string; createdAt: string }> {
    const response = await api.post<{ id: string; title: string; createdAt: string }>('/admin/announcements', data);
    return response.data;
  },

  async updateAnnouncement(announcementId: string, data: Partial<CreateAnnouncementRequest>): Promise<{ id: string; title: string }> {
    const response = await api.put<{ id: string; title: string }>(`/admin/announcements/${announcementId}`, data);
    return response.data;
  },

  async deleteAnnouncement(announcementId: string): Promise<void> {
    await api.delete(`/admin/announcements/${announcementId}`);
  },

  // Financial
  async getFinancialOverview(): Promise<FinancialOverview> {
    const response = await api.get<FinancialOverview>('/admin/financial');
    return response.data;
  },

  async generateInvoice(data: GenerateInvoiceRequest): Promise<{ id: string; invoiceNumber: string; amount: number; dueDate: string }> {
    const response = await api.post<{ id: string; invoiceNumber: string; amount: number; dueDate: string }>('/admin/financial/generate-invoice', data);
    return response.data;
  },

  async sendPaymentReminder(data: { studentId: string; message: string }): Promise<void> {
    await api.post('/admin/financial/send-reminder', data);
  },

  async getFinancialReports(params?: { reportType?: string; startDate?: string; endDate?: string; department?: string }): Promise<{ reportType: string; data: Array<Record<string, unknown>>; summary: Record<string, number> }> {
    const response = await api.get<{ reportType: string; data: Array<Record<string, unknown>>; summary: Record<string, number> }>('/admin/financial/reports', { params });
    return response.data;
  },

  async getRevenueAnalytics(): Promise<{ totalRevenue: number; monthlyRevenue: Array<{ month: string; amount: number }>; revenueByType: Record<string, number> }> {
    const response = await api.get<{ totalRevenue: number; monthlyRevenue: Array<{ month: string; amount: number }>; revenueByType: Record<string, number> }>('/admin/financial/analytics');
    return response.data;
  },

  // Analytics
  async getAnalytics(): Promise<AdminAnalytics> {
    const response = await api.get<AdminAnalytics>('/admin/analytics');
    return response.data;
  },

  // Settings
  async getSettings(): Promise<SystemSettings> {
    const response = await api.get<SystemSettings>('/admin/settings');
    return response.data;
  },

  async updateSettings(data: Partial<SystemSettings>): Promise<SystemSettings> {
    const response = await api.put<SystemSettings>('/admin/settings', data);
    return response.data;
  },

  // Payments
  async initializePayment(data: InitializePaymentRequest): Promise<{ paymentId: string; reference: string; amount: number }> {
    const response = await api.post<{ paymentId: string; reference: string; amount: number }>('/payments/initialize', data);
    return response.data;
  },

  async verifyPayment(reference: string): Promise<Payment> {
    const response = await api.get<Payment>(`/payments/verify/${reference}`);
    return response.data;
  },

  async getPayments(params?: {
    page?: number;
    limit?: number;
    status?: string;
    studentId?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<{ payments: Payment[]; total: number; page: number; limit: number }> {
    const response = await api.get<{ payments: Payment[]; total: number; page: number; limit: number }>('/payments', { params });
    return response.data;
  },

  async getPaymentById(paymentId: string): Promise<Payment> {
    const response = await api.get<Payment>(`/payments/${paymentId}`);
    return response.data;
  },

  async verifyPaymentById(paymentId: string, data?: { transactionId?: string; notes?: string }): Promise<Payment> {
    const response = await api.put<Payment>(`/payments/${paymentId}/verify`, data);
    return response.data;
  },

  async rejectPayment(paymentId: string, data?: { reason?: string; notes?: string }): Promise<Payment> {
    const response = await api.put<Payment>(`/payments/${paymentId}/reject`, data);
    return response.data;
  },

  async getPaymentReceipt(paymentId: string): Promise<PaymentReceipt> {
    const response = await api.get<PaymentReceipt>(`/payments/${paymentId}/receipt`);
    return response.data;
  },

  async getPaymentStats(): Promise<PaymentStats> {
    const response = await api.get<PaymentStats>('/payments/stats/overview');
    return response.data;
  },

  async getClearance(clearanceId: string): Promise<ClearanceData> {
    const response = await api.get<ClearanceData>(`/clearance/${clearanceId}`);
    return response.data;
  },

  async getHostelRoom(hostelId: string, roomNumber: string): Promise<RoomDetails> {
    const response = await api.get<RoomDetails>(`/hostels/${hostelId}/rooms/${roomNumber}`);
    return response.data;
  },
};

export default adminService;
