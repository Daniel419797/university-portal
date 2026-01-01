import { Course, User, Assignment, Payment, HostelApplication, Result, Message, Quiz, Scholarship } from "@/lib/types";
import { USER_ROLES } from "@/lib/constants";

// Mock Users
export const mockStudents: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: `student-${i + 1}`,
  email: `student${i + 1}@university.edu`,
  firstName: ["John", "Jane", "Michael", "Sarah", "David", "Emily"][i % 6],
  lastName: ["Doe", "Smith", "Johnson", "Williams", "Brown", "Davis"][i % 6],
  role: USER_ROLES.STUDENT,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=student${i + 1}`,
  studentId: `STU/2023/${String(i + 1).padStart(3, "0")}`,
  department: ["Computer Science", "Engineering", "Medicine", "Law", "Business"][i % 5],
  level: ["100", "200", "300", "400"][i % 4],
}));

export const mockLecturers: User[] = Array.from({ length: 10 }, (_, i) => ({
  id: `lecturer-${i + 1}`,
  email: `lecturer${i + 1}@university.edu`,
  firstName: ["Dr. Michael", "Prof. Sarah", "Dr. David", "Prof. Emily", "Dr. James"][i % 5],
  lastName: ["Anderson", "Thompson", "Martinez", "Garcia", "Rodriguez"][i % 5],
  role: USER_ROLES.LECTURER,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=lecturer${i + 1}`,
  department: ["Computer Science", "Engineering", "Medicine", "Law", "Business"][i % 5],
}));

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: "1",
    code: "CSC 401",
    title: "Data Structures and Algorithms",
    description: "Advanced data structures, algorithm design, and analysis techniques",
    credits: 3,
    level: "400",
    semester: "first",
    department: "Computer Science",
    lecturer: "Dr. Michael Anderson",
    lecturerId: "lecturer-1",
    schedule: [
      { day: "Monday", startTime: "10:00", endTime: "12:00", venue: "LT1" },
      { day: "Wednesday", startTime: "14:00", endTime: "16:00", venue: "Lab 3" },
    ],
    enrolled: 45,
    capacity: 60,
  },
  {
    id: "2",
    code: "CSC 301",
    title: "Database Management Systems",
    description: "Database design, SQL, and advanced database concepts",
    credits: 3,
    level: "300",
    semester: "first",
    department: "Computer Science",
    lecturer: "Prof. Sarah Thompson",
    lecturerId: "lecturer-2",
    schedule: [
      { day: "Tuesday", startTime: "10:00", endTime: "12:00", venue: "LT2" },
      { day: "Thursday", startTime: "14:00", endTime: "16:00", venue: "Lab 1" },
    ],
    enrolled: 52,
    capacity: 60,
  },
  {
    id: "3",
    code: "CSC 201",
    title: "Object-Oriented Programming",
    description: "Principles of OOP using Java and design patterns",
    credits: 4,
    level: "200",
    semester: "first",
    department: "Computer Science",
    lecturer: "Dr. David Martinez",
    lecturerId: "lecturer-3",
    schedule: [
      { day: "Monday", startTime: "14:00", endTime: "17:00", venue: "Lab 2" },
    ],
    enrolled: 58,
    capacity: 60,
  },
  {
    id: "4",
    code: "ENG 401",
    title: "Advanced Thermodynamics",
    description: "Advanced concepts in thermodynamics and heat transfer",
    credits: 3,
    level: "400",
    semester: "first",
    department: "Engineering",
    lecturer: "Prof. Emily Garcia",
    lecturerId: "lecturer-4",
    schedule: [
      { day: "Tuesday", startTime: "08:00", endTime: "10:00", venue: "ENG Hall" },
    ],
    enrolled: 40,
    capacity: 50,
  },
  {
    id: "5",
    code: "MED 501",
    title: "Clinical Medicine I",
    description: "Introduction to clinical practice and patient care",
    credits: 5,
    level: "500",
    semester: "first",
    department: "Medicine",
    lecturer: "Dr. James Rodriguez",
    lecturerId: "lecturer-5",
    schedule: [
      { day: "Monday", startTime: "08:00", endTime: "13:00", venue: "Teaching Hospital" },
    ],
    enrolled: 35,
    capacity: 40,
  },
];

// Mock Assignments
export const mockAssignments: Assignment[] = [
  {
    id: "1",
    courseId: "1",
    courseName: "CSC 401 - Data Structures",
    title: "Implement Binary Search Tree",
    description: "Create a complete implementation of a binary search tree with insertion, deletion, and traversal methods.",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    totalMarks: 20,
    status: "pending",
  },
  {
    id: "2",
    courseId: "1",
    courseName: "CSC 401 - Data Structures",
    title: "Graph Algorithms",
    description: "Implement Dijkstra's shortest path and BFS/DFS algorithms",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    totalMarks: 25,
    status: "pending",
  },
  {
    id: "3",
    courseId: "2",
    courseName: "CSC 301 - Database Systems",
    title: "Database Design Project",
    description: "Design and implement a complete database system for a library management system",
    dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    totalMarks: 30,
    status: "pending",
  },
  {
    id: "4",
    courseId: "3",
    courseName: "CSC 201 - OOP",
    title: "Design Pattern Implementation",
    description: "Implement Factory and Singleton patterns in Java",
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    totalMarks: 15,
    status: "overdue",
  },
];

// Mock Quizzes
export const mockQuizzes: Quiz[] = [
  {
    id: "1",
    courseId: "1",
    courseName: "CSC 401 - Data Structures",
    title: "Mid-Semester Test",
    description: "Covering topics from weeks 1-6",
    duration: 90,
    totalMarks: 50,
    questionsCount: 25,
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: "upcoming",
  },
  {
    id: "2",
    courseId: "2",
    courseName: "CSC 301 - Database Systems",
    title: "SQL Practice Quiz",
    description: "Test your SQL query writing skills",
    duration: 60,
    totalMarks: 30,
    questionsCount: 15,
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: "1",
    studentId: "student-1",
    type: "tuition",
    amount: 250000,
    status: "verified",
    reference: "PAY-2024-001",
    description: "School Fees - First Semester 2023/2024",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    verifiedBy: "Bursar Office",
    verifiedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    studentId: "student-1",
    type: "hostel",
    amount: 45000,
    status: "verified",
    reference: "PAY-2024-002",
    description: "Hostel Accommodation Fee",
    date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    verifiedBy: "Bursar Office",
    verifiedAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    studentId: "student-1",
    type: "exam",
    amount: 15000,
    status: "pending",
    reference: "PAY-2024-003",
    description: "Examination Fee",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Results
export const mockResults: Result[] = [
  {
    id: "1",
    studentId: "student-1",
    courseId: "1",
    courseCode: "CSC 401",
    courseTitle: "Data Structures and Algorithms",
    credits: 3,
    score: 78,
    grade: "A",
    gradePoints: 5.0,
    semester: "first",
    session: "2023/2024",
  },
  {
    id: "2",
    studentId: "student-1",
    courseId: "2",
    courseCode: "CSC 301",
    courseTitle: "Database Management Systems",
    credits: 3,
    score: 65,
    grade: "B",
    gradePoints: 4.0,
    semester: "first",
    session: "2023/2024",
  },
  {
    id: "3",
    studentId: "student-1",
    courseId: "3",
    courseCode: "CSC 201",
    courseTitle: "Object-Oriented Programming",
    credits: 4,
    score: 85,
    grade: "A",
    gradePoints: 5.0,
    semester: "second",
    session: "2022/2023",
  },
];

// Mock Hostel Applications
export const mockHostelApplications: HostelApplication[] = [
  {
    id: "1",
    studentId: "student-1",
    session: "2023/2024",
    roomType: "shared",
    status: "allocated",
    appliedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    allocatedRoom: {
      id: "room-1",
      hostelName: "Queens Hall",
      blockName: "Block A",
      roomNumber: "A204",
      bedNumber: "2",
      roommates: [
        {
          id: "student-2",
          name: "Jane Smith",
          matricNumber: "STU/2023/002",
          department: "Engineering",
          level: "400",
          phone: "+234 801 234 5678",
        },
      ],
    },
  },
];

// Mock Scholarships
export const mockScholarships: Scholarship[] = [
  {
    id: "1",
    name: "Academic Excellence Scholarship",
    description: "For students with CGPA of 4.5 and above",
    amount: 100000,
    eligibilityCriteria: "Minimum CGPA of 4.5, no carry-over courses",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: "open",
    slots: 50,
    applicants: 23,
  },
  {
    id: "2",
    name: "Sports Scholarship",
    description: "For outstanding athletes representing the university",
    amount: 75000,
    eligibilityCriteria: "Active member of university sports team",
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    status: "open",
    slots: 20,
    applicants: 15,
  },
  {
    id: "3",
    name: "Need-Based Financial Aid",
    description: "For students from low-income families",
    amount: 150000,
    eligibilityCriteria: "Proof of family income below threshold",
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: "open",
    slots: 30,
    applicants: 42,
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "lecturer-1",
    senderName: "Dr. Michael Anderson",
    senderRole: USER_ROLES.LECTURER,
    recipientId: "student-1",
    subject: "Re: Assignment Extension Request",
    body: "Your request for extension has been approved. New deadline is next Friday.",
    read: false,
    sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    senderId: "admin-1",
    senderName: "Admin Office",
    senderRole: USER_ROLES.ADMIN,
    recipientId: "student-1",
    subject: "Clearance Status Update",
    body: "Your library clearance has been approved. Please proceed to next department.",
    read: true,
    sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockCurrentUser: User = {
  id: "student-1",
  email: "student1@university.edu",
  firstName: "John",
  lastName: "Doe",
  role: USER_ROLES.STUDENT,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student1",
  studentId: "STU/2023/001",
  department: "Computer Science",
  level: "400",
};
