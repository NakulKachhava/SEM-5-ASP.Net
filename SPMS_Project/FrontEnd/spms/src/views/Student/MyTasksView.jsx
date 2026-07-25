// MyTasksView.jsx (Student)
import React from 'react';
import PageShell from '../../components/Common/PageShell';
import '../../components/Common/PageShell.css';
import '../../components/Common/SharedTable.css';
import { SPM_Task, SPM_TaskStatus, SPM_TaskPriority, SPM_ProjectAllocation, SPM_ProjectMaster } from '../../services/mockData';

const STUDENT_ID = 4;
const alloc = SPM_ProjectAllocation.find(a => a.StudentID === STUDENT_ID);
const master = alloc ? SPM_ProjectMaster.find(m => m.ProjectID === alloc.ProjectID) : null;

const tasks = alloc ? SPM_Task.filter(t => t.ProjectAllocationID === alloc.ProjectAllocationID).map(task => {
  const statusObj = SPM_TaskStatus.find(s => s.TaskStatusID === task.TaskStatusID);
  const priorityObj = SPM_TaskPriority.find(p => p.TaskPriorityID === task.TaskPriorityID);
  return { ...task, StatusName: statusObj?.TaskStatusName, StatusCssClass: statusObj?.TaskStatusCssClass, PriorityName: priorityObj?.TaskPriorityName, PriorityCssClass: priorityObj?.TaskPriortyCssClass };
}) : [];

export default function MyTasksView() {
  return (
    <div className="animate-fade-in">
      <PageShell
        title="My Tasks"
        subtitle={master ? `Tasks for: ${master.ProjectTitle}` : "Your assigned task milestones."}
        breadcrumb="My Tasks"
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
                <th>Priority</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Due Date</th>
                <th>Completed</th>
                <th>Score</th>
                <th>Next Follow-up</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, idx) => {
                const scored = task.EarnedScore !== null;
                return (
                  <tr key={task.TaskID}>
                    <td className="td-muted">{idx + 1}</td>
                    <td><span className="td-code">TASK-{String(task.TaskID).padStart(3, '0')}</span></td>
                    <td>
                      <div className="td-primary">{task.TaskTitle}</div>
                      <div className="td-muted" style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.TaskDescription}</div>
                    </td>
                    <td><span className={`badge ${task.PriorityCssClass}`}>{task.PriorityName}</span></td>
                    <td><span className={`badge ${task.StatusCssClass}`}>{task.StatusName}</span></td>
                    <td className="td-secondary">{task.TaskStartDate || '—'}</td>
                    <td className="td-secondary">{task.TaskDueDate || '—'}</td>
                    <td className="td-secondary">{task.TaskCompletedDate || '—'}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: scored ? '#10b981' : 'var(--text-muted)' }}>
                        {scored ? task.EarnedScore.toFixed(1) : '—'}
                      </span>
                      <span className="td-muted">/{task.AssignedScore.toFixed(1)}</span>
                    </td>
                    <td className="td-secondary">{task.NextFollowUpDate || '—'}</td>
                    <td>
                      <div className="td-actions">
                        <button className="action-icon-btn view" disabled title="View Details">
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
