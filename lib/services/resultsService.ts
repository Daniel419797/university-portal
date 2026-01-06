import { api, PaginatedResponse } from './apiClient';

export interface ResultRecord {
  id: string;
  studentId: string;
  studentName: string;
  matricNumber: string;
  courseCode: string;
  courseTitle: string;
  score: number;
  grade: string;
  gradePoint: number;
  creditUnit: number;
  semester: string;
  level: string;
  status: 'draft' | 'submitted' | 'approved_hod' | 'approved_admin' | 'published';
  submittedAt?: string;
  approvedByHodAt?: string;
  approvedByAdminAt?: string;
  publishedAt?: string;
}

export interface CreateResultRequest {
  studentId: string;
  courseCode: string;
  score: number;
  semester: string;
  level: string;
}

export interface UpdateResultRequest {
  score?: number;
  grade?: string;
  status?: string;
}

export interface PublishResultsRequest {
  resultIds: string[];
}

export interface ApproveResultRequest {
  comments?: string;
}

export interface ResultSummary {
  studentId: string;
  studentName: string;
  matricNumber: string;
  semester: string;
  level: string;
  gpa: number;
  cgpa: number;
  totalCredits: number;
  results: ResultRecord[];
}

export interface Transcript {
  studentInfo: {
    name: string;
    matricNumber: string;
    department: string;
    faculty: string;
    level: string;
  };
  academicRecord: {
    semester: string;
    level: string;
    results: ResultRecord[];
    gpa: number;
    totalCredits: number;
  }[];
  summary: {
    cgpa: number;
    totalCredits: number;
    classification: string;
  };
}

// Results Service
export const resultsService = {
  /**
   * Get all results (admin)
   */
  async getResults(params?: {
    page?: number;
    limit?: number;
    studentId?: string;
    courseCode?: string;
    semester?: string;
    status?: string;
  }): Promise<PaginatedResponse<ResultRecord>> {
    const response = await api.get<PaginatedResponse<ResultRecord>>('/results', { params });
    return response.data;
  },

  /**
   * Create a result
   */
  async createResult(data: CreateResultRequest): Promise<ResultRecord> {
    const response = await api.post<ResultRecord>('/results', data);
    return response.data;
  },

  /**
   * Get result by ID
   */
  async getResultById(resultId: string): Promise<ResultRecord> {
    const response = await api.get<ResultRecord>(`/results/${resultId}`);
    return response.data;
  },

  /**
   * Update result
   */
  async updateResult(resultId: string, data: UpdateResultRequest): Promise<ResultRecord> {
    const response = await api.put<ResultRecord>(`/results/${resultId}`, data);
    return response.data;
  },

  /**
   * Delete result
   */
  async deleteResult(resultId: string): Promise<void> {
    await api.delete(`/results/${resultId}`);
  },

  /**
   * Publish results
   */
  async publishResults(data: PublishResultsRequest): Promise<void> {
    await api.put('/results/publish', data);
  },

  /**
   * Approve result by HOD
   */
  async approveResultByHod(resultId: string, data: ApproveResultRequest): Promise<void> {
    await api.put(`/results/${resultId}/approve-hod`, data);
  },

  /**
   * Approve result by admin
   */
  async approveResultByAdmin(resultId: string, data: ApproveResultRequest): Promise<void> {
    await api.put(`/results/${resultId}/approve-admin`, data);
  },

  /**
   * Get student transcript
   */
  async getTranscript(studentId: string): Promise<Transcript> {
    const response = await api.get<Transcript>(`/results/transcript/${studentId}`);
    return response.data;
  },

  /**
   * Get student results summary
   */
  async getResultSummary(studentId: string, semester?: string): Promise<ResultSummary> {
    const response = await api.get<ResultSummary>(`/results/summary/${studentId}`, {
      params: { semester }
    });
    return response.data;
  },
};

export default resultsService;