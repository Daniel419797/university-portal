import { api } from './apiClient';
import { Scholarship, Payment, StaffMember } from '../types';

// HOD & Bursary service types
export interface Activity {
  id: string;
  type: string;
  description: string;
  user: string;
  timestamp: string;
}

export interface HODDashboardStats {
  departmentStats: {
    totalStudents: number;
    totalStaff: number;
    totalCourses: number;
    activeLecturers: number;
  };
  pendingApprovals: {
    results: number;
    clearances: number;
    courseRegistrations: number;
  };
  recentActivities: Activity[];
}

export interface PersonalInfo {
  id: string;
  name: string;
  matricNumber: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
}

export interface CourseResult {
  courseCode: string;
  courseTitle: string;
  grade: string;
  gradePoint: number;
  creditUnit: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
}

export interface CurrentCourse {
  courseCode: string;
  courseTitle: string;
  credits: number;
  lecturer: string;
}

export interface StudentAcademicProfile {
  personalInfo: PersonalInfo;
  academicInfo: {
    currentLevel: string;
    cgpa: number;
    classification: string;
    totalCredits: number;
  };
  semesterResults: Array<{
    semester: string;
    gpa: number;
    courses: CourseResult[];
  }>;
  currentCourses: CurrentCourse[];
  achievements: Achievement[];
}

export interface AssignCoursesRequest {
  courseIds: string[];
}

export interface ApproveResultsRequest {
  comment: string;
}

export interface RejectResultsRequest {
  reason: string;
}

export interface EnrollmentTrend {
  period: string;
  enrollments: number;
  graduations: number;
}

export interface PerformanceMetrics {
  averageGPA: number;
  passRate: number;
  excellenceRate: number;
  failureRate: number;
}

export interface GraduationRates {
  fourYearRate: number;
  fiveYearRate: number;
  totalGraduates: number;
  expectedGraduates: number;
}

export interface StaffProductivity {
  staffId: string;
  name: string;
  coursesAssigned: number;
  studentsSupervised: number;
  averageStudentPerformance: number;
}

export interface DepartmentAnalytics {
  enrollmentTrends: EnrollmentTrend[];
  performanceMetrics: PerformanceMetrics;
  graduationRates: GraduationRates;
  staffProductivity: StaffProductivity[];
}

export interface BursaryDashboardStats {
  totalPayments: number;
  verifiedPayments: number;
  pendingScholarships: number;
  totalRevenue: number;
}

export interface VerifyPaymentRequest {
  status: 'verified';
  comment: string;
}

export interface ApplicationInfo {
  id: string;
  scholarshipName: string;
  reason: string;
  appliedAt: string;
  status: string;
}

export interface StudentInfo {
  id: string;
  name: string;
  matricNumber: string;
  email: string;
  phone: string;
  level: string;
  department: string;
}

export interface PreviousScholarship {
  name: string;
  amount: number;
  year: string;
  provider: string;
}

export interface ScholarshipAchievement {
  title: string;
  description: string;
  date: string;
}

export interface ScholarshipDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  status: string;
}

export interface ScholarshipDetails {
  applicationInfo: ApplicationInfo;
  studentInfo: StudentInfo;
  financialInfo: {
    familyIncome: number;
    outstandingFees: number;
    previousScholarships: PreviousScholarship[];
    financialNeed: string;
    parentIncome: number;
    guardianOccupation: string;
    siblings: number;
  };
  academicInfo: {
    cgpa: number;
    achievements: ScholarshipAchievement[];
    academicYear: string;
  };
  scholarshipType: string;
  requestedAmount: number;
  documents: ScholarshipDocument[];
}

export interface ApproveScholarshipRequest {
  amount: number;
  duration: string;
  notes: string;
}

export interface RejectScholarshipRequest {
  reason: string;
}

export interface CreateScholarshipRequest {
  name: string;
  description: string;
  amount: number;
  eligibilityCriteria: string;
  deadline: string;
  slots: number;
}

export interface CreateBursaryPaymentRequest {
  studentId: string;
  amount: number;
  paymentType: string;
  paymentMethod: string;
  description?: string;
}

// HOD Service
export const hodService = {
  // Dashboard
  async getDashboard(): Promise<HODDashboardStats> {
    const response = await api.get<HODDashboardStats>('/hod/dashboard');
    return response.data;
  },

  // Students
  async getStudents(params?: { level?: string; status?: string; search?: string }): Promise<Array<{ id: string; name: string; matricNumber: string; level: string; cgpa: number; status: string }>> {
    const response = await api.get<Array<{ id: string; name: string; matricNumber: string; level: string; cgpa: number; status: string }>>('/hod/students', { params });
    return response.data;
  },

  async getStudentProfile(studentId: string): Promise<StudentAcademicProfile> {
    const response = await api.get<StudentAcademicProfile>(`/hod/students/${studentId}`);
    return response.data;
  },

  // Staff
  async getStaff(): Promise<Array<{ id: string; name: string; email: string; specialization: string; coursesAssigned: number }>> {
    const response = await api.get<Array<{ id: string; name: string; email: string; specialization: string; coursesAssigned: number }>>('/hod/staff');
    return response.data;
  },

  async getStaffProfile(staffId: string): Promise<StaffMember> {
    const response = await api.get<StaffMember>(`/hod/staff/${staffId}`);
    return response.data;
  },

  async assignCourses(staffId: string, data: AssignCoursesRequest): Promise<void> {
    await api.post(`/hod/staff/${staffId}/assign-courses`, data);
  },

  // Department
  async getDepartmentInfo(): Promise<{ id: string; name: string; hod: string; totalStudents: number; totalStaff: number; totalCourses: number; established: string }> {
    const response = await api.get<{ id: string; name: string; hod: string; totalStudents: number; totalStaff: number; totalCourses: number; established: string }>('/hod/department');
    return response.data;
  },

  async updateDepartmentInfo(data: { name?: string; description?: string; contactEmail?: string; contactPhone?: string }): Promise<{ id: string; name: string; updated: boolean }> {
    const response = await api.put<{ id: string; name: string; updated: boolean }>('/hod/department', data);
    return response.data;
  },

  async getDepartmentStatistics(): Promise<{ totalStudents: number; studentsByLevel: Record<string, number>; averageCGPA: number; graduationRate: number; employmentRate: number }> {
    const response = await api.get<{ totalStudents: number; studentsByLevel: Record<string, number>; averageCGPA: number; graduationRate: number; employmentRate: number }>('/hod/department/statistics');
    return response.data;
  },

  // Results
  async getPendingResults(): Promise<Array<{ id: string; courseCode: string; courseTitle: string; lecturer: string; semester: string; totalStudents: number; submittedAt: string }>> {
    const response = await api.get<Array<{ id: string; courseCode: string; courseTitle: string; lecturer: string; semester: string; totalStudents: number; submittedAt: string }>>('/hod/results/pending-approval');
    return response.data;
  },

  async getResultDetails(resultId: string): Promise<{ courseInfo: { code: string; title: string; lecturer: string }; semester: string; results: Array<{ studentId: string; studentName: string; matricNumber: string; score: number; grade: string }>; statistics: { averageScore: number; passRate: number; highestScore: number; lowestScore: number } }> {
    const response = await api.get<{ courseInfo: { code: string; title: string; lecturer: string }; semester: string; results: Array<{ studentId: string; studentName: string; matricNumber: string; score: number; grade: string }>; statistics: { averageScore: number; passRate: number; highestScore: number; lowestScore: number } }>(`/hod/results/${resultId}`);
    return response.data;
  },

  async approveResults(resultId: string, data: ApproveResultsRequest): Promise<void> {
    await api.post(`/hod/results/${resultId}/approve`, data);
  },

  async rejectResults(resultId: string, data: RejectResultsRequest): Promise<void> {
    await api.post(`/hod/results/${resultId}/reject`, data);
  },

  // Analytics
  async getAnalytics(): Promise<DepartmentAnalytics> {
    const response = await api.get<DepartmentAnalytics>('/hod/analytics');
    return response.data;
  },
};

// Bursary Service
export const bursaryService = {
  // Dashboard
  async getDashboard(): Promise<BursaryDashboardStats> {
    // Normalize API response shape to BursaryDashboardStats
    const response = await api.get<{ success?: boolean; message?: string; data?: any }>('/bursary/dashboard');
    const payload = response.data?.data ?? response.data ?? {};

    const totalPayments = Number(payload?.paymentStats?.total ?? payload?.totalPayments ?? 0);
    const verifiedPayments = Number(payload?.paymentStats?.verified ?? payload?.verifiedPayments ?? 0);
    const pendingScholarships = Number(payload?.scholarships?.pending ?? payload?.pendingScholarships ?? 0);
    const totalRevenue = Number(payload?.revenue?.total ?? payload?.totalRevenue ?? 0);

    return {
      totalPayments,
      verifiedPayments,
      pendingScholarships,
      totalRevenue,
    };
  },

  // Payments
  async getPayments(params?: { status?: string; dateFrom?: string; dateTo?: string; studentId?: string }): Promise<Array<{ id: string; studentId: string; studentName: string; amount: number; status: string; paymentDate: string; reference: string }>> {
    const response = await api.get<Array<{ id: string; studentId: string; studentName: string; amount: number; status: string; paymentDate: string; reference: string }>>('/bursary/payments', { params });
    return response.data;
  },

  async getPaymentDetails(paymentId: string): Promise<Payment> {
    const response = await api.get<Payment>(`/bursary/payments/${paymentId}`);
    return response.data;
  },

  async verifyPayment(paymentId: string, data: VerifyPaymentRequest): Promise<void> {
    await api.post(`/bursary/payments/${paymentId}/verify`, data);
  },

  async rejectPayment(paymentId: string, data: { reason: string }): Promise<void> {
    await api.post(`/bursary/payments/${paymentId}/reject`, data);
  },

  // Scholarships
  async getScholarshipPrograms(): Promise<Scholarship[]> {
    const response = await api.get<Scholarship[]>('/bursary/scholarship-programs');
    return response.data;
  },

  async getScholarships(): Promise<Array<{ id: string; studentId: string; studentName: string; scholarshipName: string; amountRequested: number; status: string; appliedAt: string }>> {
    const response = await api.get<Array<{ id: string; studentId: string; studentName: string; scholarshipName: string; amountRequested: number; status: string; appliedAt: string }>>('/bursary/scholarships');
    return response.data;
  },

  async getScholarshipDetails(scholarshipId: string): Promise<ScholarshipDetails> {
    const response = await api.get<ScholarshipDetails>(`/bursary/scholarships/${scholarshipId}`);
    return response.data;
  },

  async approveScholarship(scholarshipId: string, data: ApproveScholarshipRequest): Promise<void> {
    await api.post(`/bursary/scholarships/${scholarshipId}/approve`, data);
  },

  async rejectScholarship(scholarshipId: string, data: RejectScholarshipRequest): Promise<void> {
    await api.post(`/bursary/scholarships/${scholarshipId}/reject`, data);
  },

  async createScholarship(data: CreateScholarshipRequest): Promise<Scholarship> {
    const response = await api.post<Scholarship>('/bursary/scholarships/create', data);
    return response.data;
  },

  async createPayment(data: CreateBursaryPaymentRequest): Promise<{ id: string; reference: string; status: string }> {
    const response = await api.post<{ id: string; reference: string; status: string }>('/bursary/payments', data);
    return response.data;
  },

  // Reports
  async getReports(params?: { reportType?: string; period?: string; dateFrom?: string; dateTo?: string }): Promise<{ reportType: string; period: string; data: Array<Record<string, unknown>>; summary: { totalRevenue: number; totalPayments: number; pendingAmount: number } }> {
    const response = await api.get<{ reportType: string; period: string; data: Array<Record<string, unknown>>; summary: { totalRevenue: number; totalPayments: number; pendingAmount: number } }>('/bursary/reports', { params });
    return response.data;
  },

  async generateCustomReport(data: { reportType: string; startDate: string; endDate: string; filters?: Record<string, unknown> }): Promise<{ reportId: string; downloadUrl: string; generatedAt: string }> {
    const response = await api.post<{ reportId: string; downloadUrl: string; generatedAt: string }>('/bursary/reports/generate', data);
    return response.data;
  },
};

export default { hodService, bursaryService };
