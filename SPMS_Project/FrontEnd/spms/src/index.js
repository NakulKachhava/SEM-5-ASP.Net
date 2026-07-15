// index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Common/Header';
import Sidebar from './components/Common/Sidebar';
import LoginView from './views/Login/LoginView';

// Dashboard
import DashboardView from './views/Dashboard/DashboardView';

// Admin Views
import ManageRolesView from './views/Admin/ManageRolesView';
import ManageUsersView from './views/Admin/ManageUsersView';
import ManageStudentsView from './views/Admin/ManageStudentsView';
import ManageFacultyView from './views/Admin/ManageFacultyView';
import ManageProjectsView from './views/Admin/ManageProjectsView';
import RolePermissionsView from './views/Admin/RolePermissionsView';

// Faculty Views
import FacultyProjectsView from './views/Faculty/FacultyProjectsView';
import ManageTasksView from './views/Faculty/ManageTasksView';
import ScoresRemarksView from './views/Faculty/ScoresRemarksView';

// Student Views
import MyProjectView from './views/Student/MyProjectView';
import MyTasksView from './views/Student/MyTasksView';
import MyProfileView from './views/Student/MyProfileView';

function App() {
  const { isAuthenticated, loading } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  if (loading) {
    return (
      <div className="loader-container" style={{ height: '100vh' }}>
        <div className="spinner"></div>
        <p className="loader-text">Initializing Secure Session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginView />;
  }

  const renderContentView = () => {
    switch (currentView) {
      // ── Shared ──────────────────────────
      case 'dashboard':
        return <DashboardView />;

      // ── Admin ────────────────────────────
      case 'roles':
        return <ManageRolesView />;
      case 'users':
        return <ManageUsersView />;
      case 'students':
        return <ManageStudentsView />;
      case 'faculty':
        return <ManageFacultyView />;
      case 'admin-projects':
        return <ManageProjectsView />;
      case 'permissions':
        return <RolePermissionsView />;

      // ── Faculty ──────────────────────────
      case 'projects':
        return <FacultyProjectsView />;
      case 'tasks':
        return <ManageTasksView />;
      case 'scores':
        return <ScoresRemarksView />;

      // ── Student ──────────────────────────
      case 'my-project':
        return <MyProjectView />;
      case 'my-tasks':
        return <MyTasksView />;
      case 'profile':
        return <MyProfileView />;

      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="layout-wrapper">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="main-content">
        <Header />
        <main className="content-body">
          {renderContentView()}
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

