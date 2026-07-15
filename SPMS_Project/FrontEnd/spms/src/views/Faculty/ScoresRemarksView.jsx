// ScoresRemarksView.jsx (Faculty)
import React from 'react';
import PageShell from '../../components/Common/PageShell';
import '../../components/Common/PageShell.css';
import '../../components/Common/SharedTable.css';
import './ScoresRemarksView.css';
import { SPM_Task, SPM_TaskStatus, SPM_TaskPriority, SPM_ProjectAllocation, SPM_ProjectMaster, SPM_User } from '../../services/mockData';

const FACULTY_ID = 2;
const facultyAllocIDs = SPM_ProjectAllocation.filter(a => a.FacultyID === FACULTY_ID).map(a => a.ProjectAllocationID);

const tasks = SPM_Task.filter(t => facultyAllocIDs.includes(t.ProjectAllocationID)).map(task => {
  const statusObj = SPM_TaskStatus.find(s => s.TaskStatusID === task.TaskStatusID);
  const priorityObj = SPM_TaskPriority.find(p => p.TaskPriorityID === task.TaskPriorityID);
  const alloc = SPM_ProjectAllocation.find(a => a.ProjectAllocationID === task.ProjectAllocationID);
  const student = alloc ? SPM_User.find(u => u.UserID === alloc.StudentID) : null;
  const master = alloc ? SPM_ProjectMaster.find(m => m.ProjectID === alloc.ProjectID) : null;
  return { ...task, StatusName: statusObj?.TaskStatusName, StatusCssClass: statusObj?.TaskStatusCssClass, PriorityName: priorityObj?.TaskPriorityName, PriorityCssClass: priorityObj?.TaskPriortyCssClass, StudentName: student?.FullName, StudentCode: student?.UserCode, StudentAvatar: student?.ProfilePicturePath, ProjectTitle: master?.ProjectTitle };
});

export default function ScoresRemarksView() {
  return (
    <div className="animate-fade-in">
      <PageShell
        title="Scores & Remarks"
        subtitle="Review submitted tasks, assign scores, and provide evaluation feedback to students."
        breadcrumb="Scores & Remarks"
      />

      {/* Filter Bar */}
      <div className="glass-card filter-bar">
        <div className="filter-search-wrapper">
          <svg className="filter-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input className="filter-search-input" type="text" placeholder="Search by task title or student..." disabled />
        </div>
        <select className="filter-select" disabled>
          <option>All Projects</option>
          <option>E-Commerce Platform</option>
          <option>AI Chatbot</option>
        </select>
        <select className="filter-select" disabled>
          <option>All Status</option>
          <option>Pending Review</option>
          <option>Graded</option>
        </select>
        <span className="filter-results-count">{tasks.length} tasks found</span>
      </div>

      {/* Score Cards */}
      <div className="score-cards-grid">
        {tasks.map((task) => {
          const scored = task.EarnedScore !== null;
          return (
            <div className="glass-card score-card" key={task.TaskID}>
              {/* Card Top */}
              <div className="score-card-top">
                <div className="score-card-student-info">
                  <img src={task.StudentAvatar} alt={task.StudentName}
                    style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }} />
                  <div>
                    <div className="sc-student-name">{task.StudentName}</div>
                    <div className="sc-code">{task.StudentCode} · {task.ProjectTitle}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className={`badge ${task.PriorityCssClass}`}>{task.PriorityName}</span>
                  <span className={`badge ${task.StatusCssClass}`}>{task.StatusName}</span>
                </div>
              </div>

              {/* Task Title & Description */}
              <div className="score-task-details">
                <h4 className="sc-task-title">
                  <span className="td-code" style={{ fontSize: '0.73rem' }}>TASK-{String(task.TaskID).padStart(3,'0')}</span>
                  {task.TaskTitle}
                </h4>
                <p className="sc-task-desc">{task.TaskDescription}</p>
                <div className="sc-dates-row">
                  <span className="sc-date-chip">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Due: {task.TaskDueDate || 'N/A'}
                  </span>
                  {task.TaskCompletedDate && (
                    <span className="sc-date-chip completed-chip">
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Submitted: {task.TaskCompletedDate}
                    </span>
                  )}
                </div>
              </div>

              {/* Score Section */}
              <div className="score-evaluation-section">
                <div className="score-input-row">
                  <div className="score-field">
                    <label className="score-field-label">Max Points</label>
                    <div className="score-field-display readonly">{task.AssignedScore.toFixed(1)}</div>
                  </div>
                  <div className="score-field">
                    <label className="score-field-label">Earned Points</label>
                    <div className={`score-field-display ${scored ? 'scored' : 'unscored'}`}>
                      {scored ? task.EarnedScore.toFixed(1) : '—'}
                    </div>
                  </div>
                  <div className="score-field">
                    <label className="score-field-label">Score %</label>
                    <div className={`score-field-display ${scored ? 'scored' : 'unscored'}`}>
                      {scored ? ((task.EarnedScore / task.AssignedScore) * 100).toFixed(0) + '%' : '—'}
                    </div>
                  </div>
                </div>

                {/* Remarks */}
                <div className="remarks-section">
                  <div className="remark-block">
                    <label className="score-field-label">Student Remarks</label>
                    <div className="remark-display student-remark">{task.StudentRemarks || 'No remarks submitted.'}</div>
                  </div>
                  <div className="remark-block">
                    <label className="score-field-label">Faculty Feedback</label>
                    <div className={`remark-display faculty-remark ${!task.FacultyRemarks ? 'pending-remark' : ''}`}>
                      {task.FacultyRemarks || 'Pending evaluation...'}
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="score-card-actions">
                  <button className="page-action-btn" disabled style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    {scored ? 'Update Score' : 'Grade Task'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
