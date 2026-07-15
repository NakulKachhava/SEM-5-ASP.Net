// FacultyProjectsView.jsx
import React from 'react';
import PageShell from '../../components/Common/PageShell';
import '../../components/Common/PageShell.css';
import '../../components/Common/SharedTable.css';
import { SPM_ProjectAllocation, SPM_ProjectMaster, SPM_User } from '../../services/mockData';

// Faculty 2 = Priya Sharma (used as default for visual display)
const FACULTY_ID = 2;
const projects = SPM_ProjectAllocation.filter(a => a.FacultyID === FACULTY_ID).map(alloc => {
  const master = SPM_ProjectMaster.find(m => m.ProjectID === alloc.ProjectID);
  const student = SPM_User.find(u => u.UserID === alloc.StudentID);
  let statusName = 'Pending'; let statusClass = 'status-pending';
  if (alloc.ProgressPercentage === 100) { statusName = 'Completed'; statusClass = 'status-completed'; }
  else if (alloc.ProgressPercentage > 0) { statusName = 'In Progress'; statusClass = 'status-inprogress'; }
  return { ...alloc, ProjectTitle: master?.ProjectTitle, StudentName: student?.FullName, StudentCode: student?.UserCode, statusName, statusClass };
});

export default function FacultyProjectsView() {
  return (
    <div className="animate-fade-in">
      <PageShell
        title="Manage Projects"
        subtitle="Supervise your allocated student projects and monitor milestone progress."
        breadcrumb="Manage Projects"
      />

      {/* Filter Bar */}
      <div className="glass-card filter-bar">
        <div className="filter-search-wrapper">
          <svg className="filter-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input className="filter-search-input" type="text" placeholder="Search by project title or student name..." disabled />
        </div>
        <select className="filter-select" disabled>
          <option>All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <span className="filter-results-count">{projects.length} projects found</span>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Alloc. ID</th>
                <th>Project Title</th>
                <th>Student</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Tasks</th>
                <th>Progress</th>
                <th>Grade</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, idx) => (
                <tr key={p.ProjectAllocationID}>
                  <td className="td-muted">{idx + 1}</td>
                  <td><span className="td-code">ALLOC-{String(p.ProjectAllocationID).padStart(3, '0')}</span></td>
                  <td className="td-primary">{p.ProjectTitle}</td>
                  <td>
                    <div className="td-primary">{p.StudentName}</div>
                    <div className="td-muted">{p.StudentCode}</div>
                  </td>
                  <td className="td-secondary">{p.ProjectStartDate}</td>
                  <td className="td-secondary">{p.ProjectEndDate}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 700, color: 'var(--color-completed)' }}>{p.TotalCompletedTasks}</span>
                    <span className="td-muted">/{p.TotalTasksGiven}</span>
                  </td>
                  <td className="td-progress">
                    <div className="table-progress-wrap">
                      <span className="table-progress-label">{p.ProgressPercentage}%</span>
                      <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${p.ProgressPercentage}%` }} />
                      </div>
                    </div>
                  </td>
                  <td>
                    {p.OverAllGrade
                      ? <span className="badge status-completed" style={{ fontWeight: 800 }}>{p.OverAllGrade}</span>
                      : <span className="td-muted">—</span>}
                  </td>
                  <td><span className={`badge ${p.statusClass}`}>{p.statusName}</span></td>
                  <td>
                    <div className="td-actions">
                      <button className="action-icon-btn view" disabled title="View Tasks">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button className="action-icon-btn edit" disabled title="Edit">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span className="table-footer-info">Showing {projects.length} of {projects.length} entries</span>
          <div className="pagination-btns"><button className="page-btn active">1</button></div>
        </div>
      </div>
    </div>
  );
}
