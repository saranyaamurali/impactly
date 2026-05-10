import { Link } from "react-router-dom";

const statusLabel = {
  active: "Active",
  pending: "Planned",
  completed: "Completed",
};

function ProjectCard({ project }) {
  const statusClass = `status-chip status-${project.status}`;

  return (
    <article className="card project-card">
      <div className="card-topline">
        <span className="pill">{project.category}</span>
        <span className={statusClass}>{statusLabel[project.status] || "Open"}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-card-highlights">
        <span>{project.companySponsor}</span>
        <span>{project.beneficiaries.toLocaleString("en-IN")} beneficiaries</span>
      </div>
      <div className="meta-grid">
        <span>Location: {project.location}</span>
        <span>Timeline: {project.timeline}</span>
        <span>Budget: INR {project.budget.toLocaleString("en-IN")}</span>
        <span>Partner: {project.implementingPartner}</span>
      </div>
      <div className="project-card-tags">
        {project.sdgFocus.slice(0, 2).map((sdg) => (
          <span key={sdg} className="tag-chip">
            {sdg}
          </span>
        ))}
      </div>
      {project.officialWebsite && (
        <a
          className="text-link"
          href={project.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
        >
          Official project website
        </a>
      )}
      <Link className="text-link" to={`/csr-projects/${project.id}`}>
        View project details
      </Link>
    </article>
  );
}

export default ProjectCard;
