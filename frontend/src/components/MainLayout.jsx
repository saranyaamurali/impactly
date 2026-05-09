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
            <span className="logo-icon">🌍</span>
            <span className="logo-text">Impactly</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
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
              to="/public-projects" 
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              to="/csr/information" 
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              CSR Info
            </Link>
            <Link 
              to="/blogs" 
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
                <Link 
                  to="/corporate/project/submit" 
                  className="nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  New Project
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
                </>
              ) : (
                <>
                  <span className="nav-role">
                    {userRole === 'ngo' ? '🏢' : '🏭'} 
                    {userRole === 'ngo' ? ' NGO' : ' Corporate'}
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
          <div className="footer-section">
            <h4>About</h4>
            <p>Connecting corporate CSR with impactful NGOs for sustainable change.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/public-projects">Projects</Link></li>
              <li><Link to="/blogs">Blog</Link></li>
              <li><Link to="/ecosystem/companies">Companies</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Get Involved</h4>
            <ul>
              <li><Link to="/ngo/register">Register as NGO</Link></li>
              <li><Link to="/corporate/register">Register as Corporate</Link></li>
              <li><Link to="/csr/information">CSR Information</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
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
