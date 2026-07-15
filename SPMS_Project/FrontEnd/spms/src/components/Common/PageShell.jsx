// PageShell.jsx — Reusable page header with breadcrumb + action slot
import React from 'react';
import './PageShell.css';

export default function PageShell({ title, subtitle, breadcrumb, actionLabel, actionIcon }) {
  return (
    <div className="page-shell">
      <div className="page-shell-left">
        {breadcrumb && (
          <p className="page-breadcrumb">
            <span>Home</span>
            <svg className="breadcrumb-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="breadcrumb-current">{breadcrumb}</span>
          </p>
        )}
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {actionLabel && (
        <button className="page-action-btn" disabled>
          {actionIcon && (
            <svg className="action-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={actionIcon} />
            </svg>
          )}
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
