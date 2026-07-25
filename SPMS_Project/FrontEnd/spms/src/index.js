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

// Admin — List Views
import ManageRolesView from './views/Admin/ManageRolesView';
import ManageUsersView from './views/Admin/ManageUsersView';
import ManageStudentsView from './views/Admin/ManageStudentsView';
import ManageFacultyView from './views/Admin/ManageFacultyView';
import ManageProjectsView from './views/Admin/ManageProjectsView';
import RolePermissionsView from './views/Admin/RolePermissionsView';

// Admin — Form Views
import RoleFormView from './views/Admin/RoleFormView';
import UserFormView from './views/Admin/UserFormView';
import StudentFormView from './views/Admin/StudentFormView';
import FacultyFormView from './views/Admin/FacultyFormView';
import ProjectMasterFormView from './views/Admin/ProjectMasterFormView';
import ProjectAssignFormView from './views/Admin/ProjectAssignFormView';

// Faculty — List Views
import FacultyProjectsView from './views/Faculty/FacultyProjectsView';
import ManageTasksView from './views/Faculty/ManageTasksView';
import ScoresRemarksView from './views/Faculty/ScoresRemarksView';

// Faculty — Form Views
import TaskFormView from './views/Faculty/TaskFormView';
import ScoreFormView from './views/Faculty/ScoreFormView';

// Student — List/Detail Views
import MyProjectView from './views/Student/MyProjectView';
import MyTasksView from './views/Student/MyTasksView';
import MyProfileView from './views/Student/MyProfileView';

// Student — Form Views
import ProfileEditView from './views/Student/ProfileEditView';

function App() {
  const { isAuthenticated, loading } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [viewParams, setViewParams] = useState({});

  // Central navigation function — use this everywhere instead of setCurrentView directly
  const navigateTo = (view, params = {}) => {
    setCurrentView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      // ── Shared ────────────────────────────────────────
      case 'dashboard':
        return <DashboardView />;

      // ── Admin — List ───────────────────────────────────
      case 'roles':
        return <ManageRolesView navigateTo={navigateTo} />;
      case 'users':
        return <ManageUsersView navigateTo={navigateTo} />;
      case 'students':
        return <ManageStudentsView navigateTo={navigateTo} />;
      case 'faculty':
        return <ManageFacultyView navigateTo={navigateTo} />;
      case 'admin-projects':
        return <ManageProjectsView navigateTo={navigateTo} />;
      case 'permissions':
        return <RolePermissionsView />;

      // ── Admin — Forms ──────────────────────────────────
      case 'add-role':
        return <RoleFormView navigateTo={navigateTo} mode="add" />;
      case 'edit-role':
        return <RoleFormView navigateTo={navigateTo} mode="edit" entityId={viewParams.id} />;

      case 'add-user':
        return <UserFormView navigateTo={navigateTo} mode="add" />;
      case 'edit-user':
        return <UserFormView navigateTo={navigateTo} mode="edit" entityId={viewParams.id} />;

      case 'add-student':
        return <StudentFormView navigateTo={navigateTo} mode="add" />;
      case 'edit-student':
        return <StudentFormView navigateTo={navigateTo} mode="edit" entityId={viewParams.id} />;

      case 'add-faculty':
        return <FacultyFormView navigateTo={navigateTo} mode="add" />;
      case 'edit-faculty':
        return <FacultyFormView navigateTo={navigateTo} mode="edit" entityId={viewParams.id} />;

      case 'add-project-master':
        return <ProjectMasterFormView navigateTo={navigateTo} mode="add" />;
      case 'edit-project-master':
        return <ProjectMasterFormView navigateTo={navigateTo} mode="edit" entityId={viewParams.id} />;

      case 'assign-project':
        return <ProjectAssignFormView navigateTo={navigateTo} mode="add" />;
      case 'edit-allocation':
        return <ProjectAssignFormView navigateTo={navigateTo} mode="edit" entityId={viewParams.id} />;

      // ── Faculty — List ─────────────────────────────────
      case 'projects':
        return <FacultyProjectsView navigateTo={navigateTo} />;
      case 'tasks':
        return <ManageTasksView navigateTo={navigateTo} />;
      case 'scores':
        return <ScoresRemarksView navigateTo={navigateTo} />;

      // ── Faculty — Forms ────────────────────────────────
      case 'add-task':
        return <TaskFormView navigateTo={navigateTo} mode="add" />;
      case 'edit-task':
        return <TaskFormView navigateTo={navigateTo} mode="edit" entityId={viewParams.id} />;
      case 'grade-task':
        return <ScoreFormView navigateTo={navigateTo} mode="grade" entityId={viewParams.id} />;

      // ── Student — Detail ───────────────────────────────
      case 'my-project':
        return <MyProjectView />;
      case 'my-tasks':
        return <MyTasksView />;
      case 'profile':
        return <MyProfileView navigateTo={navigateTo} />;

      // ── Student — Forms ────────────────────────────────
      case 'edit-profile':
        return <ProfileEditView navigateTo={navigateTo} />;

      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="layout-wrapper">
      <Sidebar currentView={currentView} setCurrentView={(v) => navigateTo(v)} />
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
