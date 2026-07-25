// ManageTasksView.jsx (Faculty)
import React from 'react';
import PageShell from '../../components/Common/PageShell';
import '../../components/Common/PageShell.css';
import '../../components/Common/SharedTable.css';
import { SPM_Task, SPM_TaskStatus, SPM_TaskPriority, SPM_ProjectAllocation, SPM_ProjectMaster } from '../../services/mockData';

const FACULTY_ID = 2;
const facultyAllocIDs = SPM_ProjectAllocation.filter(a => a.FacultyID === FACULTY_ID).map(a => a.ProjectAllocationID);

const tasks = SPM_Task.filter(t => facultyAllocIDs.includes(t.ProjectAllocationID)).map(task => {
  const statusObj = SPM_TaskStatus.find(s => s.TaskStatusID === task.TaskStatusID);
  const priorityObj = SPM_TaskPriority.find(p => p.TaskPriorityID === task.TaskPriorityID);
  const alloc = SPM_ProjectAllocation.find(a => a.ProjectAllocationID === task.ProjectAllocationID);
  const master = alloc ? SPM_ProjectMaster.find(m => m.ProjectID === alloc.ProjectID) : null;
  return {
    ...task,
    StatusName: statusObj?.TaskStatusName || 'Unknown',
    StatusCssClass: statusObj?.TaskStatusCssClass || '',
    PriorityName: priorityObj?.TaskPriorityName || 'Low',
    PriorityCssClass: priorityObj?.TaskPriortyCssClass || '',
    ProjectTitle: master?.ProjectTitle || '—'
  };
});

export default function ManageTasksView({ navigateTo }) {
  return (
    <div className="animate-fade-in">
      <PageShell
        title="Manage Tasks"
        subtitle="Create, assign, and track task milestones across all your supervised projects."
        breadcrumb="Manage Tasks"
        actionLabel="Add Task"
        actionIcon="M12 4v16m8-8H4"
        onAction={() => navigateTo('add-task')}
      />

      {/* Filter Bar */}
      <div className="glass-card filter-bar">
        <div className="filter-search-wrapper">
          <svg className="filter-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input className="filter-search-input" type="text" placeholder="Search by task title..." disabled />
        </div>
        <select className="filter-select" disabled>
          <option>All Projects</option>
          <option>E-Commerce Platform</option>
          <option>AI Chatbot</option>
        </select>
        <select className="filter-select" disabled>
          <option>All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Rejected</option>
        </select>
        <select className="filter-select" disabled>
          <option>All Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
        <span className="filter-results-count">{tasks.length} tasks found</span>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Task ID</th>
                <th>Task Title</th>
                <th>Project</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, idx) => (
                <tr key={task.TaskID}>
                  <td className="td-muted">{idx + 1}</td>
                  <td><span className="td-code">TASK-{String(task.TaskID).padStart(3, '0')}</span></td>
                  <td>
                    <div className="td-primary">{task.TaskTitle}</div>
                    <div className="td-muted" style={{ maxWidth: 240, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.TaskDescription}</div>
                  </td>
                  <td className="td-secondary">{task.ProjectTitle}</td>
                  <td><span className={`badge ${task.PriorityCssClass}`}>{task.PriorityName}</span></td>
                  <td><span className={`badge ${task.StatusCssClass}`}>{task.StatusName}</span></td>
                  <td className="td-secondary">{task.TaskDueDate || '—'}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: task.EarnedScore != null ? 'var(--color-completed)' : 'var(--text-muted)' }}>
                      {task.EarnedScore != null ? task.EarnedScore.toFixed(1) : '—'}
                    </span>
                    <span className="td-muted">/{task.AssignedScore.toFixed(1)}</span>
                  </td>
                  <td>
                    <div className="td-actions">
                      <button className="action-icon-btn view" disabled title="View">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button className="action-icon-btn edit" title="Edit" onClick={() => navigateTo('edit-task', { id: task.TaskID })}>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button className="action-icon-btn delete" title="Delete" onClick={() => window.confirm('Delete this task?')}>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span className="table-footer-info">Showing {tasks.length} of {tasks.length} entries</span>
          <div className="pagination-btns"><button className="page-btn active">1</button></div>
        </div>
      </div>
    </div>
  );
}
