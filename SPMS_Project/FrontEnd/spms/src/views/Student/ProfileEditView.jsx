// ProfileEditView.jsx — Student Edit Profile
import React, { useState } from 'react';
import '../../components/Common/FormView.css';
import { SPM_User } from '../../services/mockData';

const STUDENT_ID = 4;
const student = SPM_User.find(u => u.UserID === STUDENT_ID);

export default function ProfileEditView({ navigateTo }) {
  const [form, setForm] = useState({
    FullName: student?.FullName || '',
    MobileNumber: student?.MobileNumber || '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const back = () => navigateTo('profile');

  return (
    <div className="animate-fade-in">
      <button className="form-page-back" onClick={back}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to My Profile
      </button>

      <div className="form-page-layout">
        <div className="form-info-panel">
          <div className="form-info-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div className="form-info-title">Edit Profile</div>
          <p className="form-info-desc">Keep your contact information up to date so your supervisor can reach you easily.</p>
          <ul className="form-info-checklist">
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Full name and mobile number can be updated</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Email and enrollment number are system-managed</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Contact admin for email or ID changes</li>
          </ul>

          {/* Current Profile Summary */}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={student?.ProfilePicturePath || 'https://ui-avatars.com/api/?name=Student&background=fff&color=6366f1'}
                alt={student?.FullName}
                style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{student?.FullName}</div>
                <div style={{ fontSize: '0.78rem', opacity: 0.8, fontFamily: 'monospace' }}>{student?.UserCode}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <div className="form-mode-badge edit">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Editing Profile
            </div>
            <h2>Update My Profile</h2>
            <p>You can update your name and mobile number. Other details are managed by the administrator.</p>
          </div>

          <div className="form-card-body">
            <div className="form-section">
              <div className="form-section-title">Profile Picture</div>
              <div className="form-avatar-upload">
                <img className="form-avatar-preview" src={student?.ProfilePicturePath || 'https://ui-avatars.com/api/?name=Student&background=6366f1&color=fff'} alt="Profile" />
                <div className="form-avatar-upload-btn">
                  <div className="avatar-upload-cta">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    Change Photo
                  </div>
                  <span className="form-hint">JPG or PNG, max 2MB</span>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Editable Information</div>
              <div className="form-grid">
                <div className="form-field form-col-span-2">
                  <label className="form-label">Full Name <span className="req">*</span></label>
                  <input className="form-input" type="text" value={form.FullName} onChange={e => set('FullName', e.target.value)} placeholder="Your full name" />
                </div>
                <div className="form-field form-col-span-2">
                  <label className="form-label">Mobile Number <span className="req">*</span></label>
                  <input className="form-input" type="tel" value={form.MobileNumber} onChange={e => set('MobileNumber', e.target.value)} placeholder="+91 98XXXXXXXX" />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Read-Only Information</div>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Email Address</label>
                  <input className="form-input readonly" type="text" value={student?.Email || ''} readOnly />
                  <span className="form-hint">Contact admin to update your email.</span>
                </div>
                <div className="form-field">
                  <label className="form-label">Enrollment Number</label>
                  <input className="form-input readonly" type="text" value={student?.UserCode || ''} readOnly />
                </div>
              </div>
            </div>
          </div>

          <div className="form-card-footer">
            <button className="form-cancel-btn" onClick={back}>Cancel</button>
            <button className="form-save-btn">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
