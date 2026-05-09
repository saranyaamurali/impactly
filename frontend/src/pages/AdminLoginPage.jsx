import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAdmin, setAuthToken } from '../services/api';
import '../styles/AuthPages.css';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginAdmin(formData);
      if (response.data.token) {
        setAuthToken(response.data.token);
        localStorage.setItem('userRole', response.data.user.role);
        // Force a hard reload to ensure MainLayout picks up the new state properly
        window.location.href = '/admin/dashboard';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login as admin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ backgroundColor: '#ffffff' }}>
        <div className="auth-header">
          <div className="auth-icon" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)' }}>🛡️</div>
          <h2>Admin Portal Access</h2>
          <p>Login to manage CSR articles and platform data.</p>
        </div>

        {error && <div className="auth-alert error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Admin Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@impactly.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            style={{ background: '#0f172a', borderColor: '#0f172a' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Login to Admin Portal'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Not an administrator? <Link to="/">Return to Home</Link></p>
        </div>
      </div>
    </div>
  );
}
