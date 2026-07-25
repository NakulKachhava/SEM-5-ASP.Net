// RoleFormView.jsx — Add / Edit Role
import React, { useState } from 'react';
import '../../components/Common/FormView.css';
import { SPM_Role } from '../../services/mockData';

export default function RoleFormView({ navigateTo, mode = 'add', entityId }) {
  const existing = mode === 'edit' ? SPM_Role.find(r => r.RoleID === entityId) || SPM_Role[0] : null;

  const [form, setForm] = useState({
    RoleName: existing?.RoleName || '',
    Description: existing?.Description || '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const back = () => navigateTo('roles');

  return (
    <div className="animate-fade-in">
      <button className="form-page-back" onClick={back}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Manage Roles
      </button>

      <div className="form-page-layout">
        {/* Info Panel */}
        <div className="form-info-panel">
          <div className="form-info-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div className="form-info-title">{mode === 'add' ? 'New System Role' : 'Edit Role'}</div>
          <p className="form-info-desc">Roles define what a user can access within the system. Assign roles carefully to maintain data security.</p>
          <ul className="form-info-checklist">
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Role names must be unique across the system</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Changing a role name affects all assigned users</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Default roles (Admin, Faculty, Student) are protected</li>
          </ul>
          <p className="form-info-required-note">Fields marked with <span style={{color:'#fca5a5'}}>*</span> are required.</p>
        </div>

        {/* Form Card */}
        <div className="form-card">
          <div className="form-card-header">
            <div className={`form-mode-badge ${mode}`}>
              {mode === 'add'
                ? <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg> New Role</>
                : <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> Editing: {existing?.RoleName}</>}
            </div>
            <h2>{mode === 'add' ? 'Add New Role' : 'Edit Role Details'}</h2>
            <p>Define the role name and describe what permissions this role is associated with.</p>
          </div>

          <div className="form-card-body">
            <div className="form-section">
              <div className="form-section-title">Role Information</div>
              <div className="form-grid">
                <div className="form-field form-col-span-2">
                  <label className="form-label">Role Name <span className="req">*</span></label>
                  <input className="form-input" type="text" value={form.RoleName} onChange={e => set('RoleName', e.target.value)} placeholder="e.g. Admin, Faculty, Student" />
                </div>
                <div className="form-field form-col-span-2">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" rows={4} value={form.Description} onChange={e => set('Description', e.target.value)} placeholder="Describe the responsibilities and access level of this role..." />
                </div>
              </div>
            </div>
          </div>

          <div className="form-card-footer">
            <button className="form-cancel-btn" onClick={back}>Cancel</button>
            <button className="form-save-btn">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {mode === 'add' ? 'Create Role' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
