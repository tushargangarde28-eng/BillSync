// Dashboard.jsx
import React, { useState } from 'react';
import '../css/AdminDashboard.css';

const  AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'invoices', label: 'Invoices', icon: '📄' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleLogout = () => {
    alert('Logged out successfully!');
    // Redirect to login
    // window.location.href = '/login';
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L2 9L16 16L30 9L16 2Z" stroke="#A78BFA" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 16L16 23L30 16" stroke="#A78BFA" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 23L16 30L30 23" stroke="#A78BFA" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="16" cy="16" r="2.5" fill="#A78BFA"/>
            </svg>
            <span className="sidebar-brand">BillSync</span>
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => setActiveItem(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {isSidebarOpen && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            {isSidebarOpen && <span className="nav-label">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Navbar */}
        <header className="navbar">
          <div className="navbar-left">
            <h2 className="page-title">
              {menuItems.find(item => item.id === activeItem)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="navbar-right">
            <button className="nav-icon-btn" title="Notifications">
              🔔
              <span className="notification-badge">3</span>
            </button>
            <button className="nav-icon-btn" title="Messages">
              💬
            </button>
            <div className="user-profile">
              <div className="avatar">
                <span>JD</span>
              </div>
              <div className="user-info">
                <span className="user-name">Ankita Zade</span>
                <span className="user-role">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <div className="page-body">
          <div className="welcome-section">
            <h1>Welcome back, Ankita! 👋</h1>
            <p>Here's what's happening with your business today.</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon purple">💰</div>
              <div className="stat-info">
                <h3>$12,450</h3>
                <p>Total Revenue</p>
                <span className="stat-change positive">↑ 12.5%</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">📄</div>
              <div className="stat-info">
                <h3>156</h3>
                <p>Total Invoices</p>
                <span className="stat-change positive">↑ 8.2%</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">👥</div>
              <div className="stat-info">
                <h3>89</h3>
                <p>Active Customers</p>
                <span className="stat-change positive">↑ 5.7%</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange">📦</div>
              <div className="stat-info">
                <h3>234</h3>
                <p>Products</p>
                <span className="stat-change negative">↓ 2.3%</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon">📄</span>
                <div className="activity-content">
                  <p className="activity-text">Invoice #INV-001 created</p>
                  <span className="activity-time">2 minutes ago</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">👤</span>
                <div className="activity-content">
                  <p className="activity-text">New customer registered</p>
                  <span className="activity-time">15 minutes ago</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">💰</span>
                <div className="activity-content">
                  <p className="activity-text">Payment received: $450.00</p>
                  <span className="activity-time">1 hour ago</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">📦</span>
                <div className="activity-content">
                  <p className="activity-text">Product stock updated</p>
                  <span className="activity-time">3 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;