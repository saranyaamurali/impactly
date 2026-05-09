import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCorporateMe, fetchMyCsrProjects, setAuthToken } from "../services/api";

function CorporateDashboardPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const [meResponse, projectsResponse] = await Promise.all([
          fetchCorporateMe(),
          fetchMyCsrProjects(),
        ]);

        setProfile(meResponse.data.corporate);
        setProjects(projectsResponse.data.projects || []);
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
                <p className="summary-kicker">CSR Projects</p>
                <h3>{projects.length}</h3>
                <p>Projects created from your corporate account.</p>
              </article>
              <article className="summary-tile">
                <p className="summary-kicker">Actions</p>
                <div className="cta-row">
                  <Link className="btn btn-secondary" to="/corporate/profile">
                    Edit Profile
                  </Link>
                  <Link className="btn btn-primary" to="/corporate/project/submit">
                    Submit CSR Project
                  </Link>
                </div>
              </article>
            </div>

            <div className="results-row">
              <h2>My Projects</h2>
              <button className="btn btn-secondary" onClick={logout} type="button">
                Logout
              </button>
            </div>

            <div className="cards-grid">
              {projects.map((project) => (
                <article className="card" key={project.id}>
                  <h3>{project.title}</h3>
                  <p>{project.description || "No description provided yet."}</p>
                  <div className="meta-grid">
                    <span>Category: {project.category}</span>
                    <span>Location: {project.location}</span>
                    <span>Status: {project.status}</span>
                    <span>Budget: INR {Number(project.budget || 0).toLocaleString("en-IN")}</span>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default CorporateDashboardPage;
