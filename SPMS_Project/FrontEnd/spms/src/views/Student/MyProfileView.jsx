// MyProfileView.jsx (Student)
import React from 'react';
import PageShell from '../../components/Common/PageShell';
import '../../components/Common/PageShell.css';
import './MyProfileView.css';
import { SPM_User, SPM_ProjectAllocation, SPM_ProjectMaster } from '../../services/mockData';

const STUDENT_ID = 4;
const student = SPM_User.find(u => u.UserID === STUDENT_ID);
const alloc = SPM_ProjectAllocation.find(a => a.StudentID === STUDENT_ID);
const master = alloc ? SPM_ProjectMaster.find(m => m.ProjectID === alloc.ProjectID) : null;
const faculty = alloc ? SPM_User.find(u => u.UserID === alloc.FacultyID) : null;

export default function MyProfileView({ navigateTo }) {
  return (
    <div className="animate-fade-in">
      <PageShell
        title="My Profile"
        subtitle="Your personal account information and allocated project summary."
        breadcrumb="My Profile"
      />

      <div className="profile-layout">
        {/* ── Left: Profile Card ── */}
        <div className="profile-left">
          <div className="glass-card profile-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar-wrapper">
                <img src={student.ProfilePicturePath} alt={student.FullName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                <div className="avatar-status-dot" />
              </div>
              <h2 className="profile-name">{student.FullName}</h2>
              <span className="badge status-completed" style={{ fontSize: '0.8rem', padding: '4px 14px' }}>Student</span>
              <p className="profile-code-display">{student.UserCode}</p>
            </div>

            <div className="profile-info-list">
              <div className="profile-info-item">
                <div className="pii-icon">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="pii-label">Email Address</div>
                  <div className="pii-value">{student.Email}</div>
                </div>
              </div>
              <div className="profile-info-item">
                <div className="pii-icon">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="pii-label">Mobile Number</div>
                  <div className="pii-value">{student.MobileNumber}</div>
                </div>
              </div>
              <div className="profile-info-item">
                <div className="pii-icon">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <div>
                  <div className="pii-label">Enrollment No.</div>
                  <div className="pii-value" style={{ fontFamily: 'monospace', color: 'var(--color-primary)', fontWeight: 800 }}>{student.UserCode}</div>
                </div>
              </div>
              <div className="profile-info-item">
                <div className="pii-icon">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="pii-label">Account Status</div>
                  <div className="pii-value">
                    <span className={`badge ${student.IsActive ? 'status-completed' : 'status-rejected'}`}>
                      {student.IsActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button className="page-action-btn" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
              onClick={() => navigateTo('edit-profile')}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
          </div>
        </div>

        {/* ── Right: Project & Supervisor Cards ── */}
        <div className="profile-right">
          {/* Allocated Project */}
          {master && alloc ? (
            <div className="glass-card profile-project-card">
              <div className="ppc-header">
                <div className="ppc-icon-bg">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="pii-label">Allocated Project</div>
                  <h3 className="ppc-title">{master.ProjectTitle}</h3>
                </div>
              </div>
              <p className="ppc-desc">{master.Description}</p>

              <div className="ppc-meta-grid">
                <div className="ppc-meta-item">
                  <span className="pii-label">Start Date</span>
                  <span className="ppc-meta-val">{alloc.ProjectStartDate}</span>
                </div>
                <div className="ppc-meta-item">
                  <span className="pii-label">End Date</span>
                  <span className="ppc-meta-val">{alloc.ProjectEndDate}</span>
                </div>
                <div className="ppc-meta-item">
                  <span className="pii-label">Tasks Given</span>
                  <span className="ppc-meta-val">{alloc.TotalTasksGiven}</span>
                </div>
                <div className="ppc-meta-item">
                  <span className="pii-label">Completed</span>
                  <span className="ppc-meta-val" style={{ color: '#10b981' }}>{alloc.TotalCompletedTasks}</span>
                </div>
              </div>

              <div className="ppc-progress-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span className="pii-label">Milestone Progress</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.85rem' }}>{alloc.ProgressPercentage}%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${alloc.ProgressPercentage}%` }} />
                </div>
              </div>

              {alloc.OverAllGrade && (
                <div style={{ marginTop: 12 }}>
                  <span className="pii-label">Overall Grade: </span>
                  <span className="grade-highlight" style={{ fontSize: '0.95rem' }}>{alloc.OverAllGrade}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card empty-state-card">
              <p>No project allocated yet.</p>
            </div>
          )}

          {/* Supervisor Card */}
          {faculty && (
            <div className="glass-card profile-supervisor-card">
              <div className="pii-label" style={{ marginBottom: 12 }}>My Supervisor</div>
              <div className="supervisor-profile-row">
                <img src={faculty.ProfilePicturePath} alt={faculty.FullName}
                  style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }} />
                <div>
                  <div className="sv-name">{faculty.FullName}</div>
                  <div className="sv-code">{faculty.UserCode}</div>
                </div>
              </div>
              <div className="profile-info-list" style={{ marginTop: 14 }}>
                <div className="profile-info-item">
                  <div className="pii-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <div className="pii-label">Email</div>
                    <div className="pii-value">{faculty.Email}</div>
                  </div>
                </div>
                <div className="profile-info-item">
                  <div className="pii-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <div className="pii-label">Mobile</div>
                    <div className="pii-value">{faculty.MobileNumber}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
