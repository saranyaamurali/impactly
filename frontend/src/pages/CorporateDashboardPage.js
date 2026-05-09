<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { csrProjectAPI, fetchCorporateMe, corporateAPI, setAuthToken } from "../services/api";
import '../styles/NgoDashboard.css';
=======
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { csrProjectAPI, fetchCorporateMe, corporateAPI, setAuthToken } from "../services/api";
>>>>>>> 9b69005d4586ec2f41ef9a5cbce4270d37a0a929

function CorporateDashboardPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
<<<<<<< HEAD
  const [stats, setStats] = useState({
    totalProjects: 0,
    approvedProjects: 0,
    totalCommitted: 0,
    totalDisbursed: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null); // Added for View Details modal
=======
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
>>>>>>> 9b69005d4586ec2f41ef9a5cbce4270d37a0a929

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const [meResponse, projectsResponse, statsResponse] = await Promise.all([
          fetchCorporateMe(),
          csrProjectAPI.getMyProjects(),
          corporateAPI.getStats(),
        ]);

        setProfile(meResponse.data.corporate);
        setProjects(projectsResponse.data.items || []);
<<<<<<< HEAD
        if (statsResponse.data.stats) {
          setStats(statsResponse.data.stats);
        }
=======
        setStats(statsResponse.data.stats);
>>>>>>> 9b69005d4586ec2f41ef9a5cbce4270d37a0a929
        setError("");
      } catch (requestError) {
        setError("Unable to load dashboard. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const logout = () => {
    setAuthToken("");
<<<<<<< HEAD
    localStorage.removeItem('impactly_token');
    localStorage.removeItem('userRole');
    navigate("/corporate/login");
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return <div className="loading-container">Loading Corporate Dashboard...</div>;
  }

  if (error || !profile) {
    return <div className="error-container">{error || "Failed to load corporate data"}</div>;
  }

  return (
    <div className="ngo-dashboard">
      {/* Header */}
      <div className="dashboard-header corporate-header" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
        <div className="header-content">
          <div className="logo-section">
            <div className="org-avatar" style={{ backgroundColor: '#3b82f6' }}>
              {profile.companyName.charAt(0)}
            </div>
            <div>
              <h1>{profile.companyName}</h1>
              <p className="mission">{profile.industry || "Industry not set"}</p>
            </div>
          </div>
          <div className="header-actions">
            <Link to="/corporate/profile" className="btn-edit" style={{ background: 'rgba(255,255,255,0.1)' }}>
              Edit Profile
            </Link>
            <button onClick={logout} className="btn-logout" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5' }}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h3>Total Projects</h3>
            <p className="stat-value">{projects.length || stats.totalProjects}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>Approved Projects</h3>
            <p className="stat-value">{projects.filter(p => p.approvalStatus === 'approved').length || stats.approvedProjects}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>Total Funding Committed</h3>
            <p className="stat-value">₹{projects.reduce((acc, curr) => acc + (curr.budget || 0), 0) / 10000000 || (stats.totalCommitted / 10000000).toFixed(1)}Cr</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>Total Disbursed</h3>
            {stats.totalDisbursed > 0 ? (
              <p className="stat-value">₹{(stats.totalDisbursed / 10000000).toFixed(1)}Cr</p>
            ) : (
              <p className="stat-value" style={{ fontSize: '1rem', marginTop: '10px' }}>Pending</p>
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
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          My Projects {projects.length > 0 && `(${projects.length})`}
        </button>
        <button
          className={`tab-btn ${activeTab === 'impact' ? 'active' : ''}`}
          onClick={() => setActiveTab('impact')}
        >
          Impact Tracking
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="overview-card">
              <h3>Company Overview</h3>
              <div className="overview-grid">
                <div className="overview-item">
                  <label>Industry</label>
                  <p>{profile.industry || "Not provided"}</p>
                </div>
                <div className="overview-item">
                  <label>Location</label>
                  <p>Global Headquarters</p>
                </div>
                <div className="overview-item">
                  <label>Website</label>
                  {profile.website ? (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer">
                      {profile.website}
                    </a>
                  ) : (
                    <p>Not provided</p>
                  )}
                </div>
                <div className="overview-item">
                  <label>CSR Contact</label>
                  <p>{profile.contactPerson || "Not provided"}</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="actions-grid">
                <Link to="/corporate/projects/new" className="action-card">
                  <h4>➕ Create CSR Project</h4>
                  <p>Submit a new CSR initiative for NGO partnerships.</p>
                </Link>
                <Link to="/matchmaking" className="action-card">
                  <h4>🎯 Find NGO Partners</h4>
                  <p>Browse and match with verified NGOs.</p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="partnerships-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3>Your CSR Projects</h3>
              <Link to="/corporate/projects/new" className="btn-primary">
                Add New Project
              </Link>
            </div>
            
            {projects.length > 0 ? (
              <div className="partnerships-grid">
                {projects.map(project => (
                  <div key={project.id || project._id} className="partnership-card">
                    <div className="partnership-header">
                      <h4>{project.title}</h4>
                      <span className={`status ${project.approvalStatus?.toLowerCase() || 'pending'}`}>
                        {project.approvalStatus || 'pending'}
                      </span>
                    </div>
                    <p className="partnership-project">
                      <strong>Category:</strong> {project.category}
                    </p>
                    <p className="partnership-budget">
                      <strong>Budget:</strong> ₹{project.budget ? (project.budget / 10000000).toFixed(1) : 0}Cr
                    </p>
                    <p className="partnership-timeline">
                      <strong>Location:</strong> {project.location || 'Not specified'}
                    </p>
                    
                    {project.approvalStatus === "approved" && (
                      <div style={{ marginTop: '12px', padding: '8px', background: '#ecfdf5', color: '#047857', borderRadius: '4px', fontSize: '0.85rem' }}>
                        ✓ Approved. NGO matching in progress.
                      </div>
                    )}
                    {project.rejectionReason && (
                      <div style={{ marginTop: '12px', padding: '8px', background: '#fef2f2', color: '#b91c1c', borderRadius: '4px', fontSize: '0.85rem' }}>
                        ⚠ Rejected: {project.rejectionReason}
                      </div>
                    )}

                    <div className="partnership-actions" style={{ marginTop: '16px' }}>
                      <button className="btn-sm primary" onClick={() => openProjectDetails(project)}>View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No projects submitted yet</p>
                <Link to="/corporate/projects/new" className="btn-primary">
                  Create First Project
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="impact-section">
            <h3>Impact Tracking Overview</h3>
            <p>Monitor the real-world impact of your funded projects.</p>
            
            <div className="overview-card" style={{ marginTop: '24px' }}>
               <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                 <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📊</div>
                 <h4>Impact Dashboard</h4>
                 <p style={{ maxWidth: '400px', margin: '0 auto', lineHeight: '1.5' }}>
                   Track milestone achievements, view beneficiary metrics, and download 
                   quarterly reports submitted by your partnered NGOs.
                 </p>
                 <Link to="/impact-tracking" className="btn-primary" style={{ marginTop: '24px', display: 'inline-block' }}>
                   Open Full Impact Tracking
                 </Link>
               </div>
            </div>
          </div>
        )}

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeProjectDetails} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'white', padding: '32px', borderRadius: '12px', maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#1e293b' }}>{selectedProject.title}</h2>
              <button onClick={closeProjectDetails} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' }}>&times;</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</p>
                <p style={{ fontWeight: '500', color: '#334155' }}>{selectedProject.category}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Budget</p>
                <p style={{ fontWeight: '500', color: '#334155' }}>₹{selectedProject.budget ? (selectedProject.budget / 10000000).toFixed(1) : 0} Crore</p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</p>
                <p style={{ fontWeight: '500', color: '#334155' }}>{selectedProject.location}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</p>
                <span className={`status ${selectedProject.approvalStatus?.toLowerCase() || 'pending'}`} style={{ display: 'inline-block', marginTop: '4px' }}>
                  {selectedProject.approvalStatus || 'pending'}
                </span>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target Beneficiaries</p>
                <p style={{ fontWeight: '500', color: '#334155' }}>{selectedProject.beneficiaries ? selectedProject.beneficiaries.toLocaleString() : 'Not specified'}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Timeline</p>
                <p style={{ fontWeight: '500', color: '#334155' }}>{selectedProject.timeline || 'Not specified'}</p>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Description</p>
              <p style={{ color: '#334155', lineHeight: '1.6' }}>{selectedProject.description}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              <button className="btn-secondary" onClick={closeProjectDetails} style={{ marginRight: '12px' }}>Close</button>
              <Link to="/impact-tracking" className="btn-primary">View Impact Data</Link>
            </div>
          </div>
        </div>
      )}
    </div>
=======
    navigate("/corporate/login");
  };

  return (
    <section className="section-wrap">
      <div className="container">
        <p className="eyebrow">Corporate CSR Dashboard</p>
        <h1>Manage your CSR projects</h1>

        {loading && <p>Loading dashboard...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && profile && (
          <>
            <div className="csr-summary-grid">
              <article className="summary-tile">
                <p className="summary-kicker">Company</p>
                <h3>{profile.companyName}</h3>
                <p>{profile.industry || "Industry not set"}</p>
              </article>
              <article className="summary-tile">
                <p className="summary-kicker">Portfolio</p>
                <h3>{stats ? stats.totalProjects : 0} Projects</h3>
                <p>{stats ? `${stats.approvedProjects} approved` : "0 approved"}</p>
              </article>
              <article className="summary-tile">
                <p className="summary-kicker">Funding</p>
                <h3>₹{stats ? (stats.totalCommitted / 10000000).toFixed(1) : "0"}Cr</h3>
                {stats && stats.totalDisbursed > 0 ? (
                  <p>Disbursed ₹{(stats.totalDisbursed / 10000000).toFixed(1)}Cr</p>
                ) : (
                  <p>Disbursements will appear once partnerships are approved.</p>
                )}
              </article>
              <article className="summary-tile">
                <p className="summary-kicker">Actions</p>
                <div className="cta-row">
                  <Link className="btn btn-secondary" to="/corporate/profile">
                    Edit Profile
                  </Link>
                  <Link className="btn btn-primary" to="/corporate/projects/new">
                    Add CSR Project
                  </Link>
                </div>
              </article>
            </div>

            <div className="results-row">
              <h2>Your CSR Projects</h2>
            </div>
            {projects.length === 0 ? (
              <p>No projects submitted yet.</p>
            ) : (
              <div className="csr-summary-grid">
                {projects.map((project) => (
                  <article key={project.id} className="summary-tile">
                    <p className="summary-kicker">{project.category}</p>
                    <h3>{project.title}</h3>
                    <p>
                      Approval: {project.approvalStatus || "pending"}
                      {project.approvedAt ? ` · ${new Date(project.approvedAt).toLocaleDateString()}` : ""}
                    </p>
                    {project.approvalStatus === "approved" && (
                      <p>NGO matching in progress. You will be notified shortly.</p>
                    )}
                    {project.rejectionReason && (
                      <p className="error-text">Reason: {project.rejectionReason}</p>
                    )}

                    <div className="meta-grid" style={{ marginTop: "12px" }}>
                      <span>Location: {project.location || "Not specified"}</span>
                      <span>Timeline: {project.timeline || "To be confirmed"}</span>
                      <span>Budget: INR {project.budget?.toLocaleString("en-IN") || "0"}</span>
                      <span>Beneficiaries: {project.beneficiaries?.toLocaleString("en-IN") || "0"}</span>
                    </div>

                    {project.description && (
                      <p style={{ marginTop: "10px" }}>{project.description}</p>
                    )}

                    {project.sdgFocus?.length > 0 && (
                      <div className="project-card-tags" style={{ marginTop: "10px" }}>
                        {project.sdgFocus.map((sdg) => (
                          <span key={sdg} className="tag-chip">
                            {sdg}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}

            <div className="results-row">
              <button className="btn btn-secondary" onClick={logout} type="button">
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </section>
>>>>>>> 9b69005d4586ec2f41ef9a5cbce4270d37a0a929
  );
}

export default CorporateDashboardPage;
