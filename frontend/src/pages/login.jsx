// Login.jsx
import React, { useState } from 'react';
import '../css/login.css'; // Custom CSS for glassmorphism and premium styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend only demo — no backend logic
    console.log('Login attempt:', { email, password, rememberMe });
    alert('Demo login: no backend logic implemented.');
  };

  return (
    <div className="login-wrapper">
      {/* Animated gradient background for premium feel */}
      <div className="animated-bg"></div>

      <div className="container login-container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="card glass-card border-0 shadow-lg">
              <div className="card-body p-4 p-md-5">
                {/* Company Logo Area */}
                <div className="text-center mb-4">
                  <div className="logo-wrapper mb-3">
                    <div className="logo-icon">
                      <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 2L2 9L16 16L30 9L16 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <path d="M2 16L16 23L30 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <path d="M2 23L16 30L30 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none"/>
                      </svg>
                    </div>
                  </div>
                  <h1 className="brand-title">BillSync</h1>
                  <p className="brand-tagline">Smart billing for modern businesses</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold mb-2">
                      Email address
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-transparent border-end-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <input
                        type="email"
                        className="form-control form-control-lg bg-transparent border-start-0"
                        id="email"
                        placeholder="hello@billsync.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold mb-2">
                      Password
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-transparent border-end-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C9.24 2 7 4.24 7 7V9H5V20H19V9H17V7C17 4.24 14.76 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 14V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </span>
                      <input
                        type="password"
                        className="form-control form-control-lg bg-transparent border-start-0"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="forgot-link text-decoration-none" onClick={(e) => { e.preventDefault(); alert('Password reset link sent (demo)'); }}>
                      Forgot password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <button type="submit" className="btn btn-primary btn-lg w-100 py-2 mb-4 login-btn">
                    Sign in to BillSync
                  </button>

                  {/* Demo hint - elegant subtle message */}
                  <p className="text-center small text-muted mb-0">
                    Secure access to your billing dashboard
                  </p>
                </form>
              </div>
            </div>

            {/* Extra footer note */}
            <p className="text-center mt-4 small text-white-50">
              © 2025 BillSync — Intelligent billing platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;