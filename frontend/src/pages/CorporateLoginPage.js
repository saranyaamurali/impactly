import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginCorporate, setAuthToken } from '../services/api';
import '../styles/AuthPages.css';

export default function CorporateLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginCorporate(formData);
      setAuthToken(response.data.token);
      localStorage.setItem('userRole', 'corporate');
      window.location.href = '/corporate/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container corporate-login">
      <div className="auth-card login-card">
        <div className="auth-header corporate-header">
          <div className="auth-logo corporate-logo">🏢</div>
          <h1>Corporate Login</h1>
          <p className="auth-subtitle">Access your CSR dashboard and projects</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-banner">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@company.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
<<<<<<< HEAD

=======
            <Link to="/corporate/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
>>>>>>> 9b69005d4586ec2f41ef9a5cbce4270d37a0a929
          </div>

          <button
            type="submit"
            disabled={loading}
            className="auth-button login-button"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/corporate/register">Register here</Link></p>
            <p>Looking to log in as an NGO? <Link to="/ngo/login">Click here</Link></p>
          </div>
        </form>
      </div>

    </div>
  );
}
