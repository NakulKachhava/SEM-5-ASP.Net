// ManageStudentsView.jsx
import React from 'react';
import PageShell from '../../components/Common/PageShell';
import '../../components/Common/PageShell.css';
import '../../components/Common/SharedTable.css';
import { SPM_User, SPM_ProjectAllocation, SPM_ProjectMaster, SPM_User as Users } from '../../services/mockData';

const students = SPM_User.filter(u => u.UserTypeID === 3).map(student => {
  const alloc = SPM_ProjectAllocation.find(a => a.StudentID === student.UserID);
  const project = alloc ? SPM_ProjectMaster.find(p => p.ProjectID === alloc.ProjectID) : null;
  const faculty = alloc ? Users.find(u => u.UserID === alloc.FacultyID) : null;

  let statusName = 'Unassigned';
  let statusClass = 'status-pending';
  if (alloc) {
    if (alloc.ProgressPercentage === 100) { statusName = 'Completed'; statusClass = 'status-completed'; }
    else if (alloc.ProgressPercentage > 0) { statusName = 'In Progress'; statusClass = 'status-inprogress'; }
    else { statusName = 'Pending'; statusClass = 'status-pending'; }
  }

  return { ...student, alloc, project, faculty, statusName, statusClass };
});

export default function ManageStudentsView() {
  return (
    <div className="animate-fade-in">
      <PageShell
        title="Manage Students"
        subtitle="Overview of all enrolled students, their allocated projects, and progress."
        breadcrumb="Manage Students"
        actionLabel="+ Add Student"
        actionIcon="M12 4v16m8-8H4"
      />

      {/* Filter Bar */}
      <div className="glass-card filter-bar">
        <div className="filter-search-wrapper">
          <svg className="filter-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input className="filter-search-input" type="text" placeholder="Search by name or code..." disabled />
        </div>
        <select className="filter-select" disabled>
          <option>All Project Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Unassigned</option>
        </select>
        <span className="filter-results-count">{students.length} students found</span>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Enroll No.</th>
                <th>Student Name</th>
                <th>Email</th>
                <th>Assigned Project</th>
                <th>Supervisor</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => (
                <tr key={s.UserID}>
                  <td className="td-muted">{idx + 1}</td>
                  <td><span className="td-code">{s.UserCode}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={s.ProfilePicturePath} alt={s.FullName}
                        style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border-color)' }} />
                      <div>
                        <div className="td-primary">{s.FullName}</div>
                        <div className="td-muted">{s.MobileNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="td-secondary">{s.Email}</td>
                  <td className="td-secondary">{s.project ? s.project.ProjectTitle : <span className="td-muted">— Not Assigned —</span>}</td>
                  <td className="td-secondary">{s.faculty ? s.faculty.FullName : <span className="td-muted">—</span>}</td>
                  <td className="td-progress">
                    {s.alloc ? (
                      <div className="table-progress-wrap">
                        <span className="table-progress-label">{s.alloc.ProgressPercentage}%</span>
                        <div className="progress-bar-container">
                          <div className="progress-bar-fill" style={{ width: `${s.alloc.ProgressPercentage}%` }} />
                        </div>
                      </div>
                    ) : <span className="td-muted">—</span>}
                  </td>
                  <td><span className={`badge ${s.statusClass}`}>{s.statusName}</span></td>
                  <td>
                    <div className="td-actions">
                      <button className="action-icon-btn view" disabled title="View">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button className="action-icon-btn edit" disabled title="Edit">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button className="action-icon-btn delete" disabled title="Delete">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span className="table-footer-info">Showing {students.length} of {students.length} entries</span>
          <div className="pagination-btns"><button className="page-btn active">1</button></div>
        </div>
      </div>
    </div>
  );
}
