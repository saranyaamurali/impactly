import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/MainLayout.css';

const MainLayout = ({ children, isLoggedIn, userRole, onLogout }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <div className="main-layout">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text">Impactly</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Navigation Links */}
          <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
            {/* Public Links */}
            <Link
              to="/"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/csr/information"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>

            {/* Corporate Links */}
            {userRole === 'corporate' && (
              <>
                <Link
                  to="/corporate/dashboard"
                  className="nav-link active-role"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            )}

            {/* NGO Links */}
            {userRole === 'ngo' && (
              <>
                <Link
                  to="/ngo/dashboard"
                  className="nav-link active-role"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/matchmaking"
                  className="nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Matching
                </Link>
                <Link
                  to="/impact-tracking"
                  className="nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Impact
                </Link>
              </>
            )}

            {/* Admin Links */}
            {userRole === 'admin' && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="nav-link active-role"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              </>
            )}

            {/* Auth Links */}
            <div className="nav-auth">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/ngo/login"
                    className="nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    NGO Login
                  </Link>
                  <Link
                    to="/corporate/login"
                    className="nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Corporate Login
                  </Link>
                  <Link
                    to="/admin/login"
                    className="nav-link nav-link-subtle"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                </>
              ) : (
                <>
                  <span className="nav-role">
                    {userRole === 'ngo' ? 'NGO' : userRole === 'corporate' ? 'Corporate' : 'Admin'}
                  </span>
                  <button
                    className="nav-button logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <span className="footer-logo">Impactly</span>
            <p>A structured platform connecting corporate CSR teams with credible NGOs for verified social impact.</p>
          </div>

          <div className="footer-section">
            <h4>Get Involved</h4>
            <ul>
              <li><Link to="/ngo/register">Register as NGO</Link></li>
              <li><Link to="/corporate/register">Register as Corporate</Link></li>
              <li><Link to="/csr/information">Blog</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/ngo/login">NGO Login</Link></li>
              <li><Link to="/corporate/login">Corporate Login</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Impactly. All rights reserved.</p>
          <p>
            <Link to="#">Privacy Policy</Link> |
            <Link to="#">Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
