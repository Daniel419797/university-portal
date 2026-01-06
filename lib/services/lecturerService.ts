import { api } from './apiClient';
import { Course, Assignment, Quiz, Result, Message, AssignmentSubmission } from '@/lib/types';

// Lecturer service types
export interface UpcomingClass {
  id: string;
  courseCode: string;
  courseTitle: string;
  time: string;
  venue: string;
  date: string;
  type: 'lecture' | 'practical' | 'tutorial';
}

export interface LecturerDashboardStats {
  assignedCourses: number;
  totalStudents: number;
  pendingSubmissions: number;
  pendingQuizzes: number;
  recentCourses: StudentCourse[];
  recentAssignments: Assignment[];
  unreadNotifications: number;
  upcomingClasses: UpcomingClass[];
}

export interface StudentPerformance {
  id: string;
  name: string;
  matricNumber: string;
  email: string;
  attendance: number;
  totalClasses: number;
  assignmentScore: number;
  quizScore: number;
  midtermScore: number;
}

export interface CourseStudentsResponse {
  courseCode: string;
  courseTitle: string;
  students: StudentPerformance[];
  stats: {
    totalStudents: number;
    goodAttendance: number;
    averageScore: number;
    passRate: number;
  };
}

export interface UploadMaterialRequest {
  title: string;
  type: 'pdf' | 'video' | 'slides' | 'document';
  file: string; // base64
}

export interface StudentCourse {
  courseCode?: string;
  courseTitle?: string;
  code?: string;
  title?: string;
  grade?: string;
  semester?: string;
  score?: number;
}

export interface StudentAttendanceRecord {
  courseCode?: string;
  courseTitle?: string;
  course?: string;
  percentage?: number;
  totalClasses?: number;
  attended?: number;
  present?: number;
  total?: number;
}

export interface Guardian {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  address: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  matricNumber: string;
  email: string;
  phone: string;
  department: string;
  level: string;
  cgpa: number;
  courses: StudentCourse[];
  attendance: StudentAttendanceRecord[];
  guardian: Guardian;
  faculty?: string;
  status?: string;
  avatar?: string;
  dateOfBirth?: string;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
}

export interface CreateAssignmentRequest {
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  attachments?: string[];
}

export interface SubmissionFile {
  name: string;
  url: string;
  size: number;
  type: string;
}

export interface SubmissionsResponse {
  submissions: AssignmentSubmission[];
  stats: {
    total: number;
    submitted: number;
    pending: number;
    graded: number;
  };
}

export interface GradeSubmissionRequest {
  grade: number;
  feedback: string;
}

export interface CreateQuizRequest {
  courseId: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  startDate: string;
  endDate: string;
  questions: Array<{
    question: string;
    type: 'multiple-choice' | 'true-false' | 'short-answer';
    options?: string[];
    correctAnswer: string;
    marks: number;
  }>;
}

export interface QuizResponse {
  studentId: string;
  studentName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  completedAt: string;
}

export interface QuizResponsesData {
  responses: QuizResponse[];
  stats: {
    totalAttempts: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
  };
}

export interface RecordAttendanceRequest {
  courseId: string;
  date: string;
  attendees: string[];
  absentees: string[];
}

export interface ImportResultsRequest {
  courseId: string;
  semester: string;
  csvData: string; // base64
}

export interface SubmitResultsRequest {
  courseId: string;
  semester: string;
  results: Array<{
    studentId: string;
    assignment: number;
    quiz: number;
    midterm: number;
    exam: number;
    total: number;
    grade: string;
  }>;
}

export interface CourseOverview {
  courseCode: string;
  courseTitle: string;
  totalStudents: number;
  averageScore: number;
  passRate: number;
}

export interface PerformanceMetrics {
  totalStudents: number;
  averageGPA: number;
  topPerformers: number;
  needsSupport: number;
}

export interface AttendanceTrend {
  date: string;
  averageAttendance: number;
  totalClasses: number;
}

export interface AssignmentStats {
  totalAssignments: number;
  pendingGrading: number;
  averageScore: number;
  onTimeSubmissions: number;
}

export interface LecturerAnalytics {
  coursesOverview: CourseOverview[];
  studentPerformance: PerformanceMetrics;
  attendanceTrends: AttendanceTrend[];
  assignmentStats: AssignmentStats;
}

// Lecturer Service
export const lecturerService = {
  // Dashboard
    async getDashboard(): Promise<LecturerDashboardStats> {
      const response = await api.get<LecturerDashboardStats>('/lecturers/dashboard');
      const data = response.data as LecturerDashboardStats | undefined;
      return {
        assignedCourses: data?.assignedCourses ?? 0,
        totalStudents: data?.totalStudents ?? 0,
        pendingSubmissions: data?.pendingSubmissions ?? 0,
        pendingQuizzes: data?.pendingQuizzes ?? 0,
        recentCourses: data?.recentCourses ?? [],
        recentAssignments: data?.recentAssignments ?? [],
        unreadNotifications: data?.unreadNotifications ?? 0,
        upcomingClasses: []
      };
    },

  // Courses
  async getCourses(): Promise<Course[]> {
    const response = await api.get<Course[]>('/lecturers/courses');
    return response.data;
  },

  async getCourseStudents(courseId: string): Promise<CourseStudentsResponse> {
    const response = await api.get<CourseStudentsResponse>(`/lecturers/courses/${courseId}/students`);
    return response.data;
  },

  async uploadMaterial(courseId: string, data: UploadMaterialRequest): Promise<void> {
    await api.post(`/lecturers/courses/${courseId}/materials`, data);
  },

  async deleteMaterial(courseId: string, materialId: string): Promise<void> {
    await api.delete(`/lecturers/courses/${courseId}/materials/${materialId}`);
  },

  // Students
  async getStudents(): Promise<StudentProfile[]> {
    const response = await api.get<StudentProfile[]>('/lecturers/students');
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  },

  async getStudentProfile(studentId: string): Promise<StudentProfile> {
    const response = await api.get<StudentProfile>(`/lecturers/students/${studentId}`);
    return response.data;
  },

  // Assignments
  async getAssignments(): Promise<Assignment[]> {
    const response = await api.get<Assignment[]>('/lecturers/assignments');
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  },

  async createAssignment(data: CreateAssignmentRequest): Promise<Assignment> {
    const response = await api.post<Assignment>('/lecturers/assignments', data);
    return response.data;
  },

  async getAssignmentDetails(assignmentId: string): Promise<Assignment> {
    const response = await api.get<Assignment>(`/lecturers/assignments/${assignmentId}`);
    return response.data;
  },

  async updateAssignment(assignmentId: string, data: Partial<CreateAssignmentRequest>): Promise<Assignment> {
    const response = await api.put<Assignment>(`/lecturers/assignments/${assignmentId}`, data);
    return response.data;
  },

  async deleteAssignment(assignmentId: string): Promise<void> {
    await api.delete(`/lecturers/assignments/${assignmentId}`);
  },

  async getSubmissions(assignmentId: string): Promise<SubmissionsResponse> {
    const response = await api.get<SubmissionsResponse>(`/lecturers/assignments/${assignmentId}/submissions`);
    return response.data;
  },

  async getSubmission(assignmentId: string, studentId: string): Promise<AssignmentSubmission> {
    const response = await api.get<AssignmentSubmission>(`/lecturers/assignments/${assignmentId}/submissions/${studentId}`);
    return response.data;
  },

  async gradeSubmission(assignmentId: string, submissionId: string, data: GradeSubmissionRequest): Promise<void> {
    await api.post(`/lecturers/assignments/${assignmentId}/submissions/${submissionId}/grade`, data);
  },

  // Attendance
  async getAttendance(): Promise<{ courses: Array<{ courseCode: string; courseTitle: string; totalClasses: number; sessions: Array<{ date: string; attendees: number }> }> }> {
    const response = await api.get<{ courses: Array<{ courseCode: string; courseTitle: string; totalClasses: number; sessions: Array<{ date: string; attendees: number }> }> }>('/lecturers/attendance');
    return response.data;
  },

  async recordAttendance(data: { courseId: string; date: string; attendees: string[]; absentees: string[] }): Promise<void> {
    await api.post('/lecturers/attendance', data);
  },

  // Quizzes
  async getQuizzes(): Promise<Quiz[]> {
    const response = await api.get<Quiz[]>('/lecturers/quizzes');
    const payload = response.data as unknown;

    if (Array.isArray(payload)) return payload as Quiz[];

    const obj = payload as { quizzes?: Quiz[]; data?: Quiz[] };
    if (Array.isArray(obj.quizzes)) return obj.quizzes;
    if (Array.isArray(obj.data)) return obj.data;

    return [];
  },

  async createQuiz(data: CreateQuizRequest): Promise<Quiz> {
    const response = await api.post<Quiz>('/lecturers/quizzes', data);
    return response.data;
  },

  async getQuizDetails(quizId: string): Promise<Quiz> {
    const response = await api.get<Quiz>(`/lecturers/quizzes/${quizId}`);
    return response.data;
  },

  async updateQuiz(quizId: string, data: Partial<CreateQuizRequest>): Promise<Quiz> {
    const response = await api.put<Quiz>(`/lecturers/quizzes/${quizId}`, data);
    return response.data;
  },

  async deleteQuiz(quizId: string): Promise<void> {
    await api.delete(`/lecturers/quizzes/${quizId}`);
  },

  async getQuizResponses(quizId: string): Promise<QuizResponsesData> {
    const response = await api.get<QuizResponsesData>(`/lecturers/quizzes/${quizId}/responses`);
    return response.data;
  },

  async getQuizAttempts(quizId: string): Promise<Array<{ studentId: string; studentName: string; attemptId: string; score: number; completedAt: string; timeTaken: number }>> {
    const response = await api.get<Array<{ studentId: string; studentName: string; attemptId: string; score: number; completedAt: string; timeTaken: number }>>(`/lecturers/quizzes/${quizId}/attempts`);
    return response.data;
  },

  // Analytics
  async getAnalytics(): Promise<LecturerAnalytics> {
    const response = await api.get<LecturerAnalytics>('/lecturers/analytics');
    return response.data;
  },
  async getResults(selectedCourse?: string): Promise<Result[]> {
    const params = selectedCourse ? { courseId: selectedCourse } : {};
    const response = await api.get<Result[]>('/lecturers/results', { params });
    return response.data;
  },

  async importResults(data: ImportResultsRequest): Promise<void> {
    await api.post('/lecturers/results/import', data);
  },

  async submitResults(data: SubmitResultsRequest): Promise<void> {
    await api.post('/lecturers/results', data);
  },

  async updateResult(resultId: string, data: { assignment?: number; quiz?: number; midterm?: number; exam?: number; total?: number; grade?: string }): Promise<void> {
    await api.put(`/lecturers/results/${resultId}`, data);
  },

  // Messages
  async getMessages(): Promise<Message[]> {
    const response = await api.get<Message[]>('/lecturers/messages');
    return response.data;
  },

  async sendMessage(data: { recipientId: string; subject: string; message: string }): Promise<void> {
    await api.post('/lecturers/messages', data);
  },

  async getMessageThread(messageId: string): Promise<{ id: string; subject: string; messages: Array<{ senderId: string; senderName: string; message: string; sentAt: string }> }> {
    const response = await api.get<{ id: string; subject: string; messages: Array<{ senderId: string; senderName: string; message: string; sentAt: string }> }>(`/lecturers/messages/${messageId}`);
    return response.data;
  },
};

export default lecturerService;
