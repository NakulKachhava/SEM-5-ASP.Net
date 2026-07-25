// FacultyFormView.jsx — Add / Edit Faculty
import React, { useState } from 'react';
import '../../components/Common/FormView.css';
import { SPM_User } from '../../services/mockData';

const facultyList = SPM_User.filter(u => u.UserTypeID === 2);

export default function FacultyFormView({ navigateTo, mode = 'add', entityId }) {
  const existing = mode === 'edit' ? facultyList.find(f => f.UserID === entityId) || facultyList[0] : null;

  const [form, setForm] = useState({
    FullName: existing?.FullName || '',
    UserCode: existing?.UserCode || '',
    Email: existing?.Email || '',
    MobileNumber: existing?.MobileNumber || '',
    Password: '',
    ConfirmPassword: '',
    IsActive: existing?.IsActive ?? true,
  });
  const [showPwd, setShowPwd] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const back = () => navigateTo('faculty');

  return (
    <div className="animate-fade-in">
      <button className="form-page-back" onClick={back}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Manage Faculty
      </button>

      <div className="form-page-layout">
        <div className="form-info-panel">
          <div className="form-info-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5" /></svg>
          </div>
          <div className="form-info-title">{mode === 'add' ? 'New Faculty' : 'Edit Faculty'}</div>
          <p className="form-info-desc">Register a faculty supervisor. They will be able to supervise student projects and manage tasks.</p>
          <ul className="form-info-checklist">
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Faculty Code is their unique identifier</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Will be auto-assigned the Faculty role</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Can only view their allocated students</li>
          </ul>
          <p className="form-info-required-note">Fields marked with <span style={{color:'#fca5a5'}}>*</span> are required.</p>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <div className={`form-mode-badge ${mode}`}>
              {mode === 'add'
                ? <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>New Faculty</>
                : <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>Editing: {existing?.FullName}</>}
            </div>
            <h2>{mode === 'add' ? 'Add New Faculty' : 'Edit Faculty Details'}</h2>
            <p>Enter the faculty member's profile details and login credentials.</p>
          </div>

          <div className="form-card-body">
            <div className="form-section">
              <div className="form-section-title">Profile Picture</div>
              <div className="form-avatar-upload">
                <img className="form-avatar-preview"
                  src={existing?.ProfilePicturePath || 'https://ui-avatars.com/api/?name=Faculty&background=6366f1&color=fff'}
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
              <div className="form-section-title">Faculty Information</div>
              <div className="form-grid">
                <div className="form-field form-col-span-2">
                  <label className="form-label">Full Name <span className="req">*</span></label>
                  <input className="form-input" type="text" value={form.FullName} onChange={e => set('FullName', e.target.value)} placeholder="e.g. Dr. Priya Sharma" />
                </div>
                <div className="form-field">
                  <label className="form-label">Faculty Code <span className="req">*</span></label>
                  <input className="form-input" type="text" value={form.UserCode} onChange={e => set('UserCode', e.target.value)} placeholder="e.g. FAC001" />
                </div>
                <div className="form-field">
                  <label className="form-label">Mobile Number <span className="req">*</span></label>
                  <input className="form-input" type="tel" value={form.MobileNumber} onChange={e => set('MobileNumber', e.target.value)} placeholder="+91 98XXXXXXXX" />
                </div>
                <div className="form-field form-col-span-2">
                  <label className="form-label">Email Address <span className="req">*</span></label>
                  <input className="form-input" type="email" value={form.Email} onChange={e => set('Email', e.target.value)} placeholder="faculty@university.edu" />
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
              <div className="form-section-title">{mode === 'add' ? 'Set Password' : 'Change Password'}</div>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Password {mode === 'add' && <span className="req">*</span>}</label>
                  <div className="form-password-wrapper">
                    <input className="form-input" type={showPwd ? 'text' : 'password'} value={form.Password} onChange={e => set('Password', e.target.value)} placeholder="Min. 8 characters" />
                    <button className="form-password-toggle" onClick={() => setShowPwd(s => !s)}>
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
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
              {mode === 'add' ? 'Register Faculty' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
