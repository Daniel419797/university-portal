// Export all services from a single entry point
export { api, setAuthToken, getAuthToken, removeAuthToken } from './apiClient';
export type { ApiResponse, ApiError, PaginatedResponse } from './apiClient';

export { authService } from './authService';
export type { LoginRequest, LoginResponse, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest, VerifyEmailRequest, ResendVerificationRequest } from './authService';

export { userService } from './userService';
export type { UpdateProfileRequest, ChangePasswordRequest, DeactivateAccountRequest, UserSettings, UserStats, SearchUsersRequest, UpdateUserRequest, ChangeUserPasswordRequest, ActivateUserRequest, ChangeUserRoleRequest } from './userService';

export { studentService } from './studentService';
export type {
  DashboardStats,
  EnrollmentRequest,
  SubmitAssignmentRequest,
  AssignmentSubmissionDetails,
  QuizAnswerRequest,
  Result,
  ResultsResponse,
  AttendanceRecord,
  PaymentRequest,
  InstallmentPlanRequest,
  HostelApplicationRequest,
  HostelInfo,
  HostelApplication,
  Scholarship,
  ScholarshipApplication,
  ScholarshipApplicationRequest,
  ClearanceStatus,
  DocumentRequest,
  Timetable,
  MessageRequest,
  IDCard,
  Notification,
} from './studentService';

export { lecturerService } from './lecturerService';
export type {
  LecturerDashboardStats,
  StudentPerformance,
  CourseStudentsResponse,
  UploadMaterialRequest,
  StudentProfile,
  CreateAssignmentRequest,
  SubmissionsResponse,
  GradeSubmissionRequest,
  CreateQuizRequest,
  QuizResponse,
  QuizResponsesData,
  RecordAttendanceRequest,
  ImportResultsRequest,
  SubmitResultsRequest,
  LecturerAnalytics,
} from './lecturerService';

export { adminService } from './adminService';
export type {
  AdminDashboardStats,
  CreateUserRequest,
  BulkUploadRequest,
  CreateCourseRequest,
  CreateHostelRequest,
  HostelDetails,
  RoomDetails,
  CreateAnnouncementRequest,
  FinancialOverview,
  GenerateInvoiceRequest,
  SystemSettings,
  AdminAnalytics,
  Payment,
  PaymentStats,
  InitializePaymentRequest,
  PaymentReceipt,
} from './adminService';

export { resultsService } from './resultsService';
export type {
  ResultRecord,
  CreateResultRequest,
  UpdateResultRequest,
  PublishResultsRequest,
  ApproveResultRequest,
  ResultSummary,
  Transcript,
} from './resultsService';

export { hodService, bursaryService } from './hodBursaryService';
export type {
  HODDashboardStats,
  StudentAcademicProfile,
  AssignCoursesRequest,
  ApproveResultsRequest,
  RejectResultsRequest,
  DepartmentAnalytics,
  BursaryDashboardStats,
  VerifyPaymentRequest,
  ScholarshipDetails,
  ApproveScholarshipRequest,
  RejectScholarshipRequest,
  CreateScholarshipRequest,
  CreateBursaryPaymentRequest,
} from './hodBursaryService';

export { fileService, notificationService } from './sharedService';
export type { UploadFileRequest, UploadFileResponse } from './sharedService';

export { coursesService } from './coursesService';
export type { CreateCourseData, UpdateCourseData, CourseStudent, UploadCourseMaterialRequest } from './coursesService';

export { default as hostelService } from './hostelService';
export type { Hostel, HostelApplicationSubmitRequest, HostelApplicationResponse, HostelStats, ApproveApplicationRequest, RejectApplicationRequest, AllocateRoomRequest } from './hostelService';

export { default as messageService } from './messageService';
export type { SendMessageRequest } from './messageService';
