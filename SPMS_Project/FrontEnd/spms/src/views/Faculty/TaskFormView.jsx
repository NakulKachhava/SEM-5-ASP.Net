// TaskFormView.jsx — Add / Edit Task (Faculty)
import React, { useState } from 'react';
import '../../components/Common/FormView.css';
import { SPM_Task, SPM_TaskPriority, SPM_TaskStatus, SPM_ProjectAllocation, SPM_ProjectMaster, SPM_User } from '../../services/mockData';

const FACULTY_ID = 2;
const myAllocs = SPM_ProjectAllocation.filter(a => a.FacultyID === FACULTY_ID);

export default function TaskFormView({ navigateTo, mode = 'add', entityId }) {
  const existing = mode === 'edit' ? SPM_Task.find(t => t.TaskID === entityId) || SPM_Task[0] : null;

  const [form, setForm] = useState({
    TaskTitle:        existing?.TaskTitle        || '',
    TaskDescription:  existing?.TaskDescription  || '',
    ProjectAllocationID: existing?.ProjectAllocationID || myAllocs[0]?.ProjectAllocationID || '',
    TaskPriorityID:   existing?.TaskPriorityID   || 2,
    TaskStatusID:     existing?.TaskStatusID     || 1,
    TaskStartDate:    existing?.TaskStartDate    || '',
    TaskDueDate:      existing?.TaskDueDate      || '',
    TaskCompletedDate: existing?.TaskCompletedDate || '',
    AssignedScore:    existing?.AssignedScore    || '',
    NextFollowUpDate: existing?.NextFollowUpDate  || '',
    StudentRemarks:   existing?.StudentRemarks   || '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const back = () => navigateTo('tasks');

  const getAllocLabel = (alloc) => {
    const project = SPM_ProjectMaster.find(p => p.ProjectID === alloc.ProjectID);
    const student = SPM_User.find(u => u.UserID === alloc.StudentID);
    return `${project?.ProjectTitle || 'Project'} — ${student?.FullName || 'Student'}`;
  };

  return (
    <div className="animate-fade-in">
      <button className="form-page-back" onClick={back}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Manage Tasks
      </button>

      <div className="form-page-layout">
        <div className="form-info-panel">
          <div className="form-info-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          </div>
          <div className="form-info-title">{mode === 'add' ? 'New Task' : 'Edit Task'}</div>
          <p className="form-info-desc">Create a task milestone for a student project. Scores and deadlines keep students on track.</p>
          <ul className="form-info-checklist">
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Assign priority to help students plan their work</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Assigned score is the maximum achievable points</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Follow-up date reminds you to review progress</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Completed date is set when student marks task done</li>
          </ul>
          <p className="form-info-required-note">Fields marked with <span style={{color:'#fca5a5'}}>*</span> are required.</p>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <div className={`form-mode-badge ${mode}`}>
              {mode === 'add'
                ? <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>New Task</>
                : <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>Editing: {existing?.TaskTitle}</>}
            </div>
            <h2>{mode === 'add' ? 'Add New Task' : 'Edit Task Details'}</h2>
            <p>Define the task, assign it to a project, and set deadline and scoring criteria.</p>
          </div>

          <div className="form-card-body">
            <div className="form-section">
              <div className="form-section-title">Task Information</div>
              <div className="form-grid">
                <div className="form-field form-col-span-2">
                  <label className="form-label">Task Title <span className="req">*</span></label>
                  <input className="form-input" type="text" value={form.TaskTitle} onChange={e => set('TaskTitle', e.target.value)} placeholder="e.g. Design Database Schema" />
                </div>
                <div className="form-field form-col-span-2">
                  <label className="form-label">Task Description</label>
                  <textarea className="form-textarea" rows={4} value={form.TaskDescription} onChange={e => set('TaskDescription', e.target.value)} placeholder="Describe what needs to be done, deliverables, and acceptance criteria..." />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Assignment & Classification</div>
              <div className="form-grid">
                <div className="form-field form-col-span-2">
                  <label className="form-label">Assign to Project <span className="req">*</span></label>
                  <select className="form-select" value={form.ProjectAllocationID} onChange={e => set('ProjectAllocationID', Number(e.target.value))}>
                    {myAllocs.map(a => <option key={a.ProjectAllocationID} value={a.ProjectAllocationID}>{getAllocLabel(a)}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Priority <span className="req">*</span></label>
                  <select className="form-select" value={form.TaskPriorityID} onChange={e => set('TaskPriorityID', Number(e.target.value))}>
                    {SPM_TaskPriority.map(p => <option key={p.TaskPriorityID} value={p.TaskPriorityID}>{p.TaskPriorityName}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={form.TaskStatusID} onChange={e => set('TaskStatusID', Number(e.target.value))}>
                    {SPM_TaskStatus.map(s => <option key={s.TaskStatusID} value={s.TaskStatusID}>{s.TaskStatusName}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Dates</div>
              <div className="form-grid-3">
                <div className="form-field">
                  <label className="form-label">Start Date</label>
                  <input className="form-input" type="date" value={form.TaskStartDate} onChange={e => set('TaskStartDate', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Due Date</label>
                  <input className="form-input" type="date" value={form.TaskDueDate} onChange={e => set('TaskDueDate', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Next Follow-up</label>
                  <input className="form-input" type="date" value={form.NextFollowUpDate} onChange={e => set('NextFollowUpDate', e.target.value)} />
                </div>
                {mode === 'edit' && (
                  <div className="form-field">
                    <label className="form-label">Completed Date</label>
                    <input className="form-input" type="date" value={form.TaskCompletedDate} onChange={e => set('TaskCompletedDate', e.target.value)} />
                  </div>
                )}
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Scoring</div>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Assigned Score (Max) <span className="req">*</span></label>
                  <input className="form-input" type="number" min={0} max={100} value={form.AssignedScore} onChange={e => set('AssignedScore', e.target.value)} placeholder="e.g. 10.0" />
                </div>
                <div className="form-field">
                  <label className="form-label">Student Remarks</label>
                  <textarea className="form-textarea" rows={3} value={form.StudentRemarks} onChange={e => set('StudentRemarks', e.target.value)} placeholder="Student's remarks on the task (set by student)..." />
                </div>
              </div>
            </div>
          </div>

          <div className="form-card-footer">
            <button className="form-cancel-btn" onClick={back}>Cancel</button>
            <button className="form-save-btn">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {mode === 'add' ? 'Create Task' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
