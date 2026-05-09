import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

export default function HomePage() {
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
