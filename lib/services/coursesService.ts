import { api, PaginatedResponse } from './apiClient';
import { Course, CourseMaterial } from '@/lib/types';

export interface CreateCourseData {
  code: string;
  title: string;
  description: string;
  credits: number;
  level: string;
  semester: string;
  department: string;
  lecturerId: string;
}

export interface UpdateCourseData {
  code?: string;
  title?: string;
  description?: string;
  credits?: number;
  level?: string;
  semester?: string;
  department?: string;
  lecturerId?: string;
}

export interface CourseStudent {
  id: string;
  studentId: string;
  matricNumber: string;
  firstName: string;
  lastName: string;
  level: string;
  enrolledAt: string;
}

export interface UploadCourseMaterialRequest {
  title: string;
  description?: string;
  file: string; // base64
  fileName: string;
  fileType: string;
}

// Courses Service
export const coursesService = {
  /**
   * Get all courses
   */
  async getCourses(params?: {
    page?: number;
    limit?: number;
    department?: string;
    level?: string;
    semester?: string;
    lecturerId?: string;
  }): Promise<PaginatedResponse<Course>> {
    const response = await api.get<PaginatedResponse<Course>>('/courses', { params });
    return response.data;
  },

  /**
   * Create a course
   */
  async createCourse(data: CreateCourseData): Promise<Course> {
    const response = await api.post<Course>('/courses', data);
    return response.data;
  },

  /**
   * Get course by ID
   */
  async getCourseById(courseId: string): Promise<Course> {
    const response = await api.get<Course>(`/courses/${courseId}`);
    return response.data;
  },

  /**
   * Update course
   */
  async updateCourse(courseId: string, data: UpdateCourseData): Promise<Course> {
    const response = await api.put<Course>(`/courses/${courseId}`, data);
    return response.data;
  },

  /**
   * Delete course
   */
  async deleteCourse(courseId: string): Promise<void> {
    await api.delete(`/courses/${courseId}`);
  },

  /**
   * Enroll in course
   */
  async enrollInCourse(courseId: string): Promise<void> {
    await api.post(`/courses/${courseId}/enroll`);
  },

  /**
   * Unenroll from course
   */
  async unenrollFromCourse(courseId: string): Promise<void> {
    await api.delete(`/courses/${courseId}/unenroll`);
  },

  /**
   * Get course students
   */
  async getCourseStudents(courseId: string, params?: { page?: number; limit?: number }): Promise<PaginatedResponse<CourseStudent>> {
    const response = await api.get<PaginatedResponse<CourseStudent>>(`/courses/${courseId}/students`, { params });
    return response.data;
  },

  /**
   * Upload course material
   */
  async uploadMaterial(courseId: string, data: UploadCourseMaterialRequest): Promise<CourseMaterial> {
    const response = await api.post<CourseMaterial>(`/courses/${courseId}/materials`, data);
    return response.data;
  },

  /**
   * Get course materials
   */
  async getCourseMaterials(courseId: string): Promise<CourseMaterial[]> {
    const response = await api.get<CourseMaterial[]>(`/courses/${courseId}/materials`);
    return response.data;
  },

  /**
   * Download course material
   */
  async downloadMaterial(courseId: string, materialId: string): Promise<Blob> {
    const response = await api.post(`/courses/${courseId}/materials/${materialId}/download`, {}, {
      responseType: 'blob',
    });
    return response.data as Blob;
  },

  /**
   * Delete course material
   */
  async deleteMaterial(courseId: string, materialId: string): Promise<void> {
    await api.delete(`/courses/${courseId}/materials/${materialId}`);
  },
};

export default coursesService;