// projectService.js
// Updated async wrapper functions joining the split project masters, allocations, and new column casing.

import {
  SPM_User,
  SPM_Role,
  SPM_UserRole,
  SPM_ProjectMaster,
  SPM_ProjectAllocation,
  SPM_Task,
  SPM_TaskStatus,
  SPM_TaskPriority
} from './mockData';

const LATENCY = 400; // Simulated latency in ms

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const projectService = {
  // Authentication services
  async login(email, password) {
    await delay(LATENCY);
    const user = SPM_User.find(u => u.Email.toLowerCase() === email.toLowerCase().trim());
    if (!user) {
      throw new Error('User not found.');
    }
    if (user.Password !== password) {
      throw new Error('Incorrect password.');
    }
    
    // Retrieve associated Role from SPM_UserRole join
    const roleLink = SPM_UserRole.find(ur => ur.UserID === user.UserID);
    const roleObj = SPM_Role.find(r => r.RoleID === (roleLink ? roleLink.RoleID : null));
    const roleName = roleObj ? roleObj.RoleName : 'Student';

    return {
      token: `mock-jwt-token-xyz-${user.UserID}-${Date.now()}`,
      user: {
        UserID: user.UserID,
        FullName: user.FullName,
        Email: user.Email,
        MobileNumber: user.MobileNumber,
        ProfilePicturePath: user.ProfilePicturePath,
        Role: roleName
      }
    };
  },

  // Helper to compute allocation status dynamically based on ProgressPercentage
  _computeStatus(progress) {
    if (progress === 100.00) {
      return { name: 'Completed', cssClass: 'status-completed' };
    } else if (progress > 0) {
      return { name: 'In Progress', cssClass: 'status-inprogress' };
    } else {
      return { name: 'Pending', cssClass: 'status-pending' };
    }
  },

  // Get Projects (Hydrated joining Master, Student, and Faculty)
  async getProjects() {
    await delay(LATENCY);
    return SPM_ProjectAllocation.map(alloc => {
      const master = SPM_ProjectMaster.find(m => m.ProjectID === alloc.ProjectID);
      const student = SPM_User.find(u => u.UserID === alloc.StudentID);
      const faculty = SPM_User.find(u => u.UserID === alloc.FacultyID);
      const status = this._computeStatus(alloc.ProgressPercentage);

      return {
        ...alloc,
        ProjectTitle: master ? master.ProjectTitle : 'Untitled Project',
        Description: master ? master.Description : '',
        StudentName: student ? student.FullName : 'Unassigned',
        FacultyName: faculty ? faculty.FullName : 'Unassigned',
        StatusName: status.name,
        StatusCssClass: status.cssClass
      };
    });
  },

  // Get single project allocation details
  async getProjectById(projectAllocationId) {
    await delay(LATENCY);
    const alloc = SPM_ProjectAllocation.find(a => a.ProjectAllocationID === parseInt(projectAllocationId));
    if (!alloc) throw new Error('Project allocation not found');

    const master = SPM_ProjectMaster.find(m => m.ProjectID === alloc.ProjectID);
    const student = SPM_User.find(u => u.UserID === alloc.StudentID);
    const faculty = SPM_User.find(u => u.UserID === alloc.FacultyID);
    const status = this._computeStatus(alloc.ProgressPercentage);

    return {
      ...alloc,
      ProjectTitle: master ? master.ProjectTitle : 'Untitled Project',
      Description: master ? master.Description : '',
      StudentName: student ? student.FullName : 'Unassigned',
      FacultyName: faculty ? faculty.FullName : 'Unassigned',
      StatusName: status.name,
      StatusCssClass: status.cssClass
    };
  },

  // Get Project for a specific student
  async getProjectByStudentId(studentId) {
    await delay(LATENCY);
    const alloc = SPM_ProjectAllocation.find(a => a.StudentID === parseInt(studentId));
    if (!alloc) return null;

    const master = SPM_ProjectMaster.find(m => m.ProjectID === alloc.ProjectID);
    const student = SPM_User.find(u => u.UserID === alloc.StudentID);
    const faculty = SPM_User.find(u => u.UserID === alloc.FacultyID);
    const status = this._computeStatus(alloc.ProgressPercentage);

    return {
      ...alloc,
      ProjectTitle: master ? master.ProjectTitle : 'Untitled Project',
      Description: master ? master.Description : '',
      StudentName: student ? student.FullName : 'Unassigned',
      FacultyName: faculty ? faculty.FullName : 'Unassigned',
      StatusName: status.name,
      StatusCssClass: status.cssClass
    };
  },

  // Get Projects supervised by a faculty
  async getProjectsByFacultyId(facultyId) {
    await delay(LATENCY);
    return SPM_ProjectAllocation.filter(a => a.FacultyID === parseInt(facultyId)).map(alloc => {
      const master = SPM_ProjectMaster.find(m => m.ProjectID === alloc.ProjectID);
      const student = SPM_User.find(u => u.UserID === alloc.StudentID);
      const status = this._computeStatus(alloc.ProgressPercentage);

      return {
        ...alloc,
        ProjectTitle: master ? master.ProjectTitle : 'Untitled Project',
        Description: master ? master.Description : '',
        StudentName: student ? student.FullName : 'Unassigned',
        StatusName: status.name,
        StatusCssClass: status.cssClass
      };
    });
  },

  // Get Tasks for a specific project allocation
  async getTasksByProjectId(projectAllocationId) {
    await delay(LATENCY);
    return SPM_Task.filter(t => t.ProjectAllocationID === parseInt(projectAllocationId)).map(task => {
      const statusObj = SPM_TaskStatus.find(s => s.TaskStatusID === task.TaskStatusID);
      const priorityObj = SPM_TaskPriority.find(p => p.TaskPriorityID === task.TaskPriorityID);

      return {
        ...task,
        StatusName: statusObj ? statusObj.TaskStatusName : 'Unknown',
        StatusCssClass: statusObj ? statusObj.TaskStatusCssClass : '',
        PriorityName: priorityObj ? priorityObj.TaskPriorityName : 'Low',
        PriorityCssClass: priorityObj ? priorityObj.TaskPriortyCssClass : ''
      };
    });
  },

  // Get Admin statistics
  async getAdminStats() {
    await delay(LATENCY);
    const totalUsers = SPM_User.length;
    
    // Students correspond to UserTypeID 3
    const students = SPM_User.filter(u => u.UserTypeID === 3).length;

    // Faculty correspond to UserTypeID 2
    const faculty = SPM_User.filter(u => u.UserTypeID === 2).length;

    const totalProjects = SPM_ProjectMaster.length;
    const totalTasks = SPM_Task.length;

    // Calculate priority distribution for tasks
    const priorityCounts = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    SPM_Task.forEach(t => {
      const pObj = SPM_TaskPriority.find(p => p.TaskPriorityID === t.TaskPriorityID);
      if (pObj) {
        priorityCounts[pObj.TaskPriorityName] = (priorityCounts[pObj.TaskPriorityName] || 0) + 1;
      }
    });

    // Calculate project statuses distribution based on allocation progress percentage
    const statusCounts = { Pending: 0, 'In Progress': 0, Completed: 0, Rejected: 0 };
    SPM_ProjectAllocation.forEach(a => {
      const status = this._computeStatus(a.ProgressPercentage);
      statusCounts[status.name] = (statusCounts[status.name] || 0) + 1;
    });

    return {
      totalUsers,
      students,
      faculty,
      totalProjects,
      totalTasks,
      priorityCounts,
      statusCounts
    };
  }
};
