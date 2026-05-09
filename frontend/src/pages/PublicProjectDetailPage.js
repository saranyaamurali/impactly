import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPublicProjectById } from "../services/api";

const statusLabel = {
  active: "Active",
  pending: "Planned",
  completed: "Completed",
};

function PublicProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const response = await fetchPublicProjectById(id);
        setProject(response);
        setError("");
      } catch (requestError) {
        setError("Project details are unavailable.");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <section className="section-wrap">
        <div className="container">
          <p>Loading project...</p>
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="section-wrap">
        <div className="container">
          <p className="error-text">{error || "Project not found."}</p>
          <Link className="text-link" to="/csr-projects">
            Back to CSR listings
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-wrap">
      <div className="container detail-layout">
        <div>
          <p className="eyebrow">Public CSR Detail</p>
          <h1>{project.title}</h1>
          <p className="section-intro">{project.description}</p>
          <div className="meta-grid project-detail-meta">
            <span>Category: {project.category}</span>
            <span>Location: {project.location}</span>
            <span>Budget: INR {project.budget.toLocaleString("en-IN")}</span>
            <span>Timeline: {project.timeline}</span>
            <span>Beneficiaries: {project.beneficiaries.toLocaleString("en-IN")}</span>
            <span>Lead Sponsor: {project.companySponsor}</span>
            <span>Implementation Partner: {project.implementingPartner}</span>
            <span>
              Status: <span className={`status-chip status-${project.status}`}>{statusLabel[project.status]}</span>
            </span>
          </div>

          <div className="detail-surface">
            <h3>District Coverage</h3>
            <div className="active-filters">
              {project.districts.map((item) => (
                <span key={item} className="pill">
                  {item}
                </span>
              ))}
            </div>
            <h3>Progress</h3>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${project.progressPercent || 0}%` }}
              />
            </div>
            <p className="progress-copy">{project.progressPercent || 0}% milestones completed</p>
          </div>

          <h3>Impact Idea</h3>
          <p>{project.impactIdea}</p>

          {Array.isArray(project.expectedOutcomes) && project.expectedOutcomes.length > 0 && (
            <>
              <h3>Expected Outcomes</h3>
              <ul className="detail-list">
                {project.expectedOutcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}

          <h3>SDG Alignment</h3>
          <div className="active-filters">
            {project.sdgFocus.map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>

          <div className="detail-surface">
            <h3>Official Links</h3>
            {project.officialWebsite && (
              <p>
                Project Page:{" "}
                <a
                  className="text-link"
                  href={project.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.officialWebsite}
                </a>
              </p>
            )}
            {project.sourceWebsite && (
              <p>
                Source / CSR Page:{" "}
                <a
                  className="text-link"
                  href={project.sourceWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.sourceWebsite}
                </a>
              </p>
            )}
          </div>
        </div>
        <aside className="detail-aside">
          <h4>Public Information Notice</h4>
          <p>
            This page is intended for transparent public understanding of CSR
            direction and intent.
          </p>
          <p>
            Live implementation metrics, fund-level tracking, and execution
            links are part of future product phases.
          </p>
          <p className="aside-callout">
            Project data includes sponsor, partner, coverage, and projected outcomes
            to help communities and stakeholders evaluate initiative intent.
          </p>
          <Link className="btn btn-secondary" to="/csr-projects">
            Explore More Projects
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default PublicProjectDetailPage;
