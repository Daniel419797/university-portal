// User Roles
export const USER_ROLES = {
  STUDENT: "student",
  LECTURER: "lecturer",
  ADMIN: "admin",
  HOD: "hod",
  BURSARY: "bursary",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// Payment Types
export const PAYMENT_TYPES = {
  TUITION: "tuition",
  HOSTEL: "hostel",
  LIBRARY: "library",
  MEDICAL: "medical",
  SPORTS: "sports",
  EXAM: "exam",
  LATE_REGISTRATION: "late_registration",
} as const;

// Course Levels
export const COURSE_LEVELS = ["100", "200", "300", "400", "500", "600"] as const;

// Semesters
export const SEMESTERS = {
  FIRST: "first",
  SECOND: "second",
} as const;

// Grade Scale
export const GRADE_SCALE = {
  A: { min: 70, max: 100, points: 5.0 },
  B: { min: 60, max: 69, points: 4.0 },
  C: { min: 50, max: 59, points: 3.0 },
  D: { min: 45, max: 49, points: 2.0 },
  E: { min: 40, max: 44, points: 1.0 },
  F: { min: 0, max: 39, points: 0.0 },
} as const;

// Assignment Status
export const ASSIGNMENT_STATUS = {
  PENDING: "pending",
  SUBMITTED: "submitted",
  GRADED: "graded",
  LATE: "late",
  OVERDUE: "overdue",
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
  PROCESSING: "processing",
} as const;

// Hostel Status
export const HOSTEL_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  ALLOCATED: "allocated",
} as const;

// Clearance Departments
export const CLEARANCE_DEPARTMENTS = [
  "Library",
  "Bursary",
  "Department",
  "HOD",
  "Student Affairs",
  "Security",
] as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
} as const;

// API Routes (prepared for backend integration)
export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
    VERIFY_EMAIL: "/api/auth/verify-email",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD: "/api/auth/reset-password",
    SETUP_2FA: "/api/auth/2fa/setup",
    VERIFY_2FA: "/api/auth/2fa/verify",
  },
  COURSES: {
    LIST: "/api/courses",
    DETAILS: "/api/courses/:id",
    ENROLL: "/api/courses/:id/enroll",
    MATERIALS: "/api/courses/:id/materials",
    STUDENTS: "/api/courses/:id/students",
  },
  ASSIGNMENTS: {
    LIST: "/api/assignments",
    DETAILS: "/api/assignments/:id",
    SUBMIT: "/api/assignments/:id/submit",
    SUBMISSIONS: "/api/assignments/:id/submissions",
  },
  PAYMENTS: {
    LIST: "/api/payments",
    CREATE: "/api/payments",
    VERIFY: "/api/payments/:id/verify",
    RECEIPTS: "/api/payments/:id/receipt",
  },
  HOSTEL: {
    APPLY: "/api/hostel/apply",
    STATUS: "/api/hostel/status",
    ALLOCATIONS: "/api/hostel/allocations",
    MAINTENANCE: "/api/hostel/maintenance",
  },
  RESULTS: {
    LIST: "/api/results",
    TRANSCRIPT: "/api/results/transcript",
    APPEAL: "/api/results/appeal",
  },
  NOTIFICATIONS: {
    LIST: "/api/notifications",
    MARK_READ: "/api/notifications/:id/read",
  },
  MESSAGES: {
    LIST: "/api/messages",
    SEND: "/api/messages",
    THREAD: "/api/messages/:id",
  },
} as const;

// Date Formats
export const DATE_FORMATS = {
  SHORT: "MMM dd, yyyy",
  LONG: "MMMM dd, yyyy",
  FULL: "EEEE, MMMM dd, yyyy",
  TIME: "hh:mm a",
  DATETIME: "MMM dd, yyyy hh:mm a",
} as const;
