import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPublicProjects, fetchBlogs } from '../services/api';
import '../styles/HomePage.css';

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setLoading(true);
        const [projectsRes, blogsRes] = await Promise.all([
          fetchPublicProjects({ limit: 3 }),
          fetchBlogs({ limit: 3 })
        ]);
        setProjects(projectsRes.data?.data || []);
        setBlogs(blogsRes.data?.data || []);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomepageData();
  }, []);

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="hero-content">
          <div className="hero-badge">Welcome to Impactly</div>
          <h1 className="hero-title">
            Amplify Your CSR with <span className="highlight">High-Impact</span> NGOs
          </h1>
          <p className="hero-subtitle">
            The premium platform to discover, fund, and track CSR initiatives globally. 
            Ensure legal compliance, find trusted partners, and measure your real-world impact with absolute clarity.
          </p>
          <div className="hero-actions">
            <Link to="/corporate/register" className="btn btn-primary">
              Launch CSR Projects
            </Link>
            <Link to="/ngo/register" className="btn btn-outline">
              Register as NGO
            </Link>
          </div>
        </div>
      </section>

      {/* OVERLAPPING FEATURES SECTION */}
      <section className="home-features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrap">🤝</div>
            <h3>Smart Matchmaking</h3>
            <p>
              Our AI-driven algorithm connects corporate CSR goals with the most relevant 
              and verified NGO projects, ensuring perfect alignment of mission and resources.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">📊</div>
            <h3>Impact Tracking</h3>
            <p>
              Monitor the progress of your funded initiatives in real-time. Receive automated 
              reports, milestone updates, and measurable social impact metrics.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">🛡️</div>
            <h3>Compliance & Trust</h3>
            <p>
              All NGOs undergo rigorous vetting. We ensure your CSR spend aligns with 
              legal requirements (like Schedule VII) and provide audit-ready transparency.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="home-how-it-works">
        <div className="section-header">
          <h2 className="section-title">How Impactly Works</h2>
          <p className="section-desc">
            A seamless, transparent journey from initial discovery to lasting global impact.
          </p>
        </div>
        <div className="hiw-container">
          <div className="hiw-step">
            <div className="hiw-content">
              <span className="step-number">01</span>
              <h3>Discover & Connect</h3>
              <p>
                Browse through our curated marketplace of verified NGOs and high-impact projects. 
                Filter by SDGs, regions, or causes that align perfectly with your corporate values. 
                Initiate contact with a single click.
              </p>
            </div>
            <div className="hiw-visual">
              🔍
            </div>
          </div>
          <div className="hiw-step">
            <div className="hiw-content">
              <span className="step-number">02</span>
              <h3>Fund & Execute</h3>
              <p>
                Once you find the perfect match, securely route your CSR funds. Our platform 
                handles the compliance documentation, ensuring every transaction meets 
                regulatory standards seamlessly.
              </p>
            </div>
            <div className="hiw-visual">
              💼
            </div>
          </div>
          <div className="hiw-step">
            <div className="hiw-content">
              <span className="step-number">03</span>
              <h3>Track Real Impact</h3>
              <p>
                Watch your contribution change lives. Receive regular field updates, photo 
                evidence, and quantitative metrics directly from the NGO on the ground. 
                Export reports for your annual CSR filings effortlessly.
              </p>
            </div>
            <div className="hiw-visual">
              📈
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="home-listings" style={{ backgroundColor: '#fff' }}>
        <div className="section-header">
          <h2 className="section-title">Featured CSR Projects</h2>
          <p className="section-desc">
            Discover active, verified initiatives ready for your corporate backing.
          </p>
        </div>

        {loading ? (
          <div className="empty-state">Loading active projects...</div>
        ) : projects.length > 0 ? (
          <>
            <div className="listings-grid">
              {projects.slice(0, 3).map((project) => (
                <div key={project._id} className="listing-card">
                  <div className="listing-image-placeholder">
                    🌱
                  </div>
                  <div className="listing-content">
                    <span className="listing-tag">Active Initiative</span>
                    <h3 className="listing-title">{project.title}</h3>
                    <p className="listing-desc">{project.description}</p>
                    <div className="listing-footer">
                      <span>Budget: ₹{project.budget?.toLocaleString() || 'N/A'}</span>
                      <Link to={`/project/${project._id}`} className="listing-link">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="view-all-wrapper">
              <Link to="/public-projects" className="btn btn-secondary">Explore All Projects</Link>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>No public projects available at the moment.</p>
          </div>
        )}
      </section>

      {/* RECENT BLOGS SECTION */}
      <section className="home-listings" style={{ backgroundColor: '#f8fafc' }}>
        <div className="section-header">
          <h2 className="section-title">Insights & Resources</h2>
          <p className="section-desc">
            Stay ahead with the latest trends in CSR frameworks and social impact stories.
          </p>
        </div>

        {loading ? (
          <div className="empty-state">Loading latest insights...</div>
        ) : blogs.length > 0 ? (
          <>
            <div className="listings-grid">
              {blogs.slice(0, 3).map((blog) => (
                <div key={blog._id} className="listing-card">
                  <div className="listing-image-placeholder" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' }}>
                    📰
                  </div>
                  <div className="listing-content">
                    <span className="listing-tag corporate">Knowledge Base</span>
                    <h3 className="listing-title">{blog.title}</h3>
                    <p className="listing-desc">{blog.summary || blog.content?.substring(0, 100) + '...'}</p>
                    <div className="listing-footer">
                      <span>{new Date(blog.createdAt || Date.now()).toLocaleDateString()}</span>
                      <Link to={`/blog/${blog._id}`} className="listing-link">Read Article</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="view-all-wrapper">
              <Link to="/blogs" className="btn btn-secondary">View All Articles</Link>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>No insights published yet.</p>
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section className="home-cta">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <h2 className="section-title">Ready to amplify your impact?</h2>
          <p className="section-desc">
            Join the ecosystem of forward-thinking corporations and dedicated non-profits.
          </p>
          <div className="cta-buttons">
            <Link to="/corporate/register" className="btn btn-white">Join as Corporate</Link>
            <Link to="/ngo/register" className="btn btn-outline-white">Join as NGO</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
