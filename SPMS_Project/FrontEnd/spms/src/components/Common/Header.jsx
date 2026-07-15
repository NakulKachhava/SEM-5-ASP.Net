// Header.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export default function Header() {
  const { currentUser, currentRole, switchRole } = useAuth();

  const handleRoleChange = (e) => {
    switchRole(e.target.value);
  };

  return (
    <header className="header-container">
      {/* Search Input Box */}
      <div className="search-wrapper">
        <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" className="search-input" placeholder="Search projects, tasks, students..." />
      </div>

      {/* Utilities Section */}
      <div className="header-utilities">
        {/* Dynamic Role Switcher Pill for local development */}
        <div className="role-switcher-pill">
          <label htmlFor="role-select" className="role-switcher-label">
            <svg className="switcher-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Scope:</span>
          </label>
          <select
            id="role-select"
            className="role-select-dropdown"
            value={currentRole}
            onChange={handleRoleChange}
          >
            <option value="Admin">Admin</option>
            <option value="Faculty">Faculty</option>
            <option value="Student">Student</option>
          </select>
        </div>

        {/* Separator */}
        <span className="utility-separator"></span>

        {/* Notifications Mock */}
        <button className="utility-icon-btn" title="Notifications">
          <svg className="utility-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="notification-dot"></span>
        </button>

        {/* User Card */}
        {currentUser && (
          <div className="header-user-card">
            <div className="header-user-info">
              <span className="user-name">{currentUser.FullName}</span>
              <span className="user-email">{currentUser.Email}</span>
            </div>
            <img
              className="user-avatar"
              src={currentUser.ProfilePicturePath || 'https://via.placeholder.com/36'}
              alt={currentUser.FullName}
            />
          </div>
        )}
      </div>
    </header>
  );
}
