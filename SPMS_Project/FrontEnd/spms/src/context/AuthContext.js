// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { projectService } from '../services/projectService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState('');
  const [loading, setLoading] = useState(true);

  // Load user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('spms_user');
    const savedToken = localStorage.getItem('spms_token');
    
    if (savedUser && savedToken) {
      try {
        const userObj = JSON.parse(savedUser);
        setCurrentUser(userObj);
        setCurrentRole(userObj.Role);
      } catch (e) {
        localStorage.removeItem('spms_user');
        localStorage.removeItem('spms_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await projectService.login(email, password);
      localStorage.setItem('spms_token', response.token);
      localStorage.setItem('spms_user', JSON.stringify(response.user));
      setCurrentUser(response.user);
      setCurrentRole(response.user.Role);
      return response.user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('spms_token');
    localStorage.removeItem('spms_user');
    setCurrentUser(null);
    setCurrentRole('');
  };

  // Switch role dynamically for local testing and developer ease
  const switchRole = (roleName) => {
    if (!currentUser) return;
    
    // Load a corresponding user profile for the chosen role so the dashboard correctly resolves project allocations
    let mockProfile = { ...currentUser, Role: roleName };
    
    if (roleName === 'Admin') {
      mockProfile = {
        UserID: 1,
        FullName: 'Aarav Patel',
        Email: 'admin@spms.com',
        MobileNumber: '9876543210',
        ProfilePicturePath: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        Role: 'Admin'
      };
    } else if (roleName === 'Faculty') {
      mockProfile = {
        UserID: 2,
        FullName: 'Priya Sharma',
        Email: 'priya.sharma@spms.com',
        MobileNumber: '9876543211',
        ProfilePicturePath: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        Role: 'Faculty'
      };
    } else if (roleName === 'Student') {
      mockProfile = {
        UserID: 4,
        FullName: 'Rohan Mehta',
        Email: 'rohan.mehta@spms.com',
        MobileNumber: '9876543213',
        ProfilePicturePath: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        Role: 'Student'
      };
    }

    setCurrentUser(mockProfile);
    setCurrentRole(roleName);
    localStorage.setItem('spms_user', JSON.stringify(mockProfile));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        isAuthenticated: !!currentUser,
        loading,
        login,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
