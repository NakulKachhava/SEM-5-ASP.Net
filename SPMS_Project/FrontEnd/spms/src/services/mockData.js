// mockData.js
// Updated test arrays matching the revised database design for the SPMS project.

export const SPM_Role = [
  { RoleID: 1, RoleName: 'Admin', Description: 'Full access to all modules and settings.' },
  { RoleID: 2, RoleName: 'Faculty', Description: 'Can supervise students and manage project assignments.' },
  { RoleID: 3, RoleName: 'Student', Description: 'Can view and manage own projects and tasks.' }
];

export const SPM_UserType = [
  { UserTypeID: 1, UserTypeName: 'Admin', Description: 'System administrators.' },
  { UserTypeID: 2, UserTypeName: 'Faculty', Description: 'Faculty supervisors.' },
  { UserTypeID: 3, UserTypeName: 'Student', Description: 'Enrolled students.' }
];

export const SPM_User = [
  {
    UserID: 1,
    UserTypeID: 1, // Admin
    FullName: 'Aarav Patel',
    UserCode: 'ADM001',
    Email: 'admin@spms.com',
    Password: 'admin123',
    MobileNumber: '9876543210',
    ProfilePicturePath: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    IsActive: true,
    IsDeleted: false
  },
  {
    UserID: 2,
    UserTypeID: 2, // Faculty
    FullName: 'Priya Sharma',
    UserCode: 'FAC001',
    Email: 'priya.sharma@spms.com',
    Password: 'faculty123',
    MobileNumber: '9876543211',
    ProfilePicturePath: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    IsActive: true,
    IsDeleted: false
  },
  {
    UserID: 3,
    UserTypeID: 2, // Faculty
    FullName: 'Dr. Nisha Kapoor',
    UserCode: 'FAC002',
    Email: 'nisha.kapoor@spms.com',
    Password: 'faculty123',
    MobileNumber: '9876543212',
    ProfilePicturePath: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    IsActive: true,
    IsDeleted: false
  },
  {
    UserID: 4,
    UserTypeID: 3, // Student
    FullName: 'Rohan Mehta',
    UserCode: 'STU001',
    Email: 'rohan.mehta@spms.com',
    Password: 'student123',
    MobileNumber: '9876543213',
    ProfilePicturePath: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    IsActive: true,
    IsDeleted: false
  },
  {
    UserID: 5,
    UserTypeID: 3, // Student
    FullName: 'Sneha Desai',
    UserCode: 'STU002',
    Email: 'sneha.desai@spms.com',
    Password: 'student123',
    MobileNumber: '9876543214',
    ProfilePicturePath: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    IsActive: true,
    IsDeleted: false
  },
  {
    UserID: 6,
    UserTypeID: 3, // Student
    FullName: 'Vikram Singh',
    UserCode: 'STU003',
    Email: 'vikram.singh@spms.com',
    Password: 'student123',
    MobileNumber: '9876543215',
    ProfilePicturePath: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    IsActive: true,
    IsDeleted: false
  },
  {
    UserID: 7,
    UserTypeID: 3, // Student
    FullName: 'Anita Joshi',
    UserCode: 'STU004',
    Email: 'anita.joshi@spms.com',
    Password: 'student123',
    MobileNumber: '9876543216',
    ProfilePicturePath: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    IsActive: true,
    IsDeleted: false
  }
];

export const SPM_UserRole = [
  { RolePermissionID: 1, RoleID: 1, UserID: 1 },
  { RolePermissionID: 2, RoleID: 2, UserID: 2 },
  { RolePermissionID: 3, RoleID: 2, UserID: 3 },
  { RolePermissionID: 4, RoleID: 3, UserID: 4 },
  { RolePermissionID: 5, RoleID: 3, UserID: 5 },
  { RolePermissionID: 6, RoleID: 3, UserID: 6 },
  { RolePermissionID: 7, RoleID: 3, UserID: 7 }
];

export const SPM_TaskStatus = [
  { TaskStatusID: 1, TaskStatusName: 'Pending', TaskStatusCssClass: 'status-pending' },
  { TaskStatusID: 2, TaskStatusName: 'In Progress', TaskStatusCssClass: 'status-inprogress' },
  { TaskStatusID: 3, TaskStatusName: 'Completed', TaskStatusCssClass: 'status-completed' },
  { TaskStatusID: 4, TaskStatusName: 'Rejected', TaskStatusCssClass: 'status-rejected' }
];

export const SPM_TaskPriority = [
  { TaskPriorityID: 1, TaskPriorityName: 'Low', TaskPriortyCssClass: 'priority-low' },
  { TaskPriorityID: 2, TaskPriorityName: 'Medium', TaskPriortyCssClass: 'priority-medium' },
  { TaskPriorityID: 3, TaskPriorityName: 'High', TaskPriortyCssClass: 'priority-high' },
  { TaskPriorityID: 4, TaskPriorityName: 'Critical', TaskPriortyCssClass: 'priority-critical' }
];

export const SPM_ProjectMaster = [
  {
    ProjectID: 1,
    ProjectTitle: 'E-Commerce Platform',
    Description: 'Build a full-stack e-commerce web application with standard checkout features and shopping carts.'
  },
  {
    ProjectID: 2,
    ProjectTitle: 'Library Management System',
    Description: 'Develop a library inventory and reservation management platform with QR code integration.'
  },
  {
    ProjectID: 3,
    ProjectTitle: 'AI Chatbot',
    Description: 'Create a local AI-powered chatbot interface using LLM APIs to handle customer support inquiries.'
  },
  {
    ProjectID: 4,
    ProjectTitle: 'IoT Weather Station',
    Description: 'Design an automated weather tracking device reporting temperature, humidity, and barometric pressure.'
  }
];

export const SPM_ProjectAllocation = [
  {
    ProjectAllocationID: 1,
    ProjectID: 1,
    StudentID: 4, // Rohan Mehta
    FacultyID: 2, // Priya Sharma
    AssignedDate: '2026-06-25T10:00:00',
    ProjectStartDate: '2026-07-01',
    ProjectEndDate: '2026-11-30',
    TotalTasksGiven: 5,
    TotalCompletedTasks: 2,
    ProgressPercentage: 40.00,
    OverAllGrade: null
  },
  {
    ProjectAllocationID: 2,
    ProjectID: 2,
    StudentID: 5, // Sneha Desai
    FacultyID: 3, // Dr. Nisha Kapoor
    AssignedDate: '2026-06-28T09:30:00',
    ProjectStartDate: '2026-07-01',
    ProjectEndDate: '2026-10-15',
    TotalTasksGiven: 4,
    TotalCompletedTasks: 4,
    ProgressPercentage: 100.00,
    OverAllGrade: 'A'
  },
  {
    ProjectAllocationID: 3,
    ProjectID: 3,
    StudentID: 6, // Vikram Singh
    FacultyID: 2, // Priya Sharma
    AssignedDate: '2026-07-02T11:00:00',
    ProjectStartDate: '2026-07-05',
    ProjectEndDate: '2026-12-15',
    TotalTasksGiven: 6,
    TotalCompletedTasks: 1,
    ProgressPercentage: 16.67,
    OverAllGrade: null
  },
  {
    ProjectAllocationID: 4,
    ProjectID: 4,
    StudentID: 7, // Anita Joshi
    FacultyID: 3, // Dr. Nisha Kapoor
    AssignedDate: '2026-07-03T14:00:00',
    ProjectStartDate: '2026-07-15',
    ProjectEndDate: '2027-01-30',
    TotalTasksGiven: 3,
    TotalCompletedTasks: 0,
    ProgressPercentage: 0.00,
    OverAllGrade: null
  }
];

export const SPM_Task = [
  // E-Commerce Platform Tasks (ProjectAllocationID = 1, Student Rohan Mehta = 4, Faculty Priya Sharma = 2)
  {
    TaskID: 1,
    ProjectAllocationID: 1,
    TaskTitle: 'Design Database Schema',
    TaskDescription: 'Draft relational tables and diagrams representing product catalog, orders, and user carts.',
    TaskStatusID: 3, // Completed
    TaskPriorityID: 3, // High
    AssignedScore: 10.00,
    EarnedScore: 9.50,
    ProgressPercentage: 100.00,
    TaskAssignedDate: '2026-06-26',
    TaskStartDate: '2026-07-01',
    TaskDueDate: '2026-07-07',
    TaskCompletedDate: '2026-07-06',
    NextFollowUpDate: '2026-07-08',
    FacultyRemarks: 'Excellent work structure, highly normalized.',
    StudentRemarks: 'Followed week 1 project outline guidelines.'
  },
  {
    TaskID: 2,
    ProjectAllocationID: 1,
    TaskTitle: 'Setup React Project & Router',
    TaskDescription: 'Initialize React SPA structure and install necessary navigation and layout containers.',
    TaskStatusID: 3, // Completed
    TaskPriorityID: 2, // Medium
    AssignedScore: 10.00,
    EarnedScore: 9.00,
    ProgressPercentage: 100.00,
    TaskAssignedDate: '2026-07-05',
    TaskStartDate: '2026-07-08',
    TaskDueDate: '2026-07-14',
    TaskCompletedDate: '2026-07-12',
    NextFollowUpDate: '2026-07-15',
    FacultyRemarks: 'Slightly slow performance in CSS rendering, but structure looks great.',
    StudentRemarks: 'Successfully completed baseline template layout.'
  },
  {
    TaskID: 3,
    ProjectAllocationID: 1,
    TaskTitle: 'Implement ASP.NET API Controllers',
    TaskDescription: 'Write initial authentication and project allocation controllers using Entity Framework Core.',
    TaskStatusID: 2, // In Progress
    TaskPriorityID: 4, // Critical
    AssignedScore: 15.00,
    EarnedScore: null,
    ProgressPercentage: 40.00,
    TaskAssignedDate: '2026-07-13',
    TaskStartDate: '2026-07-15',
    TaskDueDate: '2026-07-28',
    TaskCompletedDate: null,
    NextFollowUpDate: '2026-07-22',
    FacultyRemarks: null,
    StudentRemarks: 'Currently working on CORS policy adjustments and database context connection.'
  },
  {
    TaskID: 4,
    ProjectAllocationID: 1,
    TaskTitle: 'Integrate FrontEnd layout with API',
    TaskDescription: 'Consume authentication and profile services from the Web API endpoints.',
    TaskStatusID: 1, // Pending
    TaskPriorityID: 3, // High
    AssignedScore: 15.00,
    EarnedScore: null,
    ProgressPercentage: 0.00,
    TaskAssignedDate: '2026-07-25',
    TaskStartDate: '2026-07-29',
    TaskDueDate: '2026-08-10',
    TaskCompletedDate: null,
    NextFollowUpDate: '2026-08-01',
    FacultyRemarks: null,
    StudentRemarks: null
  },
  {
    TaskID: 5,
    ProjectAllocationID: 1,
    TaskTitle: 'Implement Payment Gateway Mock',
    TaskDescription: 'Mock check-out pipeline integrating dummy responses from payment providers.',
    TaskStatusID: 1, // Pending
    TaskPriorityID: 1, // Low
    AssignedScore: 10.00,
    EarnedScore: null,
    ProgressPercentage: 0.00,
    TaskAssignedDate: '2026-08-05',
    TaskStartDate: '2026-08-11',
    TaskDueDate: '2026-08-20',
    TaskCompletedDate: null,
    NextFollowUpDate: '2026-08-15',
    FacultyRemarks: null,
    StudentRemarks: null
  },

  // Library Management System Tasks (ProjectAllocationID = 2, Student Sneha Desai = 5)
  {
    TaskID: 6,
    ProjectAllocationID: 2,
    TaskTitle: 'Wireframe Layout & Flow',
    TaskDescription: 'Draft screen mocks showing user search, checkout lists, and admin screens.',
    TaskStatusID: 3, // Completed
    TaskPriorityID: 2, // Medium
    AssignedScore: 10.00,
    EarnedScore: 10.00,
    ProgressPercentage: 100.00,
    TaskAssignedDate: '2026-06-29',
    TaskStartDate: '2026-07-01',
    TaskDueDate: '2026-07-05',
    TaskCompletedDate: '2026-07-04',
    NextFollowUpDate: '2026-07-05',
    FacultyRemarks: 'Logical and intuitive flow.',
    StudentRemarks: 'Modified design structure after supervisor comments.'
  },
  {
    TaskID: 7,
    ProjectAllocationID: 2,
    TaskTitle: 'Database Implementation',
    TaskDescription: 'Initialize local SQL Server database, populate static table rows.',
    TaskStatusID: 3, // Completed
    TaskPriorityID: 3, // High
    AssignedScore: 15.00,
    EarnedScore: 14.50,
    ProgressPercentage: 100.00,
    TaskAssignedDate: '2026-07-03',
    TaskStartDate: '2026-07-06',
    TaskDueDate: '2026-07-15',
    TaskCompletedDate: '2026-07-14',
    NextFollowUpDate: '2026-07-10',
    FacultyRemarks: 'Indexes applied correctly.',
    StudentRemarks: 'Tested relationships and constraint rules.'
  },
  {
    TaskID: 8,
    ProjectAllocationID: 2,
    TaskTitle: 'CRUD API Endpoints',
    TaskDescription: 'Develop REST endpoints for books, issues, and student inventory returns.',
    TaskStatusID: 3, // Completed
    TaskPriorityID: 3, // High
    AssignedScore: 20.00,
    EarnedScore: 19.00,
    ProgressPercentage: 100.00,
    TaskAssignedDate: '2026-07-14',
    TaskStartDate: '2026-07-16',
    TaskDueDate: '2026-08-01',
    TaskCompletedDate: '2026-07-30',
    NextFollowUpDate: '2026-07-22',
    FacultyRemarks: 'API follows standard REST norms.',
    StudentRemarks: 'Resolved minor issue with double-booking checkout validation.'
  },
  {
    TaskID: 9,
    ProjectAllocationID: 2,
    TaskTitle: 'Integrate QR Code Reader',
    TaskDescription: 'Integrate JS libraries to enable mobile camera scanning of QR IDs on library cards.',
    TaskStatusID: 3, // Completed
    TaskPriorityID: 4, // Critical
    AssignedScore: 25.00,
    EarnedScore: 24.00,
    ProgressPercentage: 100.00,
    TaskAssignedDate: '2026-07-28',
    TaskStartDate: '2026-08-02',
    TaskDueDate: '2026-08-15',
    TaskCompletedDate: '2026-08-14',
    NextFollowUpDate: '2026-08-08',
    FacultyRemarks: 'Fantastic scanning responsiveness.',
    StudentRemarks: 'Ready for final project evaluation.'
  },

  // AI Chatbot (ProjectAllocationID = 3, Student Vikram Singh = 6)
  {
    TaskID: 10,
    ProjectAllocationID: 3,
    TaskTitle: 'Setup Open Source LLM locally',
    TaskDescription: 'Configure local server instance running small sized open source model.',
    TaskStatusID: 3, // Completed
    TaskPriorityID: 4, // Critical
    AssignedScore: 20.00,
    EarnedScore: 18.00,
    ProgressPercentage: 100.00,
    TaskAssignedDate: '2026-07-03',
    TaskStartDate: '2026-07-06',
    TaskDueDate: '2026-07-15',
    TaskCompletedDate: '2026-07-14',
    NextFollowUpDate: '2026-07-10',
    FacultyRemarks: 'Model selected has good performance, memory trade-off is fine.',
    StudentRemarks: 'Struggled with GPU compilation but it is resolved.'
  },
  {
    TaskID: 11,
    ProjectAllocationID: 3,
    TaskTitle: 'Develop Chatbot UI Component',
    TaskDescription: 'Create custom chat bubble overlay responsive to standard dimensions.',
    TaskStatusID: 2, // In Progress
    TaskPriorityID: 3, // High
    AssignedScore: 15.00,
    EarnedScore: null,
    ProgressPercentage: 50.00,
    TaskAssignedDate: '2026-07-12',
    TaskStartDate: '2026-07-16',
    TaskDueDate: '2026-07-30',
    TaskCompletedDate: null,
    NextFollowUpDate: '2026-07-20',
    FacultyRemarks: null,
    StudentRemarks: 'Currently implementing CSS animations for loading states.'
  }
];
