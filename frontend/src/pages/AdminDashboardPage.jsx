import React, { useState, useEffect } from 'react';
import { adminAPI, csrArticleAPI } from '../services/api';

const CATEGORIES = [
  'CSR Basics',
  'Legal Compliance',
  'Best Practices',
  'Impact Measurement',
  'Environment & Sustainability',
  'Education',
  'Health & Wellness',
  'Livelihood & Poverty',
  'Community Development',
  'Data & Analytics',
  'Disaster Relief',
  'Stakeholder Engagement',
  'Reporting & Transparency',
  'Innovation & Technology',
  'Future Outlook'
];

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState([]);
  const [pendingProjects, setPendingProjects] = useState([]);
  const [pendingPartnerships, setPendingPartnerships] = useState([]);
  const [pendingNgos, setPendingNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'CSR Basics',
    image: '',
    link: '',
    author: '',
    readTime: ''
  });

  useEffect(() => {
    fetchArticles();
    fetchApprovals();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await csrArticleAPI.getArticles({ limit: 100 });
      setArticles(res.data.items || []);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles.");
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovals = async () => {
    try {
      const [projectsRes, partnershipsRes, ngosRes] = await Promise.all([
        adminAPI.getPendingProjects(),
        adminAPI.getPendingPartnerships(),
        adminAPI.getPendingNgos(),
      ]);
      setPendingProjects(projectsRes.data.items || []);
      setPendingPartnerships(partnershipsRes.data.items || []);
      setPendingNgos(ngosRes.data.items || []);
    } catch (err) {
      console.error('Error fetching approvals:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateArticle = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await csrArticleAPI.createArticle(formData);
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'CSR Basics',
        image: '',
        link: '',
        author: '',
        readTime: ''
      });
      // Refresh list
      fetchArticles();
    } catch (err) {
      console.error("Error creating article:", err);
      setError("Failed to create article. Please check all required fields.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) return;
    
    try {
      await csrArticleAPI.deleteArticle(id);
      fetchArticles();
    } catch (err) {
      console.error("Error deleting article:", err);
      alert("Failed to delete article.");
    }
  };

  const handleApproveProject = async (projectId) => {
    try {
      await adminAPI.approveProject(projectId);
      fetchApprovals();
    } catch (err) {
      console.error('Error approving project:', err);
      alert('Failed to approve project.');
    }
  };

  const handleRejectProject = async (projectId) => {
    const reason = window.prompt('Rejection reason (optional):') || '';
    try {
      await adminAPI.rejectProject(projectId, { rejectionReason: reason });
      fetchApprovals();
    } catch (err) {
      console.error('Error rejecting project:', err);
      alert('Failed to reject project.');
    }
  };

  const handleApprovePartnership = async (partnershipId) => {
    try {
      await adminAPI.approvePartnership(partnershipId);
      fetchApprovals();
    } catch (err) {
      console.error('Error approving partnership:', err);
      alert('Failed to approve partnership.');
    }
  };

  const handleRejectPartnership = async (partnershipId) => {
    const reason = window.prompt('Rejection reason (optional):') || '';
    try {
      await adminAPI.rejectPartnership(partnershipId, { rejectionReason: reason });
      fetchApprovals();
    } catch (err) {
      console.error('Error rejecting partnership:', err);
      alert('Failed to reject partnership.');
    }
  };

  const handleVerifyNgo = async (ngoId) => {
    try {
      await adminAPI.verifyNgo(ngoId);
      fetchApprovals();
    } catch (err) {
      console.error('Error verifying NGO:', err);
      alert('Failed to verify NGO.');
    }
  };

  const handleRejectNgo = async (ngoId) => {
    if (!window.confirm("Are you sure you want to reject this NGO's verification?")) return;
    try {
      await adminAPI.rejectNgo(ngoId);
      fetchApprovals();
    } catch (err) {
      console.error('Error rejecting NGO:', err);
      alert('Failed to reject NGO.');
    }
  };

  return (
    <div className="section-wrap" style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container">
        
        <div style={{ marginBottom: '40px' }}>
          <h1>Admin Portal: Manage CSR Articles</h1>
          <p>Insert new articles or remove existing ones from the public discovery view.</p>
        </div>

        {error && <div className="error-text" style={{ padding: '16px', background: '#fee2e2', borderRadius: '8px', marginBottom: '24px' }}>{error}</div>}

        {/* Add New Article Form */}
        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '48px' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>Insert New Article</h2>
          
          <form onSubmit={handleCreateArticle} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Article Title *</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                placeholder="e.g., The Future of Sustainable Business"
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Description Summary *</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                required 
                rows="3"
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontFamily: 'inherit' }}
                placeholder="A short summary of what this article covers..."
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Category *</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange} 
                required
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>External URL Link *</label>
              <input 
                type="url" 
                name="link" 
                value={formData.link} 
                onChange={handleInputChange} 
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                placeholder="https://..."
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Image URL *</label>
              <input 
                type="url" 
                name="image" 
                value={formData.image} 
                onChange={handleInputChange} 
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Author / Source *</label>
              <input 
                type="text" 
                name="author" 
                value={formData.author} 
                onChange={handleInputChange} 
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                placeholder="e.g., Harvard Business Review"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Read Time *</label>
              <input 
                type="text" 
                name="readTime" 
                value={formData.readTime} 
                onChange={handleInputChange} 
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                placeholder="e.g., 5 min"
              />
            </div>

            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
                style={{ background: '#0f172a', borderColor: '#0f172a' }}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Article'}
              </button>
            </div>

          </form>
        </div>

        {/* Existing Articles Table */}
        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Active Articles Displayed</h2>
            <span style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '20px', fontSize: '0.875rem', fontWeight: '600' }}>
              {articles.length} Total
            </span>
          </div>

          {loading ? (
            <p>Loading articles...</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '16px', color: '#64748b', fontWeight: '600' }}>Article</th>
                    <th style={{ padding: '16px', color: '#64748b', fontWeight: '600' }}>Category</th>
                    <th style={{ padding: '16px', color: '#64748b', fontWeight: '600' }}>Source</th>
                    <th style={{ padding: '16px', color: '#64748b', fontWeight: '600' }}>Stats</th>
                    <th style={{ padding: '16px', color: '#64748b', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                        No articles currently published.
                      </td>
                    </tr>
                  ) : (
                    articles.map(article => (
                      <tr key={article._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '16px', maxWidth: '300px' }}>
                          <div style={{ fontWeight: '600', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={article.title}>
                            {article.title}
                          </div>
                          <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: '#3b82f6', textDecoration: 'none' }}>
                            View Link ↗
                          </a>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>
                            {article.category}
                          </span>
                        </td>
                        <td style={{ padding: '16px', fontSize: '0.95rem' }}>
                          {article.author}
                        </td>
                        <td style={{ padding: '16px', fontSize: '0.85rem', color: '#64748b' }}>
                          {article.views || 0} views<br/>
                          {article.clicks || 0} clicks
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <button 
                            onClick={() => handleDeleteArticle(article._id)}
                            style={{ 
                              background: '#fee2e2', 
                              color: '#ef4444', 
                              border: 'none', 
                              padding: '8px 16px', 
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontWeight: '500'
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginTop: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Pending CSR Projects</h2>
          {pendingProjects.length === 0 ? (
            <p>No projects awaiting approval.</p>
          ) : (
            pendingProjects.map(project => (
              <div key={project._id} style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 0' }}>
                <strong>{project.title}</strong>
                <div style={{ color: '#64748b', marginTop: '4px' }}>{project.category} • {project.location}</div>
                <div style={{ marginTop: '12px' }}>
                  <button className="btn btn-primary" onClick={() => handleApproveProject(project._id)}>
                    Approve
                  </button>
                  <button className="btn btn-secondary" onClick={() => handleRejectProject(project._id)} style={{ marginLeft: '8px' }}>
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginTop: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Pending NGO Proposals</h2>
          {pendingPartnerships.length === 0 ? (
            <p>No partnership proposals awaiting approval.</p>
          ) : (
            pendingPartnerships.map(partnership => (
              <div key={partnership._id} style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 0' }}>
                <strong>{partnership.projectId?.title}</strong>
                <div style={{ color: '#64748b', marginTop: '4px' }}>
                  NGO: {partnership.ngoId?.ngoName} • Corporate: {partnership.corporateId?.companyName}
                </div>
                <div style={{ marginTop: '12px' }}>
                  <button className="btn btn-primary" onClick={() => handleApprovePartnership(partnership._id)}>
                    Approve
                  </button>
                  <button className="btn btn-secondary" onClick={() => handleRejectPartnership(partnership._id)} style={{ marginLeft: '8px' }}>
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginTop: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Pending NGO Verifications</h2>
          {pendingNgos.length === 0 ? (
            <p>No NGOs awaiting verification.</p>
          ) : (
            pendingNgos.map(ngo => (
              <div key={ngo._id} style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 0' }}>
                <strong>{ngo.ngoName}</strong>
                <div style={{ color: '#64748b', marginTop: '4px' }}>
                  Mission: {ngo.mission} • Contact: {ngo.contactPerson} ({ngo.phone})
                </div>
                {ngo.documents?.certifications?.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <strong>Documents:</strong>
                    <ul style={{ margin: '4px 0 0 20px', padding: 0 }}>
                      {ngo.documents.certifications.map((doc, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>
                          <a 
                            href={`data:${doc.contentType || 'application/pdf'};base64,${doc.data}`} 
                            download={doc.name || `document_${idx + 1}`} 
                            style={{ color: '#3b82f6', textDecoration: 'none' }}
                          >
                            📄 {doc.name || `Document ${idx + 1}`}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div style={{ marginTop: '12px' }}>
                  <button className="btn btn-primary" onClick={() => handleVerifyNgo(ngo._id)}>
                    Verify
                  </button>
                  <button className="btn btn-secondary" onClick={() => handleRejectNgo(ngo._id)} style={{ marginLeft: '8px' }}>
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
