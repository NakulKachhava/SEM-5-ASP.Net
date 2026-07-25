// MyProjectView.jsx (Student)
import React from 'react';
import PageShell from '../../components/Common/PageShell';
import '../../components/Common/PageShell.css';
import '../../components/Common/SharedTable.css';
import './MyProjectView.css';
import { SPM_ProjectAllocation, SPM_ProjectMaster, SPM_User, SPM_Task, SPM_TaskStatus } from '../../services/mockData';

const STUDENT_ID = 4; // Rohan Mehta
const alloc = SPM_ProjectAllocation.find(a => a.StudentID === STUDENT_ID);
const master = alloc ? SPM_ProjectMaster.find(m => m.ProjectID === alloc.ProjectID) : null;
const faculty = alloc ? SPM_User.find(u => u.UserID === alloc.FacultyID) : null;
const tasks = alloc ? SPM_Task.filter(t => t.ProjectAllocationID === alloc.ProjectAllocationID) : [];

const getTaskStatusName = (id) => SPM_TaskStatus.find(s => s.TaskStatusID === id)?.TaskStatusName || '—';
const getTaskStatusClass = (id) => SPM_TaskStatus.find(s => s.TaskStatusID === id)?.TaskStatusCssClass || '';

// Timeline milestones (derived from tasks, sorted by start date)
const sortedTasks = [...tasks].sort((a, b) => new Date(a.TaskStartDate) - new Date(b.TaskStartDate));

export default function MyProjectView() {
  if (!alloc || !master) {
    return (
      <div className="animate-fade-in">
        <PageShell title="My Project" subtitle="Your allocated academic project details." breadcrumb="My Project" />
        <div className="glass-card empty-state-card">
          <p>You have not been allocated to any project yet. Please contact the administrator.</p>
        </div>
      </div>
    );
  }

  const progressPct = alloc.ProgressPercentage;

  return (
    <div className="animate-fade-in">
      <PageShell
        title="My Project"
        subtitle="View your project details, supervisor info, timeline, and task milestones."
        breadcrumb="My Project"
      />

      {/* Top Overview Banner */}
      <div className="glass-card myproject-banner">
        <div className="mpb-left">
          <div className="mpb-tag">Allocated Academic Project</div>
          <h2 className="mpb-title">{master.ProjectTitle}</h2>
          <p className="mpb-desc">{master.Description}</p>

          <div className="mpb-meta-grid">
            <div className="mpb-meta-item">
              <span className="mpb-meta-label">Supervisor</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                <img src={faculty.ProfilePicturePath} alt={faculty.FullName}
                  style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }} />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{faculty.FullName}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{faculty.Email}</div>
                </div>
              </div>
            </div>
            <div className="mpb-meta-item">
              <span className="mpb-meta-label">Assigned Date</span>
              <span className="mpb-meta-value">{alloc.ProjectStartDate}</span>
            </div>
            <div className="mpb-meta-item">
              <span className="mpb-meta-label">Deadline</span>
              <span className="mpb-meta-value">{alloc.ProjectEndDate}</span>
            </div>
            {alloc.OverAllGrade && (
              <div className="mpb-meta-item">
                <span className="mpb-meta-label">Overall Grade</span>
                <span className="grade-highlight">{alloc.OverAllGrade}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mpb-right">
          <div className="mpb-gauge">
            <svg viewBox="0 0 120 120" className="gauge-svg">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border-color)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="50" fill="none"
                stroke="url(#gaugeGrad)" strokeWidth="10"
                strokeDasharray={`${(progressPct / 100) * 314} 314`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
              <defs>
                <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="mpb-gauge-text">
              <span className="mpb-gauge-pct">{progressPct}%</span>
              <span className="mpb-gauge-sub">Complete</span>
            </div>
          </div>
          <div className="mpb-task-summary">
            <div className="mpb-ts-item">
              <span className="mpb-ts-val" style={{ color: 'var(--color-primary)' }}>{alloc.TotalTasksGiven}</span>
              <span className="mpb-ts-label">Total Tasks</span>
            </div>
            <div className="mpb-ts-divider" />
            <div className="mpb-ts-item">
              <span className="mpb-ts-val" style={{ color: '#10b981' }}>{alloc.TotalCompletedTasks}</span>
              <span className="mpb-ts-label">Completed</span>
            </div>
            <div className="mpb-ts-divider" />
            <div className="mpb-ts-item">
              <span className="mpb-ts-val" style={{ color: '#f59e0b' }}>{alloc.TotalTasksGiven - alloc.TotalCompletedTasks}</span>
              <span className="mpb-ts-label">Remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Timeline */}
      <div className="myproject-section-title">
        <h3>Project Milestones</h3>
        <span className="task-count-pill">{tasks.length} Milestones</span>
      </div>

      <div className="timeline-container">
        {sortedTasks.map((task, idx) => {
          const statusClass = getTaskStatusClass(task.TaskStatusID);
          const statusName = getTaskStatusName(task.TaskStatusID);
          const isDone = task.TaskStatusID === 3;
          return (
            <div className="timeline-item" key={task.TaskID}>
              <div className={`timeline-dot ${isDone ? 'dot-done' : idx === 0 ? 'dot-active' : 'dot-pending'}`}>
                {isDone && (
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              {idx < sortedTasks.length - 1 && <div className={`timeline-line ${isDone ? 'line-done' : 'line-pending'}`} />}
              <div className="timeline-card glass-card">
                <div className="tc-header">
                  <div>
                    <span className="td-code" style={{ fontSize: '0.72rem' }}>TASK-{String(task.TaskID).padStart(3,'0')}</span>
                    <h4 className="tc-title">{task.TaskTitle}</h4>
                  </div>
                  <span className={`badge ${statusClass}`}>{statusName}</span>
                </div>
                <p className="tc-desc">{task.TaskDescription}</p>
                <div className="tc-footer">
                  <span className="sc-date-chip">
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Due: {task.TaskDueDate || 'TBD'}
                  </span>
                  <span style={{ fontWeight: 700, color: task.EarnedScore != null ? '#10b981' : 'var(--text-muted)', fontSize: '0.82rem' }}>
                    Score: {task.EarnedScore != null ? `${task.EarnedScore}/${task.AssignedScore}` : `—/${task.AssignedScore}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
