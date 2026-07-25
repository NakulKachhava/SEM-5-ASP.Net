// ProjectAssignFormView.jsx — Assign Project / Edit Allocation
import React, { useState } from 'react';
import '../../components/Common/FormView.css';
import { SPM_ProjectAllocation, SPM_ProjectMaster, SPM_User } from '../../services/mockData';

const students = SPM_User.filter(u => u.UserTypeID === 3);
const faculty  = SPM_User.filter(u => u.UserTypeID === 2);

export default function ProjectAssignFormView({ navigateTo, mode = 'add', entityId }) {
  const existing = mode === 'edit'
    ? SPM_ProjectAllocation.find(a => a.ProjectAllocationID === entityId) || SPM_ProjectAllocation[0]
    : null;

  const [form, setForm] = useState({
    StudentID:       existing?.StudentID       || students[0]?.UserID       || '',
    FacultyID:       existing?.FacultyID       || faculty[0]?.UserID        || '',
    ProjectID:       existing?.ProjectID       || SPM_ProjectMaster[0]?.ProjectID || '',
    ProjectStartDate: existing?.ProjectStartDate || '',
    ProjectEndDate:   existing?.ProjectEndDate   || '',
    TotalTasksGiven:  existing?.TotalTasksGiven  || '',
    OverAllGrade:     existing?.OverAllGrade      || '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const back = () => navigateTo('admin-projects');

  return (
    <div className="animate-fade-in">
      <button className="form-page-back" onClick={back}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Manage Projects
      </button>

      <div className="form-page-layout">
        <div className="form-info-panel">
          <div className="form-info-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <div className="form-info-title">{mode === 'add' ? 'Assign Project' : 'Edit Allocation'}</div>
          <p className="form-info-desc">Allocate an academic project to a student under the supervision of a faculty member.</p>
          <ul className="form-info-checklist">
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Each student can only be assigned one active project</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Faculty member will supervise and manage tasks</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Overall grade is optional and can be set later</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Progress is auto-calculated from task completions</li>
          </ul>
          <p className="form-info-required-note">Fields marked with <span style={{color:'#fca5a5'}}>*</span> are required.</p>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <div className={`form-mode-badge ${mode}`}>
              {mode === 'add'
                ? <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>New Allocation</>
                : <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>Edit Allocation #{existing?.ProjectAllocationID}</>}
            </div>
            <h2>{mode === 'add' ? 'Assign Project to Student' : 'Edit Project Allocation'}</h2>
            <p>Select the student, supervisor, and project, then define the timeline.</p>
          </div>

          <div className="form-card-body">
            <div className="form-section">
              <div className="form-section-title">Assignment</div>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Student <span className="req">*</span></label>
                  <select className="form-select" value={form.StudentID} onChange={e => set('StudentID', Number(e.target.value))}>
                    {students.map(s => <option key={s.UserID} value={s.UserID}>{s.FullName} ({s.UserCode})</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Faculty Supervisor <span className="req">*</span></label>
                  <select className="form-select" value={form.FacultyID} onChange={e => set('FacultyID', Number(e.target.value))}>
                    {faculty.map(f => <option key={f.UserID} value={f.UserID}>{f.FullName} ({f.UserCode})</option>)}
                  </select>
                </div>
                <div className="form-field form-col-span-2">
                  <label className="form-label">Project <span className="req">*</span></label>
                  <select className="form-select" value={form.ProjectID} onChange={e => set('ProjectID', Number(e.target.value))}>
                    {SPM_ProjectMaster.map(p => <option key={p.ProjectID} value={p.ProjectID}>{p.ProjectTitle}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Timeline</div>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Start Date <span className="req">*</span></label>
                  <input className="form-input" type="date" value={form.ProjectStartDate} onChange={e => set('ProjectStartDate', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">End Date <span className="req">*</span></label>
                  <input className="form-input" type="date" value={form.ProjectEndDate} onChange={e => set('ProjectEndDate', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Evaluation</div>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Total Tasks Planned</label>
                  <input className="form-input" type="number" min={0} value={form.TotalTasksGiven} onChange={e => set('TotalTasksGiven', e.target.value)} placeholder="e.g. 10" />
                  <span className="form-hint">Can be updated as tasks are added by faculty.</span>
                </div>
                <div className="form-field">
                  <label className="form-label">Overall Grade</label>
                  <input className="form-input" type="text" value={form.OverAllGrade} onChange={e => set('OverAllGrade', e.target.value)} placeholder="e.g. A+, B, Pending" />
                  <span className="form-hint">Optional — can be assigned after project completion.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-card-footer">
            <button className="form-cancel-btn" onClick={back}>Cancel</button>
            <button className="form-save-btn">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {mode === 'add' ? 'Assign Project' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
