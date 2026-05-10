import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/ImpactTracking.css';

export default function ImpactTrackingPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [impactUpdates, setImpactUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    metricName: '',
    metricValue: '',
    metricUnit: '',
    description: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchImpactUpdates(selectedProject.id);
    }
  }, [selectedProject]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const userRole = localStorage.getItem('userRole');
      
      if (userRole === 'ngo') {
        const ngoRes = await api.get('/ngo/profile');
        const ngoId = ngoRes.data.ngo._id;
        const partnershipsRes = await api.get(`/ngo/${ngoId}/partnerships`);
        
        const myProjects = (partnershipsRes.data.partnerships || []).map(p => ({
          id: p.projectId || p.project?._id,
          title: p.projectTitle || p.project?.title || 'CSR Project',
          location: 'Multiple Locations',
          progress: 50,
          beneficiaries: 150000,
          budget: p.budget || p.proposedBudget,
          sdgFocus: ['Education', 'Environment']
        }));
        
        setProjects(myProjects);
        if (myProjects.length > 0) {
          setSelectedProject(myProjects[0]);
        }
      } else {
        const response = await api.get('/csr-project/my-projects');
        const items = response.data.items || [];
        setProjects(items);
        if (items.length > 0) {
          setSelectedProject(items[0]);
        }

      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImpactUpdates = async (projectId) => {
    try {
      const response = await api.get(`/csr-project/${projectId}/impact`);
      setImpactUpdates(response.data.updates || []);
    } catch (error) {
      console.error('Failed to fetch impact updates:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitImpactUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/csr-project/${selectedProject.id}/impact`, formData);
      setImpactUpdates([...impactUpdates, response.data.update]);
      setFormData({ metricName: '', metricValue: '', metricUnit: '', description: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add impact update:', error);
    }
  };

  const calculateImpactSummary = (project) => {
    return {
      beneficiaries: project.beneficiaries || 0,
      budget: project.budget || 0,
      progress: project.progress || 0,
      sdgFocus: project.sdgFocus || [],
      metrics: impactUpdates.length,
    };
  };

  if (loading) {
    return <div className="loading-container">Loading impact tracking data...</div>;
  }

  const summary = selectedProject ? calculateImpactSummary(selectedProject) : {};

  return (
    <div className="impact-tracking-container">
      <div className="impact-header">
        <h1>📊 Impact Tracking Dashboard</h1>
        <p>Monitor and measure the real-world impact of your CSR initiatives</p>
      </div>

      <div className="impact-layout">
        {/* Sidebar */}
        <div className="impact-sidebar">
          <h3>Your Projects</h3>
          <div className="project-list">
            {projects.map(project => (
              <div
                key={project.id}
                className={`project-item ${selectedProject?.id === project.id ? 'active' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <h4>{project.title}</h4>
                <p className="project-location">{project.location}</p>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${project.progress || 0}%` }}
                    />
                  </div>
                  <span>{project.progress || 0}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="impact-main">
          {selectedProject && (
            <>
              {/* Summary Cards */}
              <div className="impact-summary">
                <div className="summary-card">
                  <div className="summary-icon">👥</div>
                  <div className="summary-content">
                    <h4>Total Beneficiaries</h4>
                    <p className="summary-value">{summary.beneficiaries.toLocaleString()}</p>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-icon">💰</div>
                  <div className="summary-content">
                    <h4>Project Budget</h4>
                    <p className="summary-value">₹{(summary.budget / 10000000).toFixed(1)}Cr</p>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-icon">🎯</div>
                  <div className="summary-content">
                    <h4>Overall Progress</h4>
                    <p className="summary-value">{summary.progress}%</p>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-icon">📈</div>
                  <div className="summary-content">
                    <h4>Metrics Tracked</h4>
                    <p className="summary-value">{summary.metrics}</p>
                  </div>
                </div>
              </div>

              {/* SDG Alignment */}
              <div className="sdg-section">
                <h3>SDG Alignment</h3>
                <div className="sdg-grid">
                  {selectedProject.sdgFocus && selectedProject.sdgFocus.map(sdg => (
                    <div key={sdg} className="sdg-badge">
                      {sdg}
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Updates Section */}
              <div className="impact-updates-section">
                <div className="section-header">
                  <h3>Impact Metrics & Updates</h3>
                  <button
                    className="btn-add-update"
                    onClick={() => setShowForm(!showForm)}
                  >
                    + Add Update
                  </button>
                </div>

                {showForm && (
                  <form onSubmit={handleSubmitImpactUpdate} className="impact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="metricName">Metric Name</label>
                        <input
                          id="metricName"
                          name="metricName"
                          value={formData.metricName}
                          onChange={handleFormChange}
                          placeholder="e.g., Lives Improved, Trees Planted"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="metricValue">Value</label>
                        <input
                          id="metricValue"
                          name="metricValue"
                          type="number"
                          value={formData.metricValue}
                          onChange={handleFormChange}
                          placeholder="e.g., 500"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="metricUnit">Unit</label>
                        <input
                          id="metricUnit"
                          name="metricUnit"
                          value={formData.metricUnit}
                          onChange={handleFormChange}
                          placeholder="e.g., People, Trees, Schools"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        placeholder="Add context or details about this metric"
                        rows="3"
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn-primary">
                        Add Metric
                      </button>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="updates-list">
                  {impactUpdates.length > 0 ? (
                    impactUpdates.map((update, idx) => (
                      <div key={idx} className="update-item">
                        <div className="update-header">
                          <h4>{update.metricName}</h4>
                          <span className="update-date">
                            {new Date(update.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="metric-value">
                          <strong>{update.metricValue}</strong> {update.metricUnit}
                        </p>
                        {update.description && (
                          <p className="update-description">{update.description}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="no-updates">
                      <p>No impact metrics recorded yet</p>
                      <button
                        className="btn-primary"
                        onClick={() => setShowForm(true)}
                      >
                        Add First Update
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Impact Visualization */}
              <div className="impact-viz-section">
                <h3>Impact Timeline</h3>
                <div className="timeline">
                  {impactUpdates.map((update, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-marker" />
                      <div className="timeline-content">
                        <p className="timeline-date">
                          {new Date(update.createdAt).toLocaleDateString()}
                        </p>
                        <p className="timeline-text">
                          <strong>{update.metricValue}</strong> {update.metricUnit} - {update.metricName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
