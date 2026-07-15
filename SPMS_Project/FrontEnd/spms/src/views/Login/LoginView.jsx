// LoginView.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './LoginView.css';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick fill logins for dev productivity
  const handleQuickLogin = (roleEmail, rolePassword) => {
    setEmail(roleEmail);
    setPassword(rolePassword);
    setError('');
  };

  return (
    <div className="login-page-container">
      <div className="login-card-wrapper animate-fade-in">
        {/* Brand/Hero Panel */}
        <div className="login-hero-panel">
          <div className="hero-logo-circle">
            <svg className="hero-logo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h1 className="hero-brand-name">SPMS Portal</h1>
          <p className="hero-brand-tagline">Student Project Management System</p>
          <div className="hero-decoration-grid">
            <div className="dec-dot"></div>
            <div className="dec-dot"></div>
            <div className="dec-dot"></div>
          </div>
        </div>

        {/* Input Form Panel */}
        <div className="login-form-panel">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Enter your credentials to manage academic projects</p>
          </div>

          {error && (
            <div className="login-error-alert">
              <svg className="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <svg className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                </svg>
                <input
                  type="email"
                  id="email"
                  placeholder="name@spms.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <a href="#forgot" className="forgot-link" onClick={(e) => e.preventDefault()}>Forgot?</a>
              </div>
              <div className="input-with-icon">
                <svg className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <button type="submit" className="login-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="btn-spinner"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg className="btn-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Quick Login Section */}
          <div className="quick-login-section">
            <p className="quick-login-title">Quick Developer Logins</p>
            <div className="quick-login-pills">
              <button
                className="quick-pill admin-pill"
                onClick={() => handleQuickLogin('admin@spms.com', 'admin123')}
                disabled={isSubmitting}
              >
                <span>Admin</span>
              </button>
              <button
                className="quick-pill faculty-pill"
                onClick={() => handleQuickLogin('priya.sharma@spms.com', 'faculty123')}
                disabled={isSubmitting}
              >
                <span>Faculty</span>
              </button>
              <button
                className="quick-pill student-pill"
                onClick={() => handleQuickLogin('rohan.mehta@spms.com', 'student123')}
                disabled={isSubmitting}
              >
                <span>Student</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
