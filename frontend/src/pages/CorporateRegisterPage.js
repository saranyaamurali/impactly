import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerCorporate, setAuthToken } from '../services/api';
import '../styles/AuthPages.css';

export default function CorporateRegisterPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    industry: '',
    website: '',
    headquarters: '',
    profile: '',
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await registerCorporate({
        companyName: formData.companyName,
        email: formData.email,
        password: formData.password,
        industry: formData.industry,
        website: formData.website,
        headquarters: formData.headquarters,
        profile: formData.profile,
      });

      setAuthToken(response.data.token);
      localStorage.setItem('userRole', 'corporate');
      window.location.href = '/corporate/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container corporate-register">
      <div className="auth-card register-card">
        <div className="auth-header corporate-header">
          <div className="auth-logo">🏢</div>
          <h1>Join as a Corporate</h1>
          <p className="auth-subtitle">Register your company to launch CSR initiatives</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-banner">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="companyName">Company Name *</label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g., Tech Innovations Inc."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="industry">Industry</label>
              <input
                id="industry"
                name="industry"
                type="text"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g., Technology, Finance"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="corporate@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="headquarters">Headquarters</label>
              <input
                id="headquarters"
                name="headquarters"
                type="text"
                value={formData.headquarters}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="website">Website URL</label>
            <input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourcompany.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profile">Company Profile</label>
            <textarea
              id="profile"
              name="profile"
              value={formData.profile}
              onChange={handleChange}
              placeholder="Briefly describe your company and its CSR goals"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  required
                  minLength="8"
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="auth-button register-button"
          >
            {loading ? 'Creating Account...' : 'Register as Corporate'}
          </button>

          <div className="auth-footer">
            <p>Already registered? <Link to="/corporate/login">Login here</Link></p>
            <p>Or <Link to="/ngo/register">Register as an NGO</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
