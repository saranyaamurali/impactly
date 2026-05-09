import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { csrProjectAPI, ngoAPI } from '../services/api';
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
  const [availableProjects, setAvailableProjects] = useState([]);
  const [proposal, setProposal] = useState({
    projectId: '',
    scope: '',
    proposedBudget: '',
    expectedOutcomes: '',
  });
  const [proposalMessage, setProposalMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchNgoData();
    fetchApprovedProjects();
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

  const fetchApprovedProjects = async () => {
    try {
      const response = await csrProjectAPI.getPublicProjects({ limit: 50 });
      setAvailableProjects(response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch approved projects:', error);
    }
  };

  const handleProposalChange = (event) => {
    const { name, value } = event.target;
    setProposal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitProposal = async (event) => {
    event.preventDefault();
    setProposalMessage('');
    try {
      await ngoAPI.sendProposal({
        projectId: proposal.projectId,
        scope: proposal.scope,
        proposedBudget: Number(proposal.proposedBudget) || 0,
        expectedOutcomes: proposal.expectedOutcomes
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      });
      setProposalMessage('Proposal submitted. Awaiting admin approval.');
      setProposal({ projectId: '', scope: '', proposedBudget: '', expectedOutcomes: '' });
      fetchPartnerships(ngoData?._id);
    } catch (error) {
      console.error('Failed to submit proposal:', error);
      setProposalMessage('Unable to submit proposal.');
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
          <div className="stat-info">
            <h3>Corporate Partners</h3>
            <p className="stat-value">{stats.totalPartners}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>Active Projects</h3>
            <p className="stat-value">{stats.activeProjects}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>Beneficiaries Reached</h3>
            <p className="stat-value">{stats.peopleImpacted.toLocaleString()}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>Funding Received</h3>
            {stats.fundingReceived > 0 ? (
              <p className="stat-value">₹{(stats.fundingReceived / 10000000).toFixed(1)}Cr</p>
            ) : (
              <p className="stat-value">Pending disbursement</p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'partnerships' ? 'active' : ''}`}
          onClick={() => setActiveTab('partnerships')}
        >
          Partnerships {partnerships.length > 0 && `(${partnerships.length})`}
        </button>
        <button
          className={`tab-btn ${activeTab === 'impact' ? 'active' : ''}`}
          onClick={() => setActiveTab('impact')}
        >
          Impact Tracking
        </button>
        <button
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Available Projects
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
                  <h4>Find Partners</h4>
                  <p>Browse and apply to matching corporate CSR projects</p>
                </Link>
                <Link to="/impact-tracking" className="action-card">
                  <h4>Impact Tracking</h4>
                  <p>View and update your project progress and metrics</p>
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

        {activeTab === 'projects' && (
          <div className="partnerships-section">
            <h3>Approved Corporate Projects</h3>
            <p>Matchmaking is in progress. You will be notified when a proposal is approved.</p>
            {availableProjects.length === 0 ? (
              <p>No approved projects available yet.</p>
            ) : (
              <div className="partnerships-grid">
                {availableProjects.map((project) => (
                  <div key={project.id} className="partnership-card">
                    <div className="partnership-header">
                      <h4>{project.title}</h4>
                      <span className="status active">approved</span>
                    </div>
                    <p className="partnership-project">
                      <strong>Category:</strong> {project.category}
                    </p>
                    <p className="partnership-budget">
                      <strong>Budget:</strong> ₹{(project.budget / 10000000).toFixed(1)}Cr
                    </p>
                    <p className="partnership-timeline">
                      <strong>Location:</strong> {project.location}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="overview-card" style={{ marginTop: '24px' }}>
              <h3>Submit Partnership Proposal</h3>
              <form onSubmit={handleSubmitProposal}>
                <div className="overview-grid">
                  <div className="overview-item">
                    <label>Project</label>
                    <select name="projectId" value={proposal.projectId} onChange={handleProposalChange} required>
                      <option value="">Select project</option>
                      {availableProjects.map((project) => (
                        <option key={project.id} value={project.id}>{project.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="overview-item">
                    <label>Proposed Budget (INR)</label>
                    <input
                      name="proposedBudget"
                      type="number"
                      min="0"
                      value={proposal.proposedBudget}
                      onChange={handleProposalChange}
                      required
                    />
                  </div>
                  <div className="overview-item">
                    <label>Scope</label>
                    <input name="scope" value={proposal.scope} onChange={handleProposalChange} required />
                  </div>
                  <div className="overview-item">
                    <label>Expected Outcomes (comma separated)</label>
                    <input
                      name="expectedOutcomes"
                      value={proposal.expectedOutcomes}
                      onChange={handleProposalChange}
                    />
                  </div>
                </div>
                {proposalMessage && <p>{proposalMessage}</p>}
                <button className="btn-primary" type="submit">
                  Submit Proposal
                </button>
              </form>
            </div>
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


      </div>
    </div>
  );
}
