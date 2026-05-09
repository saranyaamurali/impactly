import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

export default function HomePage() {
  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="hero-content">
          <div className="hero-badge">India's CSR Partnership Platform</div>
          <h1 className="hero-title">
            Connecting Corporate CSR with <span className="highlight">Verified NGOs</span>
          </h1>
          <p className="hero-subtitle">
            Impactly is a structured platform that facilitates partnerships between corporate CSR teams 
            and credible non-profit organisations, ensuring compliance, accountability, and measurable social impact.
          </p>
          <div className="hero-actions">
            <Link to="/corporate/register" className="btn btn-primary">
              Register as Corporate
            </Link>
            <Link to="/ngo/register" className="btn btn-outline">
              Register as NGO
            </Link>
          </div>
        </div>
      </section>

      {/* PLATFORM PILLARS */}
      <section className="home-features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3>Structured Matchmaking</h3>
            <p>
              Corporates post CSR projects with defined scope, budget, and SDG alignment. 
              NGOs with matching expertise submit proposals. Partnerships are approved by 
              our admin team after due diligence.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </div>
            <h3>Impact Tracking</h3>
            <p>
              Monitor the progress of funded initiatives in real time. Track beneficiaries reached, 
              milestones completed, and funds utilised—with documentation for your CSR annual reports.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3>Compliance and Trust</h3>
            <p>
              All NGOs are vetted before onboarding. Projects are reviewed for alignment with 
              Schedule VII of the Companies Act. Your CSR spend is backed by audit-ready 
              documentation and transparent reporting.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — CORPORATE FLOW */}
      <section className="home-how-it-works">
        <div className="section-header">
          <h2 className="section-title">How Impactly Works</h2>
          <p className="section-desc">
            A transparent, step-by-step process for both corporate CSR teams and NGOs — 
            from registration through to verified impact.
          </p>
        </div>

        {/* Two-column flow layout */}
        <div className="hiw-two-col">
          {/* Corporate Flow */}
          <div className="hiw-flow-col">
            <div className="hiw-flow-header corporate-header">
              <div className="flow-header-label">For Corporates</div>
            </div>
            <div className="hiw-flow-steps">
              <div className="hiw-flow-step">
                <div className="flow-step-num">1</div>
                <div className="flow-step-body">
                  <h4>Register and Complete Your Profile</h4>
                  <p>Create your corporate account and provide company details, industry, headquarters, and your CSR focus areas. This profile is reviewed before you can publish projects.</p>
                </div>
              </div>
              <div className="hiw-flow-connector"></div>
              <div className="hiw-flow-step">
                <div className="flow-step-num">2</div>
                <div className="flow-step-body">
                  <h4>Create a CSR Project</h4>
                  <p>Submit a new project with your defined objective, target beneficiaries, geographic location, timeline, budget, and SDG alignment. Projects are reviewed and approved by our admin team.</p>
                </div>
              </div>
              <div className="hiw-flow-connector"></div>
              <div className="hiw-flow-step">
                <div className="flow-step-num">3</div>
                <div className="flow-step-body">
                  <h4>Receive and Review NGO Proposals</h4>
                  <p>Once your project is approved, registered NGOs with relevant expertise will submit implementation proposals. Each proposal includes their scope, proposed budget, and expected outcomes.</p>
                </div>
              </div>
              <div className="hiw-flow-connector"></div>
              <div className="hiw-flow-step">
                <div className="flow-step-num">4</div>
                <div className="flow-step-body">
                  <h4>Partnership Confirmed and Executed</h4>
                  <p>Admin facilitates the formal partnership. The NGO executes the project and submits periodic progress reports, impact data, and documentation directly on the platform.</p>
                </div>
              </div>
              <div className="hiw-flow-connector"></div>
              <div className="hiw-flow-step">
                <div className="flow-step-num">5</div>
                <div className="flow-step-body">
                  <h4>Track Impact and Export Reports</h4>
                  <p>Access real-time impact metrics—beneficiaries reached, funds disbursed, and milestones achieved. Export audit-ready CSR reports for regulatory filings with ease.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hiw-col-divider"></div>

          {/* NGO Flow */}
          <div className="hiw-flow-col">
            <div className="hiw-flow-header ngo-header">
              <div className="flow-header-label">For NGOs</div>
            </div>
            <div className="hiw-flow-steps">
              <div className="hiw-flow-step">
                <div className="flow-step-num ngo-num">1</div>
                <div className="flow-step-body">
                  <h4>Register and Submit Organisation Details</h4>
                  <p>Register your NGO with all relevant details — registration number, mission statement, focus areas, operational regions, and contact information. Your profile is reviewed by our team.</p>
                </div>
              </div>
              <div className="hiw-flow-connector"></div>
              <div className="hiw-flow-step">
                <div className="flow-step-num ngo-num">2</div>
                <div className="flow-step-body">
                  <h4>Browse Approved Corporate Projects</h4>
                  <p>Once onboarded, access a list of admin-approved corporate CSR projects open for NGO proposals. Filter by category, SDG focus, budget, and location to find the best fit.</p>
                </div>
              </div>
              <div className="hiw-flow-connector"></div>
              <div className="hiw-flow-step">
                <div className="flow-step-num ngo-num">3</div>
                <div className="flow-step-body">
                  <h4>Submit a Partnership Proposal</h4>
                  <p>For projects aligned with your expertise, submit a detailed proposal including your implementation scope, proposed budget, and expected measurable outcomes. The proposal is reviewed by admin.</p>
                </div>
              </div>
              <div className="hiw-flow-connector"></div>
              <div className="hiw-flow-step">
                <div className="flow-step-num ngo-num">4</div>
                <div className="flow-step-body">
                  <h4>Get Matched and Begin Execution</h4>
                  <p>Upon admin approval, your partnership with the corporate is formalised. Begin project execution as per the agreed scope and timeline with full platform support.</p>
                </div>
              </div>
              <div className="hiw-flow-connector"></div>
              <div className="hiw-flow-step">
                <div className="flow-step-num ngo-num">5</div>
                <div className="flow-step-body">
                  <h4>Report Progress and Submit Impact Data</h4>
                  <p>Regularly update your project dashboard with milestones, beneficiary counts, and supporting documentation. This data flows directly to the corporate's CSR tracking view.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="home-cta">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <h2 className="section-title">Ready to get started?</h2>
          <p className="section-desc">
            Join Impactly and be part of a credible, transparent CSR ecosystem that creates lasting social impact.
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
