// ScoreFormView.jsx — Grade / Update Task Score (Faculty)
import React, { useState } from 'react';
import '../../components/Common/FormView.css';
import { SPM_Task, SPM_TaskStatus, SPM_TaskPriority, SPM_ProjectAllocation, SPM_ProjectMaster, SPM_User } from '../../services/mockData';

const FACULTY_ID = 2;
const myAllocIDs = SPM_ProjectAllocation.filter(a => a.FacultyID === FACULTY_ID).map(a => a.ProjectAllocationID);
const myTasks = SPM_Task.filter(t => myAllocIDs.includes(t.ProjectAllocationID));

export default function ScoreFormView({ navigateTo, mode = 'grade', entityId }) {
  const task = myTasks.find(t => t.TaskID === entityId) || myTasks[0];
  const alloc = task ? SPM_ProjectAllocation.find(a => a.ProjectAllocationID === task.ProjectAllocationID) : null;
  const student = alloc ? SPM_User.find(u => u.UserID === alloc.StudentID) : null;
  const project = alloc ? SPM_ProjectMaster.find(p => p.ProjectID === alloc.ProjectID) : null;
  const status = task ? SPM_TaskStatus.find(s => s.TaskStatusID === task.TaskStatusID) : null;
  const priority = task ? SPM_TaskPriority.find(p => p.TaskPriorityID === task.TaskPriorityID) : null;

  const [form, setForm] = useState({
    EarnedScore: task?.EarnedScore ?? '',
    FacultyRemarks: task?.FacultyRemarks || '',
    TaskStatusID: task?.TaskStatusID || 1,
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const back = () => navigateTo('scores');

  const pct = form.EarnedScore !== '' && task ? ((Number(form.EarnedScore) / task.AssignedScore) * 100).toFixed(1) : null;

  return (
    <div className="animate-fade-in">
      <button className="form-page-back" onClick={back}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Scores & Remarks
      </button>

      <div className="form-page-layout">
        <div className="form-info-panel">
          <div className="form-info-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.243.577 1.83l-3.97 2.885a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.885a1 1 0 00-1.18 0l-3.97 2.885c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.83.577-1.83h4.906a1 1 0 00.951-.69l1.519-4.674z" /></svg>
          </div>
          <div className="form-info-title">Grade Task</div>
          <p className="form-info-desc">Evaluate the student's submission and provide a score with constructive feedback.</p>
          <ul className="form-info-checklist">
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Earned score cannot exceed assigned maximum</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Faculty remarks are visible to the student</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Update status to Graded after scoring</li>
          </ul>

          {/* Live score preview */}
          {pct !== null && (
            <div style={{ marginTop: 20, padding: '14px 16px', background: 'rgba(255,255,255,0.15)', borderRadius: 10, textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff' }}>{pct}%</div>
              <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>{form.EarnedScore} / {task.AssignedScore} pts</div>
            </div>
          )}
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <div className="form-mode-badge edit">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.243.577 1.83l-3.97 2.885a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.885a1 1 0 00-1.18 0l-3.97 2.885c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.83.577-1.83h4.906a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              Task Evaluation
            </div>
            <h2>Grade Task Submission</h2>
            <p>Review the task details, assign an earned score, and write evaluation feedback.</p>
          </div>

          <div className="form-card-body">
            {/* Read-only Task Summary */}
            <div className="form-section">
              <div className="form-section-title">Task Summary (Read-Only)</div>
              <div className="score-readonly-card">
                <div className="score-readonly-row">
                  <span className="score-readonly-key">Task</span>
                  <span className="score-readonly-val">
                    <span style={{ fontSize: '0.72rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontWeight: 700, padding: '2px 8px', borderRadius: 4, marginRight: 8 }}>
                      TASK-{String(task?.TaskID).padStart(3, '0')}
                    </span>
                    {task?.TaskTitle}
                  </span>
                </div>
                <div className="score-readonly-row">
                  <span className="score-readonly-key">Student</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src={student?.ProfilePicturePath} alt="" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                    <span className="score-readonly-val">{student?.FullName} ({student?.UserCode})</span>
                  </div>
                </div>
                <div className="score-readonly-row">
                  <span className="score-readonly-key">Project</span>
                  <span className="score-readonly-val">{project?.ProjectTitle}</span>
                </div>
                <div className="score-readonly-row">
                  <span className="score-readonly-key">Due Date</span>
                  <span className="score-readonly-val">{task?.TaskDueDate || 'N/A'}</span>
                </div>
                <div className="score-readonly-row">
                  <span className="score-readonly-key">Priority / Status</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span className={`badge ${priority?.TaskPriortyCssClass}`}>{priority?.TaskPriorityName}</span>
                    <span className={`badge ${status?.TaskStatusCssClass}`}>{status?.TaskStatusName}</span>
                  </div>
                </div>
                {task?.StudentRemarks && (
                  <div style={{ paddingTop: 10, borderTop: '1px solid var(--border-color)' }}>
                    <div className="score-readonly-key" style={{ marginBottom: 4 }}>Student Remarks</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{task.StudentRemarks}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Scoring Section */}
            <div className="form-section">
              <div className="form-section-title">Score & Status</div>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Max Points (Assigned)</label>
                  <input className="form-input readonly" type="number" value={task?.AssignedScore} readOnly />
                </div>
                <div className="form-field">
                  <label className="form-label">Earned Score <span className="req">*</span></label>
                  <input className="form-input" type="number" min={0} max={task?.AssignedScore} step={0.5}
                    value={form.EarnedScore} onChange={e => set('EarnedScore', e.target.value)}
                    placeholder={`0 — ${task?.AssignedScore}`} />
                </div>
                <div className="form-field form-col-span-2">
                  <label className="form-label">Update Task Status</label>
                  <select className="form-select" value={form.TaskStatusID} onChange={e => set('TaskStatusID', Number(e.target.value))}>
                    {[{ TaskStatusID: 1, TaskStatusName: 'Pending' }, { TaskStatusID: 2, TaskStatusName: 'In Progress' }, { TaskStatusID: 3, TaskStatusName: 'Completed' }, { TaskStatusID: 4, TaskStatusName: 'Rejected' }].map(s =>
                      <option key={s.TaskStatusID} value={s.TaskStatusID}>{s.TaskStatusName}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Faculty Feedback</div>
              <div className="form-field">
                <label className="form-label">Evaluation Remarks <span className="req">*</span></label>
                <textarea className="form-textarea" rows={5} value={form.FacultyRemarks} onChange={e => set('FacultyRemarks', e.target.value)}
                  placeholder="Provide constructive feedback on the student's work, areas of improvement, and commendations..." />
              </div>
            </div>
          </div>

          <div className="form-card-footer">
            <button className="form-cancel-btn" onClick={back}>Cancel</button>
            <button className="form-save-btn">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Submit Evaluation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
