// Login.jsx
import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  if (!username || !password) {
    setError('Please fill in all fields');
    setIsLoading(false);
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/users/login", {
      username,
      password
    });

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      navigate("/AdminDashboard");
    } else {
      setError(res.data.message || "Login failed");
    }

  } catch (err) {
    setError(err.response?.data?.message || "Server error");
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-card">
          {/* Brand */}
          <div className="brand-section">
            <div className="logo">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L2 9L16 16L30 9L16 2Z" stroke="#4F46E5" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 16L16 23L30 16" stroke="#4F46E5" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 23L16 30L30 23" stroke="#4F46E5" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="16" cy="16" r="2.5" fill="#4F46E5"/>
              </svg>
            </div>
            <h1 className="brand-name">BillSync</h1>
            <p className="brand-sub">Sign in to your account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>User Name</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"/>
                  <path d="M22 6L12 13L2 6"/>
                </svg>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C9.24 2 7 4.24 7 7V9H5V20H19V9H17V7C17 4.24 14.76 2 12 2Z"/>
                  <path d="M12 14V16"/>
                </svg>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
            </div>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="footer-links">
            <span>Don't have an account?</span>
            <a href="#">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;