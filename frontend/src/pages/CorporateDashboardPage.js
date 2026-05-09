import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { csrProjectAPI, fetchCorporateMe, corporateAPI, setAuthToken } from "../services/api";

function CorporateDashboardPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setStats(statsResponse.data.stats);
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
  );
}

export default CorporateDashboardPage;
