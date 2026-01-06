# University Portal - Unintegrated API Endpoints

This document lists all API endpoints from the backend that have not yet been integrated into the frontend application.

## Summary
- **Total Endpoints**: ~150+
- **Integrated Endpoints**: ~50
- **Unintegrated Endpoints**: ~100+

## Unintegrated Endpoints by Category

### Health
- `GET /health` - Email transporter health check

### Auth
- `POST /auth/verify-email` - Verify email with token ✅ **IMPLEMENTED**
- `GET /auth/me` - Get current authenticated user info ✅ **IMPLEMENTED**

### Users Management
- `GET /users/search` - Search users ✅ **IMPLEMENTED**
- `GET /users/stats/overview` - Get user statistics overview ✅ **IMPLEMENTED**
- `GET /users/students/by-department/{departmentId}` - Get students by department ✅ **IMPLEMENTED**
- `GET /users` - List all users ✅ **IMPLEMENTED**
- `GET /users/{id}` - Get user by ID ✅ **IMPLEMENTED**
- `PUT /users/{id}` - Update user by ID ✅ **IMPLEMENTED**
- `DELETE /users/{id}` - Delete user by ID ✅ **IMPLEMENTED**
- `PUT /users/{id}/avatar` - Update user avatar ✅ **IMPLEMENTED**
- `PUT /users/{id}/password` - Change user password (admin) ✅ **IMPLEMENTED**
- `PUT /users/{id}/activate` - Activate/deactivate user ✅ **IMPLEMENTED**
- `PUT /users/{id}/role` - Change user role ✅ **IMPLEMENTED**

### Students
- `GET /students/results` - Get student results (already implemented but may need UI integration) ✅ **IMPLEMENTED**

### Payments
- `POST /payments/initialize` - Initialize payment ✅ **IMPLEMENTED**
- `GET /payments/verify/{reference}` - Verify payment by reference ✅ **IMPLEMENTED**
- `GET /payments` - List all payments ✅ **IMPLEMENTED**
- `GET /payments/{id}` - Get payment by ID ✅ **IMPLEMENTED**
- `PUT /payments/{id}/verify` - Verify payment ✅ **IMPLEMENTED**
- `PUT /payments/{id}/reject` - Reject payment ✅ **IMPLEMENTED**
- `GET /payments/{id}/receipt` - Get payment receipt (admin) ✅ **IMPLEMENTED**
- `GET /payments/stats/overview` - Get payment statistics ✅ **IMPLEMENTED**
- `GET /payments/student/{studentId}` - Get payments by student ID ✅ **IMPLEMENTED**

### Results
- `PUT /results/publish` - Publish results ✅ **IMPLEMENTED**
- `PUT /results/{id}/approve-hod` - Approve results by HOD ✅ **IMPLEMENTED**
- `PUT /results/{id}/approve-admin` - Approve results by admin ✅ **IMPLEMENTED**
- `GET /results/transcript/{studentId}` - Get student transcript ✅ **IMPLEMENTED**
- `GET /results/summary/{studentId}` - Get student results summary ✅ **IMPLEMENTED**
- `GET /results` - List all results ✅ **IMPLEMENTED**
- `POST /results` - Create results ✅ **IMPLEMENTED**
- `GET /results/{id}` - Get result by ID ✅ **IMPLEMENTED**
- `PUT /results/{id}` - Update result ✅ **IMPLEMENTED**
- `DELETE /results/{id}` - Delete result ✅ **IMPLEMENTED**

### Notifications
- `GET /notifications/unread-count` - Get unread notifications count ✅ **IMPLEMENTED**
- `GET /notifications/recent` - Get recent notifications ✅ **IMPLEMENTED**
- `GET /notifications/unread/count` - Get unread notifications count (alternative) ✅ **IMPLEMENTED**
- `PUT /notifications/read-all` - Mark all notifications as read ✅ **IMPLEMENTED**
- `DELETE /notifications/clear-read` - Clear read notifications ✅ **IMPLEMENTED**
- `GET /notifications` - List notifications ✅ **IMPLEMENTED**
- `GET /notifications/{id}` - Get notification by ID ✅ **IMPLEMENTED**
- `DELETE /notifications/{id}` - Delete notification ✅ **IMPLEMENTED**
- `PUT /notifications/{id}/read` - Mark notification as read ✅ **IMPLEMENTED**

### Files
- `POST /files/upload` - Upload file ✅ **IMPLEMENTED**
- `GET /files/{id}` - Get file by ID ✅ **IMPLEMENTED**
- `DELETE /files/{id}` - Delete file ✅ **IMPLEMENTED**

### Courses
- `GET /courses` - List all courses ✅ **IMPLEMENTED**
- `POST /courses` - Create course ✅ **IMPLEMENTED**
- `GET /courses/{id}` - Get course by ID ✅ **IMPLEMENTED**
- `PUT /courses/{id}` - Update course ✅ **IMPLEMENTED**
- `DELETE /courses/{id}` - Delete course ✅ **IMPLEMENTED**
- `POST /courses/{id}/enroll` - Enroll in course ✅ **IMPLEMENTED**
- `DELETE /courses/{id}/unenroll` - Unenroll from course ✅ **IMPLEMENTED**
- `GET /courses/{id}/students` - Get course students ✅ **IMPLEMENTED**
- `POST /courses/{id}/materials` - Upload course material ✅ **IMPLEMENTED**
- `GET /courses/{id}/materials` - Get course materials ✅ **IMPLEMENTED**
- `POST /courses/{id}/materials/{materialId}/download` - Download course material ✅ **IMPLEMENTED**
- `DELETE /courses/{id}/materials/{materialId}` - Delete course material ✅ **IMPLEMENTED**

### Assignments
- `POST /assignments/{id}/submit` - Submit assignment (student) ✅ **IMPLEMENTED**
- `GET /assignments/{id}/submissions` - Get assignment submissions ✅ **IMPLEMENTED**
- `PUT /assignments/{assignmentId}/submissions/{submissionId}/grade` - Grade assignment submission ✅ **IMPLEMENTED**
- `GET /assignments` - List all assignments ✅ **IMPLEMENTED**
- `POST /assignments` - Create assignment ✅ **IMPLEMENTED**
- `GET /assignments/{id}` - Get assignment by ID ✅ **IMPLEMENTED**
- `PUT /assignments/{id}` - Update assignment ✅ **IMPLEMENTED**
- `DELETE /assignments/{id}` - Delete assignment ✅ **IMPLEMENTED**

### Quizzes
- `POST /quizzes/{id}/start` - Start quiz attempt ✅ **IMPLEMENTED**
- `POST /quizzes/{id}/submit` - Submit quiz answers ✅ **IMPLEMENTED**
- `GET /quizzes/{id}/my-attempt` - Get user's quiz attempt ✅ **IMPLEMENTED**
- `GET /quizzes/{id}/attempts` - Get quiz attempts ✅ **IMPLEMENTED**
- `GET /quizzes` - List all quizzes ✅ **IMPLEMENTED**
- `POST /quizzes` - Create quiz ✅ **IMPLEMENTED**
- `GET /quizzes/{id}` - Get quiz by ID ✅ **IMPLEMENTED**
- `PUT /quizzes/{id}` - Update quiz ✅ **IMPLEMENTED**
- `DELETE /quizzes/{id}` - Delete quiz ✅ **IMPLEMENTED**

### Hostels
- `POST /hostels/apply` - Apply for hostel ✅ **IMPLEMENTED**
- `GET /hostels/applications` - Get hostel applications ✅ **IMPLEMENTED**
- `GET /hostels/applications/{id}` - Get hostel application by ID ✅ **IMPLEMENTED**
- `PUT /hostels/applications/{id}/approve` - Approve hostel application ✅ **IMPLEMENTED**
- `PUT /hostels/applications/{id}/reject` - Reject hostel application ✅ **IMPLEMENTED**
- `PUT /hostels/applications/{id}/allocate` - Allocate hostel room ✅ **IMPLEMENTED**
- `GET /hostels/stats/overview` - Get hostel statistics ✅ **IMPLEMENTED**
- `GET /hostels` - List all hostels ✅ **IMPLEMENTED**
- `POST /hostels` - Create hostel ✅ **IMPLEMENTED**
- `GET /hostels/{id}` - Get hostel by ID ✅ **IMPLEMENTED**
- `PUT /hostels/{id}` - Update hostel ✅ **IMPLEMENTED**
- `DELETE /hostels/{id}` - Delete hostel ✅ **IMPLEMENTED**

### Messages
- `GET /messages/unread/count` - Get unread messages count ✅ **IMPLEMENTED**
- `GET /messages` - List messages ✅ **IMPLEMENTED**
- `POST /messages` - Send message ✅ **IMPLEMENTED**
- `GET /messages/{id}` - Get message by ID ✅ **IMPLEMENTED**
- `DELETE /messages/{id}` - Delete message ✅ **IMPLEMENTED**
- `PUT /messages/{id}/read` - Mark message as read ✅ **IMPLEMENTED**

### Bursary
- `GET /bursary/scholarships` - List scholarships ✅ **IMPLEMENTED**
- `POST /bursary/scholarships/create` - Create scholarship ✅ **IMPLEMENTED**
- `GET /bursary/scholarships/{id}` - Get scholarship by ID ✅ **IMPLEMENTED**
- `POST /bursary/scholarships/{id}/approve` - Approve scholarship ✅ **IMPLEMENTED**
- `POST /bursary/scholarships/{id}/reject` - Reject scholarship ✅ **IMPLEMENTED**
- `GET /bursary/reports` - Get bursary reports ✅ **IMPLEMENTED**
- `POST /bursary/reports/generate` - Generate bursary report ✅ **IMPLEMENTED**
- `GET /bursary/payments` - Get bursary payments ✅ **IMPLEMENTED**
- `GET /bursary/payments/{id}` - Get bursary payment by ID ✅ **IMPLEMENTED**
- `POST /bursary/payments` - Create bursary payment ✅ **IMPLEMENTED**

### Admin
- `GET /admin/clearance` - Get clearance requests ✅ **IMPLEMENTED**
- `GET /admin/clearance/{id}` - Get clearance by ID ✅ **IMPLEMENTED**
- `POST /admin/clearance/{id}/departments` - Add department to clearance ✅ **IMPLEMENTED**
- `POST /admin/clearance/{id}/approve` - Approve clearance ✅ **IMPLEMENTED**
- `POST /admin/clearance/{id}/reject` - Reject clearance ✅ **IMPLEMENTED**
- `POST /admin/users/bulk-upload` - Bulk upload users ✅ **IMPLEMENTED**
- `POST /admin/hostel/{hostelId}/rooms/{roomNumber}/assign` - Assign hostel room ✅ **IMPLEMENTED**
- `POST /admin/hostel/{hostelId}/rooms/{roomNumber}/evict` - Evict from hostel room ✅ **IMPLEMENTED**
- `GET /admin/hostel/{id}` - Get hostel details ✅ **IMPLEMENTED**

### HOD
- `GET /hod/students` - Get students under HOD ✅ **IMPLEMENTED**
- `GET /hod/students/{id}` - Get student by ID ✅ **IMPLEMENTED**
- `GET /hod/staff` - Get staff under HOD ✅ **IMPLEMENTED**
- `GET /hod/staff/{id}` - Get staff member by ID ✅ **IMPLEMENTED**
- `POST /hod/staff/{id}/assign-courses` - Assign courses to staff ✅ **IMPLEMENTED**
- `GET /hod/department` - Get department info ✅ **IMPLEMENTED**
- `PUT /hod/department` - Update department info ✅ **IMPLEMENTED**
- `GET /hod/department/statistics` - Get department statistics ✅ **IMPLEMENTED**
- `GET /hod/results/pending-approval` - Get results pending approval ✅ **IMPLEMENTED**
- `GET /hod/results/{id}` - Get result by ID ✅ **IMPLEMENTED**
- `POST /hod/results/{id}/approve` - Approve result ✅ **IMPLEMENTED**

### Webhooks
- `POST /webhooks/payment` - Payment webhook
- `POST /webhooks/email` - Email webhook

## Priority Integration Suggestions

### High Priority
1. **Notifications** - Core user experience feature
2. **Messages** - Communication system
3. **Files** - File upload/download functionality
4. **Courses Management** - CRUD operations for courses
5. **Assignments & Quizzes** - Complete lecturer workflows
6. **Results Management** - Complete results system
7. **Hostels** - Accommodation management
8. **Payments** - Payment processing and verification

### Medium Priority
1. **Users Management** - Admin user management
2. **Bursary** - Scholarship and financial aid
3. **Admin Panel** - Administrative functions
4. **HOD Dashboard** - Department head features

### Low Priority
1. **Health Checks** - System monitoring
2. **Webhooks** - External integrations
3. **Advanced Analytics** - Reporting features

## Implementation Notes

- Most service methods are already implemented in the respective service files
- UI components need to be created for unintegrated features
- Some endpoints may require additional permissions or role checks
- Consider implementing pagination for list endpoints
- Add proper error handling and loading states
- Ensure responsive design for all new components

## Next Steps

1. Choose a feature category to implement
2. Create UI components and pages
3. Integrate with existing service methods
4. Add proper routing and navigation
5. Test thoroughly and handle edge cases
6. Update this document as features are integrated