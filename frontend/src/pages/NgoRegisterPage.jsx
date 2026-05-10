import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/AuthPages.css';

export default function NgoRegisterPage() {
  const [formData, setFormData] = useState({
    ngoName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mission: '',
    website: '',
    focusAreas: [],
    contactPerson: '',
    phone: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const focusAreaOptions = [
    'Education',
    'Healthcare',
    'Environment',
    'Poverty Alleviation',
    'Women Empowerment',
    'Skill Development',
    'Rural Development',
    'Food Security',
    'Water & Sanitation',
    'Community Development',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocusAreaChange = (area) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(f => f !== area)
        : [...prev.focusAreas, area]
    }));
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

    if (formData.focusAreas.length === 0) {
      setError('Please select at least one focus area');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/register-ngo', {
        ngoName: formData.ngoName,
        email: formData.email,
        password: formData.password,
        mission: formData.mission,
        website: formData.website,
        focusAreas: formData.focusAreas,
        contactPerson: formData.contactPerson,
        phone: formData.phone,
      });

      localStorage.setItem('impactly_token', response.data.token);
      localStorage.setItem('userRole', 'ngo');
      window.location.href = '/ngo/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container ngo-register">
      <div className="auth-card register-card">
        <div className="auth-header ngo-header">
          <div className="auth-logo">🌍</div>
          <h1>Join as an NGO</h1>
          <p className="auth-subtitle">Make an impact through collaboration</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-banner">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ngoName">Organization Name *</label>
              <input
                id="ngoName"
                name="ngoName"
                type="text"
                value={formData.ngoName}
                onChange={handleChange}
                placeholder="e.g., Help India Foundation"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactPerson">Contact Person *</label>
              <input
                id="contactPerson"
                name="contactPerson"
                type="text"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="Full name"
                required
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
                placeholder="organization@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mission">Mission Statement *</label>
            <textarea
              id="mission"
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              placeholder="Briefly describe your NGO's mission and goals"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website URL</label>
            <input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourorganization.org"
            />
          </div>

          <div className="form-group">
            <label>Focus Areas (Select at least one) *</label>
            <div className="checkbox-grid">
              {focusAreaOptions.map(area => (
                <label key={area} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.focusAreas.includes(area)}
                    onChange={() => handleFocusAreaChange(area)}
                  />
                  <span>{area}</span>
                </label>
              ))}
            </div>
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
                  placeholder="Minimum 6 characters"
                  required
                  minLength="6"
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
            {loading ? 'Creating Account...' : 'Register as NGO'}
          </button>

          <div className="auth-footer">
            <p>Already registered? <Link to="/ngo/login">Login here</Link></p>
            <p>Or <Link to="/corporate/register">Register as a Corporate</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
