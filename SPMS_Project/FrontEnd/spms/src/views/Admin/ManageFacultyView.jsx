// ManageFacultyView.jsx
import React from 'react';
import PageShell from '../../components/Common/PageShell';
import '../../components/Common/PageShell.css';
import '../../components/Common/SharedTable.css';
import { SPM_User, SPM_ProjectAllocation } from '../../services/mockData';

const faculty = SPM_User.filter(u => u.UserTypeID === 2).map(f => {
  const supervisedCount = SPM_ProjectAllocation.filter(a => a.FacultyID === f.UserID).length;
  const activeCount = SPM_ProjectAllocation.filter(a => a.FacultyID === f.UserID && a.ProgressPercentage > 0 && a.ProgressPercentage < 100).length;
  return { ...f, supervisedCount, activeCount };
});

export default function ManageFacultyView() {
  return (
    <div className="animate-fade-in">
      <PageShell
        title="Manage Faculty"
        subtitle="Overview of all supervisors, their supervision load, and active project counts."
        breadcrumb="Manage Faculty"
        actionLabel="+ Add Faculty"
        actionIcon="M12 4v16m8-8H4"
      />

      {/* Filter Bar */}
      <div className="glass-card filter-bar">
        <div className="filter-search-wrapper">
          <svg className="filter-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input className="filter-search-input" type="text" placeholder="Search by name or faculty code..." disabled />
        </div>
        <select className="filter-select" disabled>
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <span className="filter-results-count">{faculty.length} faculty found</span>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Faculty Code</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Total Projects</th>
                <th>Active Projects</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((f, idx) => (
                <tr key={f.UserID}>
                  <td className="td-muted">{idx + 1}</td>
                  <td><span className="td-code">{f.UserCode}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={f.ProfilePicturePath} alt={f.FullName}
                        style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border-color)' }} />
                      <span className="td-primary">{f.FullName}</span>
                    </div>
                  </td>
                  <td className="td-secondary">{f.Email}</td>
                  <td className="td-secondary">{f.MobileNumber}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1rem' }}>{f.supervisedCount}</span>
                    <span className="td-muted" style={{ marginLeft: 4 }}>projects</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--color-inprogress)', fontSize: '1rem' }}>{f.activeCount}</span>
                    <span className="td-muted" style={{ marginLeft: 4 }}>active</span>
                  </td>
                  <td><span className={`badge ${f.IsActive ? 'status-completed' : 'status-rejected'}`}>{f.IsActive ? 'Active' : 'Inactive'}</span></td>
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
          <span className="table-footer-info">Showing {faculty.length} of {faculty.length} entries</span>
          <div className="pagination-btns"><button className="page-btn active">1</button></div>
        </div>
      </div>
    </div>
  );
}
