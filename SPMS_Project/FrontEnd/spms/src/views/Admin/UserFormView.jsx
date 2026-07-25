// UserFormView.jsx — Add / Edit User
import React, { useState } from 'react';
import '../../components/Common/FormView.css';
import { SPM_User, SPM_Role, SPM_UserType } from '../../services/mockData';

export default function UserFormView({ navigateTo, mode = 'add', entityId }) {
  const existing = mode === 'edit' ? SPM_User.find(u => u.UserID === entityId) || SPM_User[0] : null;

  const [form, setForm] = useState({
    FullName: existing?.FullName || '',
    UserCode: existing?.UserCode || '',
    Email: existing?.Email || '',
    MobileNumber: existing?.MobileNumber || '',
    Password: '',
    ConfirmPassword: '',
    RoleID: 1,
    UserTypeID: existing?.UserTypeID || 1,
    IsActive: existing?.IsActive ?? true,
  });
  const [showPwd, setShowPwd] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const back = () => navigateTo('users');

  return (
    <div className="animate-fade-in">
      <button className="form-page-back" onClick={back}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Manage Users
      </button>

      <div className="form-page-layout">
        <div className="form-info-panel">
          <div className="form-info-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <div className="form-info-title">{mode === 'add' ? 'New System User' : 'Edit User'}</div>
          <p className="form-info-desc">Create a user account with login credentials and assign their role within the system.</p>
          <ul className="form-info-checklist">
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Email address must be unique and valid</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>User Code is the system identifier</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Password must be at least 8 characters</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Role determines module access</li>
          </ul>
          <p className="form-info-required-note">Fields marked with <span style={{color:'#fca5a5'}}>*</span> are required.</p>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <div className={`form-mode-badge ${mode}`}>
              {mode === 'add'
                ? <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>New User</>
                : <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>Editing: {existing?.FullName}</>}
            </div>
            <h2>{mode === 'add' ? 'Add New User' : 'Edit User Details'}</h2>
            <p>Fill in the user's personal details, credentials, and role assignment.</p>
          </div>

          <div className="form-card-body">
            <div className="form-section">
              <div className="form-section-title">Profile Picture</div>
              <div className="form-avatar-upload">
                <img className="form-avatar-preview"
                  src={existing?.ProfilePicturePath || 'https://ui-avatars.com/api/?name=New+User&background=6366f1&color=fff'}
                  alt="Preview" />
                <div className="form-avatar-upload-btn">
                  <div className="avatar-upload-cta">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    Upload Photo
                  </div>
                  <span className="form-hint">JPG or PNG, max 2MB</span>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Personal Information</div>
              <div className="form-grid">
                <div className="form-field form-col-span-2">
                  <label className="form-label">Full Name <span className="req">*</span></label>
                  <input className="form-input" type="text" value={form.FullName} onChange={e => set('FullName', e.target.value)} placeholder="e.g. Rohan Mehta" />
                </div>
                <div className="form-field">
                  <label className="form-label">User Code <span className="req">*</span></label>
                  <input className="form-input" type="text" value={form.UserCode} onChange={e => set('UserCode', e.target.value)} placeholder="e.g. STU001 / FAC001" />
                </div>
                <div className="form-field">
                  <label className="form-label">Mobile Number <span className="req">*</span></label>
                  <input className="form-input" type="tel" value={form.MobileNumber} onChange={e => set('MobileNumber', e.target.value)} placeholder="+91 98XXXXXXXX" />
                </div>
                <div className="form-field form-col-span-2">
                  <label className="form-label">Email Address <span className="req">*</span></label>
                  <input className="form-input" type="email" value={form.Email} onChange={e => set('Email', e.target.value)} placeholder="user@example.com" />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Role & Access</div>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">System Role <span className="req">*</span></label>
                  <select className="form-select" value={form.RoleID} onChange={e => set('RoleID', Number(e.target.value))}>
                    {SPM_Role.map(r => <option key={r.RoleID} value={r.RoleID}>{r.RoleName}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">User Type <span className="req">*</span></label>
                  <select className="form-select" value={form.UserTypeID} onChange={e => set('UserTypeID', Number(e.target.value))}>
                    {SPM_UserType.map(t => <option key={t.UserTypeID} value={t.UserTypeID}>{t.UserTypeName}</option>)}
                  </select>
                </div>
                <div className="form-field form-col-span-2">
                  <label className="form-label">Account Status</label>
                  <div className="form-toggle-row">
                    <span className="form-toggle-label">{form.IsActive ? 'Account is Active' : 'Account is Inactive'}</span>
                    <div className={`form-toggle ${form.IsActive ? '' : 'off'}`} onClick={() => set('IsActive', !form.IsActive)}>
                      <div className="form-toggle-thumb" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">{mode === 'add' ? 'Set Password' : 'Change Password (leave blank to keep current)'}</div>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Password {mode === 'add' && <span className="req">*</span>}</label>
                  <div className="form-password-wrapper">
                    <input className="form-input" type={showPwd ? 'text' : 'password'} value={form.Password} onChange={e => set('Password', e.target.value)} placeholder="Min. 8 characters" />
                    <button className="form-password-toggle" onClick={() => setShowPwd(s => !s)}>
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPwd ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} /></svg>
                    </button>
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Confirm Password {mode === 'add' && <span className="req">*</span>}</label>
                  <input className="form-input" type={showPwd ? 'text' : 'password'} value={form.ConfirmPassword} onChange={e => set('ConfirmPassword', e.target.value)} placeholder="Re-enter password" />
                </div>
              </div>
            </div>
          </div>

          <div className="form-card-footer">
            <button className="form-cancel-btn" onClick={back}>Cancel</button>
            <button className="form-save-btn">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {mode === 'add' ? 'Create User' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
