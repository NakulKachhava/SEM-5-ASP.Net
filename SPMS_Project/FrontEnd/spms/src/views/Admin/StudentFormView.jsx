// StudentFormView.jsx — Add / Edit Student
import React, { useState } from 'react';
import '../../components/Common/FormView.css';
import { SPM_User } from '../../services/mockData';

const students = SPM_User.filter(u => u.UserTypeID === 3);

export default function StudentFormView({ navigateTo, mode = 'add', entityId }) {
  const existing = mode === 'edit' ? students.find(s => s.UserID === entityId) || students[0] : null;

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
  const back = () => navigateTo('students');

  return (
    <div className="animate-fade-in">
      <button className="form-page-back" onClick={back}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Manage Students
      </button>

      <div className="form-page-layout">
        <div className="form-info-panel">
          <div className="form-info-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
          </div>
          <div className="form-info-title">{mode === 'add' ? 'New Student' : 'Edit Student'}</div>
          <p className="form-info-desc">Register a student in the system. Once added, an administrator can allocate a project and supervisor.</p>
          <ul className="form-info-checklist">
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Enrollment No. must be unique</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Student will be auto-assigned the Student role</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Project allocation can be done separately</li>
          </ul>
          <p className="form-info-required-note">Fields marked with <span style={{color:'#fca5a5'}}>*</span> are required.</p>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <div className={`form-mode-badge ${mode}`}>
              {mode === 'add'
                ? <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>New Student</>
                : <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>Editing: {existing?.FullName}</>}
            </div>
            <h2>{mode === 'add' ? 'Add New Student' : 'Edit Student Details'}</h2>
            <p>Enter the student's personal information and set up their login credentials.</p>
          </div>

          <div className="form-card-body">
            <div className="form-section">
              <div className="form-section-title">Profile Picture</div>
              <div className="form-avatar-upload">
                <img className="form-avatar-preview"
                  src={existing?.ProfilePicturePath || 'https://ui-avatars.com/api/?name=Student&background=6366f1&color=fff'}
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
              <div className="form-section-title">Student Information</div>
              <div className="form-grid">
                <div className="form-field form-col-span-2">
                  <label className="form-label">Full Name <span className="req">*</span></label>
                  <input className="form-input" type="text" value={form.FullName} onChange={e => set('FullName', e.target.value)} placeholder="e.g. Rohan Mehta" />
                </div>
                <div className="form-field">
                  <label className="form-label">Enrollment No. <span className="req">*</span></label>
                  <input className="form-input" type="text" value={form.UserCode} onChange={e => set('UserCode', e.target.value)} placeholder="e.g. STU001" />
                </div>
                <div className="form-field">
                  <label className="form-label">Mobile Number <span className="req">*</span></label>
                  <input className="form-input" type="tel" value={form.MobileNumber} onChange={e => set('MobileNumber', e.target.value)} placeholder="+91 98XXXXXXXX" />
                </div>
                <div className="form-field form-col-span-2">
                  <label className="form-label">Email Address <span className="req">*</span></label>
                  <input className="form-input" type="email" value={form.Email} onChange={e => set('Email', e.target.value)} placeholder="student@university.edu" />
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
              {mode === 'add' ? 'Register Student' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
