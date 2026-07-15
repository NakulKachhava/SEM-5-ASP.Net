// DashboardView.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { projectService } from '../../services/projectService';
import './DashboardView.css';

export default function DashboardView() {
  const { currentRole, currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  
  // Data States
  const [adminStats, setAdminStats] = useState(null);
  const [facultyProjects, setFacultyProjects] = useState([]);
  const [studentProject, setStudentProject] = useState(null);
  const [studentTasks, setStudentTasks] = useState([]);

  // Fetch data depending on active role
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (currentRole === 'Admin') {
          const stats = await projectService.getAdminStats();
          setAdminStats(stats);
        } else if (currentRole === 'Faculty') {
          // Mock Priya Sharma (UserID = 2) for Faculty view
          const projects = await projectService.getProjectsByFacultyId(currentUser?.UserID || 2);
          setFacultyProjects(projects);
        } else if (currentRole === 'Student') {
          // Mock Rohan Mehta (UserID = 4) for Student view
          const proj = await projectService.getProjectByStudentId(currentUser?.UserID || 4);
          setStudentProject(proj);
          if (proj) {
            const tasks = await projectService.getTasksByProjectId(proj.ProjectAllocationID);
            setStudentTasks(tasks);
          } else {
            setStudentTasks([]);
          }
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentRole, currentUser]);

  if (loading) {
    return (
      <div className="loader-container animate-fade-in">
        <div className="spinner"></div>
        <p className="loader-text">Loading dashboard widgets for {currentRole}...</p>
      </div>
    );
  }

  // --- 1. ADMIN DASHBOARD VIEW ---
  if (currentRole === 'Admin') {
    const stats = adminStats || {
      totalUsers: 0, students: 0, faculty: 0, totalProjects: 0, totalTasks: 0,
      priorityCounts: { Low: 0, Medium: 0, High: 0, Critical: 0 },
      statusCounts: { Pending: 0, 'In Progress': 0, Completed: 0, Rejected: 0 }
    };

    return (
      <div className="dashboard-subview animate-fade-in">
        <div className="dashboard-header-title">
          <h2>Overview Dashboard</h2>
          <p>System-wide registration statistics, active allocations, and task metrics.</p>
        </div>

        {/* Admin Stats Grid */}
        <div className="stats-card-grid">
          <div className="stat-card">
            <div className="stat-card-icon-wrapper user-icon-bg">
              <svg className="stat-card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="stat-card-info">
              <span className="stat-label">Total Users</span>
              <h3 className="stat-number">{stats.totalUsers}</h3>
              <p className="stat-desc">Active system credentials</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-icon-wrapper student-icon-bg">
              <svg className="stat-card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div className="stat-card-info">
              <span className="stat-label">Total Students</span>
              <h3 className="stat-number">{stats.students}</h3>
              <p className="stat-desc">Enrolled project candidates</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-icon-wrapper faculty-icon-bg">
              <svg className="stat-card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5" />
              </svg>
            </div>
            <div className="stat-card-info">
              <span className="stat-label">Supervisors</span>
              <h3 className="stat-number">{stats.faculty}</h3>
              <p className="stat-desc">Expert faculty supervisors</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-icon-wrapper project-icon-bg">
              <svg className="stat-card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <div className="stat-card-info">
              <span className="stat-label">Total Projects</span>
              <h3 className="stat-number">{stats.totalProjects}</h3>
              <p className="stat-desc">Active allocations</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-icon-wrapper task-icon-bg">
              <svg className="stat-card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="stat-card-info">
              <span className="stat-label">Total Tasks</span>
              <h3 className="stat-number">{stats.totalTasks}</h3>
              <p className="stat-desc">Project milestones</p>
            </div>
          </div>
        </div>

        {/* Charts & Analytics Visuals */}
        <div className="dashboard-charts-layout">
          {/* Project Status Distributions */}
          <div className="glass-card chart-card">
            <h4 className="chart-title">Project Allocation Status</h4>
            <div className="chart-metrics-list">
              {Object.keys(stats.statusCounts).map((statusName) => {
                const count = stats.statusCounts[statusName];
                const percentage = stats.totalProjects > 0 
                  ? ((count / stats.totalProjects) * 100).toFixed(0) 
                  : 0;
                
                let badgeClass = 'status-pending';
                if (statusName === 'In Progress') badgeClass = 'status-inprogress';
                if (statusName === 'Completed') badgeClass = 'status-completed';
                if (statusName === 'Rejected') badgeClass = 'status-rejected';

                return (
                  <div className="chart-metric-item" key={statusName}>
                    <div className="metric-row-header">
                      <span className={`badge ${badgeClass}`}>{statusName}</span>
                      <span className="metric-value">{count} projects ({percentage}%)</span>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className={`progress-bar-fill ${badgeClass}`} 
                        style={{ width: `${percentage}%`, background: 'var(--color-' + statusName.toLowerCase().replace(' ', '') + ')' }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Task Priority Distribution */}
          <div className="glass-card chart-card">
            <h4 className="chart-title">Task Priority Distribution</h4>
            <div className="chart-metrics-list">
              {Object.keys(stats.priorityCounts).map((priorityName) => {
                const count = stats.priorityCounts[priorityName];
                const percentage = stats.totalTasks > 0 
                  ? ((count / stats.totalTasks) * 100).toFixed(0) 
                  : 0;

                let pClass = 'priority-low';
                if (priorityName === 'Medium') pClass = 'priority-medium';
                if (priorityName === 'High') pClass = 'priority-high';
                if (priorityName === 'Critical') pClass = 'priority-critical';

                return (
                  <div className="chart-metric-item" key={priorityName}>
                    <div className="metric-row-header">
                      <span className={`badge ${pClass}`}>{priorityName}</span>
                      <span className="metric-value">{count} tasks ({percentage}%)</span>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className={`progress-bar-fill ${pClass}`} 
                        style={{ width: `${percentage}%`, background: 'var(--priority-' + priorityName.toLowerCase() + ')' }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. FACULTY DASHBOARD VIEW ---
  if (currentRole === 'Faculty') {
    return (
      <div className="dashboard-subview animate-fade-in">
        <div className="dashboard-header-title">
          <h2>Supervised Projects</h2>
          <p>Supervise student allocations, monitor milestone progress percentages, and assign tasks.</p>
        </div>

        {facultyProjects.length === 0 ? (
          <div className="glass-card empty-state-card">
            <svg className="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p>You are not supervising any active projects at this moment.</p>
          </div>
        ) : (
          <div className="projects-grid-layout">
            {facultyProjects.map((project) => (
              <div className="glass-card project-summary-card" key={project.ProjectAllocationID}>
                <div className="project-card-header">
                  <h3 className="project-title">{project.ProjectTitle}</h3>
                  <span className={`badge status-${project.StatusName.toLowerCase().replace(' ', '')}`}>
                    {project.StatusName}
                  </span>
                </div>
                
                <p className="project-description">{project.Description}</p>

                <div className="project-metadata-row">
                  <div className="meta-item">
                    <span className="meta-label">Student</span>
                    <span className="meta-value">{project.StudentName}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Timeline</span>
                    <span className="meta-value">{project.ProjectStartDate} to {project.ProjectEndDate}</span>
                  </div>
                </div>

                <div className="project-progress-section">
                  <div className="progress-info-row">
                    <span className="progress-label">Milestone Progress</span>
                    <span className="progress-value">{project.ProgressPercentage}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${project.ProgressPercentage}%` }}></div>
                  </div>
                  <div className="task-completed-label">
                    Tasks: {project.TotalCompletedTasks} completed of {project.TotalTasksGiven} total
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // --- 3. STUDENT DASHBOARD VIEW ---
  if (currentRole === 'Student') {
    return (
      <div className="dashboard-subview animate-fade-in">
        <div className="dashboard-header-title">
          <h2>My Project WorkSpace</h2>
          <p>Track your project timeline milestones, tasks, and view supervisor evaluations.</p>
        </div>

        {!studentProject ? (
          <div className="glass-card empty-state-card">
            <svg className="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
            </svg>
            <p>You have not been allocated to any project yet. Please contact the administrator.</p>
          </div>
        ) : (
          <div className="student-workspace-layout">
            {/* Top overview banner card */}
            <div className="glass-card student-overview-banner">
              <div className="banner-details">
                <span className="banner-pre">Assigned Academic Project</span>
                <h2 className="banner-title">{studentProject.ProjectTitle}</h2>
                <p className="banner-desc">{studentProject.Description}</p>
                
                <div className="banner-meta-grid">
                  <div className="banner-meta-item">
                    <span className="b-label">Supervisor</span>
                    <span className="b-value">{studentProject.FacultyName}</span>
                  </div>
                  <div className="banner-meta-item">
                    <span className="b-label">Assigned Date</span>
                    <span className="b-value">{new Date(studentProject.AssignedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="banner-meta-item">
                    <span className="b-label">Timeline Limits</span>
                    <span className="b-value">{studentProject.ProjectStartDate} — {studentProject.ProjectEndDate}</span>
                  </div>
                  {studentProject.OverAllGrade && (
                    <div className="banner-meta-item">
                      <span className="b-label">Overall Grade</span>
                      <span className="b-value grade-highlight">{studentProject.OverAllGrade}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="banner-gauge">
                <div className="gauge-circle-outer">
                  <div className="gauge-text">
                    <span className="gauge-number">{studentProject.ProgressPercentage}%</span>
                    <span className="gauge-sub">Complete</span>
                  </div>
                </div>
                <div className="gauge-tasks-summary">
                  {studentProject.TotalCompletedTasks} / {studentProject.TotalTasksGiven} Tasks Finished
                </div>
              </div>
            </div>

            {/* Task list tracking */}
            <div className="student-tasks-section">
              <div className="section-title-row">
                <h3 className="section-title">Milestone Tasks & Scores</h3>
                <span className="task-count-pill">{studentTasks.length} Assigned Tasks</span>
              </div>

              <div className="tasks-cards-stack">
                {studentTasks.length === 0 ? (
                  <p className="empty-tasks-text">No tasks have been created for this project yet.</p>
                ) : (
                  studentTasks.map((task) => (
                    <div className="glass-card task-item-card" key={task.TaskID}>
                      <div className="task-card-main-header">
                        <div className="task-title-group">
                          <h4 className="task-title">{task.TaskTitle}</h4>
                          <p className="task-desc">{task.TaskDescription}</p>
                        </div>
                        <div className="task-badges-row">
                          <span className={`badge ${task.PriorityCssClass}`}>{task.PriorityName}</span>
                          <span className={`badge ${task.StatusCssClass}`}>{task.StatusName}</span>
                        </div>
                      </div>

                      <div className="task-timeline-row">
                        <div className="timeline-date-item">
                          <span className="date-label">Start Date</span>
                          <span className="date-val">{task.TaskStartDate || 'N/A'}</span>
                        </div>
                        <div className="timeline-date-item">
                          <span className="date-label">Due Date</span>
                          <span className="date-val">{task.TaskDueDate || 'N/A'}</span>
                        </div>
                        <div className="timeline-date-item">
                          <span className="date-label">Completed</span>
                          <span className="date-val">{task.TaskCompletedDate || 'N/A'}</span>
                        </div>
                        <div className="timeline-date-item">
                          <span className="date-label">Next Follow-up</span>
                          <span className="date-val">{task.NextFollowUpDate || 'N/A'}</span>
                        </div>
                      </div>

                      {/* Scores & Remarks */}
                      <div className="task-evaluation-box">
                        <div className="scores-columns">
                          <div className="score-badge-item">
                            <span className="score-title">Max Points</span>
                            <span className="score-value-bold">{task.AssignedScore.toFixed(1)}</span>
                          </div>
                          <div className="score-badge-item">
                            <span className="score-title">Earned Points</span>
                            <span className="score-value-bold earned-color">
                              {task.EarnedScore !== null ? task.EarnedScore.toFixed(1) : '—'}
                            </span>
                          </div>
                        </div>

                        <div className="remarks-columns">
                          <div className="remark-bubble">
                            <span className="remark-author">Student Remarks:</span>
                            <p className="remark-content">{task.StudentRemarks || 'No remarks provided yet.'}</p>
                          </div>
                          <div className="remark-bubble faculty-bubble">
                            <span className="remark-author">Faculty Feedback:</span>
                            <p className="remark-content italic-text">
                              {task.FacultyRemarks || 'Pending review and grading.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
