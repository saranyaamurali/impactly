import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/NgoDashboard.css';

export default function NgoDashboardPage() {
  const navigate = useNavigate();
  const [ngoData, setNgoData] = useState(null);
  const [partnerships, setPartnerships] = useState([]);
  const [stats, setStats] = useState({
    totalPartners: 0,
    activeProjects: 0,
    peopleImpacted: 0,
    fundingReceived: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchNgoData();
  }, []);

  const fetchNgoData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('impactly_token');
      if (!token) {
        navigate('/ngo/login');
        return;
      }

      const response = await api.get('/ngo/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNgoData(response.data.ngo);
      fetchStats(response.data.ngo._id);
      fetchPartnerships(response.data.ngo._id);
    } catch (error) {
      console.error('Failed to fetch NGO data:', error);
      if (error.response?.status === 401) {
        navigate('/ngo/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async (ngoId) => {
    try {
      const response = await api.get(`/ngo/${ngoId}/stats`);
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchPartnerships = async (ngoId) => {
    try {
      const response = await api.get(`/ngo/${ngoId}/partnerships`);
      setPartnerships(response.data.partnerships || []);
    } catch (error) {
      console.error('Failed to fetch partnerships:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('impactly_token');
    localStorage.removeItem('userRole');
    navigate('/ngo/login');
  };

  if (loading) {
    return <div className="loading-container">Loading NGO Dashboard...</div>;
  }

  if (!ngoData) {
    return <div className="error-container">Failed to load NGO data</div>;
  }

  return (
    <div className="ngo-dashboard">
      {/* Header */}
      <div className="dashboard-header ngo-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="org-avatar">{ngoData.ngoName.charAt(0)}</div>
            <div>
              <h1>{ngoData.ngoName}</h1>
              <p className="mission">{ngoData.mission}</p>
            </div>
          </div>
          <div className="header-actions">
            <Link to="/ngo/profile" className="btn-edit">
              Edit Profile
            </Link>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🤝</div>
          <div className="stat-info">
            <h3>Corporate Partners</h3>
            <p className="stat-value">{stats.totalPartners}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Active Projects</h3>
            <p className="stat-value">{stats.activeProjects}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>People Impacted</h3>
            <p className="stat-value">{stats.peopleImpacted.toLocaleString()}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Funding Received</h3>
            <p className="stat-value">₹{(stats.fundingReceived / 10000000).toFixed(1)}Cr</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📋 Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'partnerships' ? 'active' : ''}`}
          onClick={() => setActiveTab('partnerships')}
        >
          🤝 Partnerships ({partnerships.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'impact' ? 'active' : ''}`}
          onClick={() => setActiveTab('impact')}
        >
          📊 Impact Tracking
        </button>
        <button
          className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          📚 Resources
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="overview-card">
              <h3>Organization Overview</h3>
              <div className="overview-grid">
                <div className="overview-item">
                  <label>Mission</label>
                  <p>{ngoData.mission}</p>
                </div>
                <div className="overview-item">
                  <label>Focus Areas</label>
                  <div className="focus-tags">
                    {ngoData.focusAreas && ngoData.focusAreas.map(area => (
                      <span key={area} className="tag">{area}</span>
                    ))}
                  </div>
                </div>
                <div className="overview-item">
                  <label>Website</label>
                  {ngoData.website ? (
                    <a href={ngoData.website} target="_blank" rel="noopener noreferrer">
                      {ngoData.website}
                    </a>
                  ) : (
                    <p>Not provided</p>
                  )}
                </div>
                <div className="overview-item">
                  <label>Contact Person</label>
                  <p>{ngoData.contactPerson}</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="actions-grid">
                <Link to="/matchmaking" className="action-card">
                  <div className="action-icon">🎯</div>
                  <h4>Find Partners</h4>
                  <p>Discover corporate partnerships</p>
                </Link>
                <Link to="/impact-tracking" className="action-card">
                  <div className="action-icon">📊</div>
                  <h4>Track Impact</h4>
                  <p>Monitor project outcomes</p>
                </Link>
                <Link to="/ecosystem/companies" className="action-card">
                  <div className="action-icon">🏢</div>
                  <h4>Browse Companies</h4>
                  <p>Explore corporate profiles</p>
                </Link>
                <Link to="/csr/information" className="action-card">
                  <div className="action-icon">📚</div>
                  <h4>CSR Resources</h4>
                  <p>Learn about CSR initiatives</p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'partnerships' && (
          <div className="partnerships-section">
            <h3>Corporate Partnerships</h3>
            {partnerships.length > 0 ? (
              <div className="partnerships-grid">
                {partnerships.map(partnership => (
                  <div key={partnership.id} className="partnership-card">
                    <div className="partnership-header">
                      <h4>{partnership.corporateName}</h4>
                      <span className={`status ${partnership.status.toLowerCase()}`}>
                        {partnership.status}
                      </span>
                    </div>
                    <p className="partnership-project">
                      <strong>Project:</strong> {partnership.projectTitle}
                    </p>
                    <p className="partnership-budget">
                      <strong>Budget:</strong> ₹{(partnership.budget / 10000000).toFixed(1)}Cr
                    </p>
                    <p className="partnership-timeline">
                      <strong>Timeline:</strong> {partnership.timeline}
                    </p>
                    <div className="partnership-actions">
                      <button className="btn-sm primary">View Details</button>
                      <button className="btn-sm secondary">Message</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No partnerships yet</p>
                <Link to="/matchmaking" className="btn-primary">
                  Find Partners
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="impact-section">
            <h3>Impact Metrics</h3>
            <div className="impact-metrics">
              <div className="metric-card">
                <h4>Total Beneficiaries</h4>
                <p className="metric-value">{stats.peopleImpacted.toLocaleString()}</p>
                <p className="metric-desc">People positively impacted</p>
              </div>
              <div className="metric-card">
                <h4>Active Projects</h4>
                <p className="metric-value">{stats.activeProjects}</p>
                <p className="metric-desc">Ongoing initiatives</p>
              </div>
              <div className="metric-card">
                <h4>Total Funding</h4>
                <p className="metric-value">₹{(stats.fundingReceived / 10000000).toFixed(1)}Cr</p>
                <p className="metric-desc">Total funds mobilized</p>
              </div>
              <div className="metric-card">
                <h4>Corporate Partners</h4>
                <p className="metric-value">{stats.totalPartners}</p>
                <p className="metric-desc">Organizations collaborating</p>
              </div>
            </div>
            <Link to="/impact-tracking" className="btn-primary mt-2">
              Detailed Impact Tracking
            </Link>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="resources-section">
            <h3>Learning Resources</h3>
            <div className="resources-grid">
              <div className="resource-card">
                <div className="resource-icon">📖</div>
                <h4>CSR Guidelines</h4>
                <p>Learn about corporate social responsibility guidelines and best practices</p>
                <a href="#" className="read-more">Read More →</a>
              </div>
              <div className="resource-card">
                <div className="resource-icon">🎯</div>
                <h4>SDG Alignment</h4>
                <p>Understand how to align your projects with UN Sustainable Development Goals</p>
                <a href="#" className="read-more">Read More →</a>
              </div>
              <div className="resource-card">
                <div className="resource-icon">💡</div>
                <h4>Impact Measurement</h4>
                <p>Best practices for measuring and reporting social impact metrics</p>
                <a href="#" className="read-more">Read More →</a>
              </div>
              <div className="resource-card">
                <div className="resource-icon">🤝</div>
                <h4>Partnership Tips</h4>
                <p>How to build successful partnerships with corporate organizations</p>
                <a href="#" className="read-more">Read More →</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
