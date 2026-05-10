import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import '../styles/Matchmaking.css';

export default function MatchmakingPage() {
  const [ngos, setNgos] = useState([]);
  const [projects, setProjects] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('matches');
  const [filters, setFilters] = useState({
    focusArea: '',
    location: '',
    budget: 'all',
  });

  const calculateAlignment = (ngo, project) => {
    let score = 0;

    // Focus area alignment (max 40 points)
    const ngoFocus = ngo.focusAreas || [];
    const projectFocus = project.category ? [project.category] : [];
    const commonFocus = ngoFocus.filter(f => projectFocus.includes(f));
    score += ngoFocus.length > 0 ? (commonFocus.length / ngoFocus.length) * 40 : 20;

    // Location match (max 30 points)
    if (ngo.states && project.location && ngo.states.includes(project.location)) {
      score += 30;
    } else if (ngo.states && project.location) {
      score += 15;
    }

    // Scale compatibility (max 20 points)
    if (ngo.budget && project.budget) {
      const budgetRatio = project.budget / ngo.budget;
      if (budgetRatio > 0.5 && budgetRatio < 2) {
        score += 20;
      } else if (budgetRatio > 0.25 && budgetRatio < 4) {
        score += 10;
      }
    }

    // Mission alignment (max 10 points)
    if (ngo.mission && project.description) {
      const missionKeywords = ngo.mission.toLowerCase().split(' ');
      const projectKeywords = project.description.toLowerCase().split(' ');
      const matches = missionKeywords.filter(kw => projectKeywords.includes(kw)).length;
      score += Math.min((matches / missionKeywords.length) * 10, 10);
    }

    return Math.round(score);
  };

  const getMatchReasons = (ngo, project) => {
    const reasons = [];

    const ngoFocus = ngo.focusAreas || [];
    const projectFocus = project.category ? [project.category] : [];
    const commonFocus = ngoFocus.filter(f => projectFocus.includes(f));
    if (commonFocus.length > 0) {
      reasons.push(`Aligned focus areas: ${commonFocus.join(', ')}`);
    }

    if (ngo.states && project.location && ngo.states.includes(project.location)) {
      reasons.push(`Operating in same location: ${project.location}`);
    }

    return reasons;
  };

  const calculateMatches = useCallback((ngoList, projectList) => {
    const matchList = [];

    ngoList.forEach(ngo => {
      projectList.forEach(project => {
        const alignmentScore = calculateAlignment(ngo, project);
        if (alignmentScore >= 50) {
          matchList.push({
            id: `${ngo.id}-${project.id}`,
            ngo,
            project,
            score: alignmentScore,
            matchReasons: getMatchReasons(ngo, project),
          });
        }
      });
    });

    matchList.sort((a, b) => b.score - a.score);
    setMatches(matchList);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [ngosRes, projectsRes] = await Promise.all([
        api.get('/ecosystem/ngos'),
        api.get('/csr-project/public'),
      ]);

      const ngoItems = ngosRes.data.ngos || [];
      const projectItems = projectsRes.data.items || [];

      setNgos(ngoItems);
      setProjects(projectItems);
      calculateMatches(ngoItems, projectItems);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }, [calculateMatches]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getMatchColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#3b82f6';
    if (score >= 50) return '#f59e0b';
    return '#6b7280';
  };

  const filteredMatches = matches.filter(match => {
    if (filters.focusArea && !match.ngo.focusAreas.includes(filters.focusArea)) return false;
    if (filters.location && match.project.location !== filters.location) return false;
    if (filters.budget !== 'all') {
      const budget = match.project.budget || 0;
      if (filters.budget === 'low' && budget > 10000000) return false;
      if (filters.budget === 'medium' && (budget < 10000000 || budget > 50000000)) return false;
      if (filters.budget === 'high' && budget < 50000000) return false;
    }
    return true;
  });

  if (loading) {
    return <div className="loading-container">Loading matchmaking data...</div>;
  }

  return (
    <div className="matchmaking-container">
      <div className="matchmaking-header">
          <h1>🎯 Smart Matchmaking Engine</h1>
          <p>Discover perfect partnerships between NGOs and approved CSR initiatives</p>
        </div>

      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'matches' ? 'active' : ''}`}
          onClick={() => setActiveTab('matches')}
        >
          Best Matches ({matches.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'ngo-browse' ? 'active' : ''}`}
          onClick={() => setActiveTab('ngo-browse')}
        >
          Browse NGOs ({ngos.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'project-browse' ? 'active' : ''}`}
          onClick={() => setActiveTab('project-browse')}
        >
          Browse Projects ({projects.length})
        </button>
      </div>

      {activeTab === 'matches' && (
        <div className="matches-section">
          <div className="filter-bar">
            <select
              value={filters.focusArea}
              onChange={(e) => setFilters({ ...filters, focusArea: e.target.value })}
              className="filter-select"
            >
              <option value="">All Focus Areas</option>
              {['Education', 'Healthcare', 'Environment', 'Poverty', 'Women Empowerment'].map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>

            <select
              value={filters.budget}
              onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
              className="filter-select"
            >
              <option value="all">All Budget Ranges</option>
              <option value="low">Low (&lt; Rs. 1Cr)</option> 
              <option value="medium">Medium (Rs. 1-5Cr)</option>
              <option value="high">High (&gt; Rs. 5Cr)</option>
            </select>
          </div>

          <div className="matches-grid">
            {filteredMatches.length > 0 ? (
              filteredMatches.map(match => (
                <div key={match.id} className="match-card">
                  <div
                    className="match-score"
                    style={{ backgroundColor: getMatchColor(match.score) }}
                  >
                    {match.score}%
                  </div>

                  <div className="match-content">
                    <div className="match-header">
                      <h3>
                        {match.ngo.ngoName}
                        {match.ngo.verificationStatus === 'verified' && <span title="Verified NGO" style={{ marginLeft: '8px' }}>🛡️</span>}
                      </h3>
                      <span className="match-badge">
                        {match.score >= 80 ? 'Excellent' : match.score >= 60 ? 'Good' : 'Fair'} Match
                      </span>
                    </div>

                    <p className="match-mission">{match.ngo.mission}</p>

                    <div className="match-details">
                      <div className="detail-item">
                        <span className="detail-label">📍 Location:</span>
                        <span className="detail-value">{match.project.location}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">💰 Budget:</span>
                        <span className="detail-value">₹{(match.project.budget / 10000000).toFixed(1)}Cr</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">🎯 Focus:</span>
                        <span className="detail-value">{match.project.csrCategory}</span>
                      </div>
                    </div>

                    <div className="match-reasons">
                      <h4>Why this match works:</h4>
                      <ul>
                        {match.matchReasons.map((reason, idx) => (
                          <li key={idx}>✓ {reason}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="match-actions">
                      <button className="btn-primary">View Project</button>
                      <button className="btn-secondary">Send Proposal</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-matches">
                <p>Matchmaking is in progress. Approved projects will appear here shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'ngo-browse' && (
        <div className="browse-section">
          <div className="browse-grid">
            {ngos.map(ngo => (
              <div key={ngo.id} className="browse-card ngo-card">
                <h3>
                  {ngo.ngoName}
                  {ngo.verificationStatus === 'verified' && <span title="Verified NGO" style={{ marginLeft: '8px' }}>🛡️</span>}
                </h3>
                <p className="mission">{ngo.mission}</p>
                <div className="focus-areas">
                  {ngo.focusAreas && ngo.focusAreas.slice(0, 3).map(area => (
                    <span key={area} className="tag">{area}</span>
                  ))}
                </div>
                <button className="btn-small">View Profile</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'project-browse' && (
        <div className="browse-section">
          <div className="browse-grid">
            {projects.map(project => (
              <div key={project.id} className="browse-card project-card">
                <h3>{project.title}</h3>
                <p className="location">📍 {project.location}</p>
                <p className="budget">💰 ₹{(project.budget / 10000000).toFixed(1)}Cr</p>
                <p className="category">🎯 {project.csrCategory}</p>
                <button className="btn-small">View Details</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
