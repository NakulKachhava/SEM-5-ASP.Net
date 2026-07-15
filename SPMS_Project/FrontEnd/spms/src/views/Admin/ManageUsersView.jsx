// ManageUsersView.jsx
import React from 'react';
import PageShell from '../../components/Common/PageShell';
import '../../components/Common/PageShell.css';
import '../../components/Common/SharedTable.css';
import { SPM_User, SPM_UserRole, SPM_Role, SPM_UserType } from '../../services/mockData';

// Join users with roles
const usersWithRoles = SPM_User.map(u => {
  const roleLink = SPM_UserRole.find(ur => ur.UserID === u.UserID);
  const roleObj = SPM_Role.find(r => r.RoleID === (roleLink ? roleLink.RoleID : null));
  const typeObj = SPM_UserType.find(t => t.UserTypeID === u.UserTypeID);
  return {
    ...u,
    RoleName: roleObj ? roleObj.RoleName : 'N/A',
    UserTypeName: typeObj ? typeObj.UserTypeName : 'N/A'
  };
});

export default function ManageUsersView() {
  return (
    <div className="animate-fade-in">
      <PageShell
        title="Manage Users"
        subtitle="View and manage all system users across Admin, Faculty, and Student roles."
        breadcrumb="Manage Users"
        actionLabel="+ Add User"
        actionIcon="M12 4v16m8-8H4"
      />

      {/* Filter Bar */}
      <div className="glass-card filter-bar">
        <div className="filter-search-wrapper">
          <svg className="filter-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input className="filter-search-input" type="text" placeholder="Search by name or email..." disabled />
        </div>
        <select className="filter-select" disabled>
          <option>All Roles</option>
          <option>Admin</option>
          <option>Faculty</option>
          <option>Student</option>
        </select>
        <select className="filter-select" disabled>
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <span className="filter-results-count">{usersWithRoles.length} users found</span>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User Code</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersWithRoles.map((user, idx) => (
                <tr key={user.UserID}>
                  <td className="td-muted">{idx + 1}</td>
                  <td><span className="td-code">{user.UserCode}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={user.ProfilePicturePath}
                        alt={user.FullName}
                        style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border-color)' }}
                      />
                      <span className="td-primary">{user.FullName}</span>
                    </div>
                  </td>
                  <td className="td-secondary">{user.Email}</td>
                  <td className="td-secondary">{user.MobileNumber}</td>
                  <td>
                    <span className={`badge ${
                      user.RoleName === 'Admin' ? 'status-rejected' :
                      user.RoleName === 'Faculty' ? 'status-inprogress' : 'status-completed'
                    }`}>{user.RoleName}</span>
                  </td>
                  <td>
                    <span className={`badge ${user.IsActive ? 'status-completed' : 'status-rejected'}`}>
                      {user.IsActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="td-actions">
                      <button className="action-icon-btn view" disabled title="View">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="action-icon-btn edit" disabled title="Edit">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="action-icon-btn delete" disabled title="Delete">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span className="table-footer-info">Showing {usersWithRoles.length} of {usersWithRoles.length} entries</span>
          <div className="pagination-btns">
            <button className="page-btn active">1</button>
          </div>
        </div>
      </div>
    </div>
  );
}
