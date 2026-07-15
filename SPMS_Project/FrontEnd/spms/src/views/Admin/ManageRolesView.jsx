// ManageRolesView.jsx
import React from 'react';
import PageShell from '../../components/Common/PageShell';
import '../../components/Common/PageShell.css';
import '../../components/Common/SharedTable.css';
import { SPM_Role } from '../../services/mockData';

export default function ManageRolesView() {
  return (
    <div className="animate-fade-in">
      <PageShell
        title="Manage Roles"
        subtitle="Define system access roles and their responsibilities."
        breadcrumb="Manage Roles"
        actionLabel="+ Add Role"
        actionIcon="M12 4v16m8-8H4"
      />

      {/* Filter Bar */}
      <div className="glass-card filter-bar">
        <div className="filter-search-wrapper">
          <svg className="filter-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input className="filter-search-input" type="text" placeholder="Search by role name..." disabled />
        </div>
        <span className="filter-results-count">{SPM_Role.length} roles found</span>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Role ID</th>
                <th>Role Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {SPM_Role.map((role, idx) => (
                <tr key={role.RoleID}>
                  <td className="td-muted">{idx + 1}</td>
                  <td><span className="td-code">ROLE-{String(role.RoleID).padStart(3, '0')}</span></td>
                  <td className="td-primary">{role.RoleName}</td>
                  <td className="td-secondary">{role.Description}</td>
                  <td>
                    <div className="td-actions">
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
          <span className="table-footer-info">Showing {SPM_Role.length} of {SPM_Role.length} entries</span>
          <div className="pagination-btns">
            <button className="page-btn active">1</button>
          </div>
        </div>
      </div>
    </div>
  );
}
