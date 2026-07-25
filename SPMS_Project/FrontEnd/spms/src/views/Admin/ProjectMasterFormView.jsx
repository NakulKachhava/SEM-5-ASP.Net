// ProjectMasterFormView.jsx — Add / Edit Project Master (base project template)
import React, { useState } from 'react';
import '../../components/Common/FormView.css';
import { SPM_ProjectMaster } from '../../services/mockData';

export default function ProjectMasterFormView({ navigateTo, mode = 'add', entityId }) {
  const existing = mode === 'edit' ? SPM_ProjectMaster.find(p => p.ProjectID === entityId) || SPM_ProjectMaster[0] : null;

  const [form, setForm] = useState({
    ProjectTitle: existing?.ProjectTitle || '',
    Description: existing?.Description || '',
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
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
          </div>
          <div className="form-info-title">{mode === 'add' ? 'New Project' : 'Edit Project'}</div>
          <p className="form-info-desc">Define a project master record. This serves as the base template that gets allocated to students.</p>
          <ul className="form-info-checklist">
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Project title should be clear and descriptive</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>The same project can be allocated to multiple students</li>
            <li><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Description helps faculty understand the project scope</li>
          </ul>
          <p className="form-info-required-note">Fields marked with <span style={{color:'#fca5a5'}}>*</span> are required.</p>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <div className={`form-mode-badge ${mode}`}>
              {mode === 'add'
                ? <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>New Project</>
                : <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>Editing Project</>}
            </div>
            <h2>{mode === 'add' ? 'Create New Project' : 'Edit Project Details'}</h2>
            <p>Define the project title and a detailed description of objectives and expected outcomes.</p>
          </div>

          <div className="form-card-body">
            <div className="form-section">
              <div className="form-section-title">Project Details</div>
              <div className="form-grid">
                <div className="form-field form-col-span-2">
                  <label className="form-label">Project Title <span className="req">*</span></label>
                  <input className="form-input" type="text" value={form.ProjectTitle} onChange={e => set('ProjectTitle', e.target.value)} placeholder="e.g. E-Commerce Platform Development" />
                </div>
                <div className="form-field form-col-span-2">
                  <label className="form-label">Project Description <span className="req">*</span></label>
                  <textarea className="form-textarea" rows={6} value={form.Description} onChange={e => set('Description', e.target.value)}
                    placeholder="Describe the project scope, objectives, technology stack, and expected deliverables..." />
                  <span className="form-hint">Aim for at least 100 characters to give a clear project overview.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-card-footer">
            <button className="form-cancel-btn" onClick={back}>Cancel</button>
            <button className="form-save-btn">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {mode === 'add' ? 'Create Project' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
