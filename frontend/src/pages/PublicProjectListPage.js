import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { fetchPublicProjects } from "../services/api";

const categories = [
  "All",
  "Education",
  "Healthcare",
  "Environment",
  "Livelihood",
  "Digital Inclusion",
  "WASH",
];

function PublicProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const params = {
          limit: 20,
        };

        if (search.trim()) {
          params.search = search.trim();
        }

        if (category !== "All") {
          params.category = category;
        }

        if (location.trim()) {
          params.location = location.trim();
        }

        const response = await fetchPublicProjects(params);
        setProjects(response.items || []);
        setError("");
      } catch (requestError) {
        setError("Unable to load CSR projects right now.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [search, category, location]);

  const activeFilters = useMemo(() => {
    const filters = [];
    if (category !== "All") {
      filters.push(category);
    }
    if (location.trim()) {
      filters.push(location.trim());
    }
    if (search.trim()) {
      filters.push(`Search: ${search.trim()}`);
    }
    return filters;
  }, [category, location, search]);

  const insightStats = useMemo(() => {
    const totalBudget = projects.reduce((sum, item) => sum + item.budget, 0);
    const activeCount = projects.filter((item) => item.status === "active").length;
    const beneficiaries = projects.reduce(
      (sum, item) => sum + (item.beneficiaries || 0),
      0
    );

    return {
      totalBudget,
      activeCount,
      beneficiaries,
    };
  }, [projects]);

  return (
    <section className="section-wrap">
      <div className="container">
        <p className="eyebrow">Public CSR Discovery</p>
        <h1>Browse CSR projects shaping local impact</h1>
        <p className="section-intro">
          This page surfaces curated or approved CSR projects for open discovery
          and public transparency.
        </p>

        <div className="ad-strip">
          <p className="eyebrow">Ad Space</p>
          <h3>CSR Launchpad Sponsored Slot</h3>
          <p>
            Paid placement zone for sustainability campaigns, annual reports, and
            impact announcements.
          </p>
          <Link className="btn btn-secondary" to="/csr-projects/information">
            Open 100+ CSR Information View
          </Link>
        </div>

        <div className="csr-summary-grid">
          <article className="summary-tile">
            <p className="summary-kicker">Visible Projects</p>
            <h3>{projects.length}</h3>
            <p>Curated initiatives available for public discovery.</p>
          </article>
          <article className="summary-tile">
            <p className="summary-kicker">Total Beneficiaries</p>
            <h3>{insightStats.beneficiaries.toLocaleString("en-IN")}</h3>
            <p>Estimated direct participants in current filtered projects.</p>
          </article>
          <article className="summary-tile">
            <p className="summary-kicker">Aggregate Budget</p>
            <h3>INR {insightStats.totalBudget.toLocaleString("en-IN")}</h3>
            <p>
              Active initiatives: <strong>{insightStats.activeCount}</strong>
            </p>
          </article>
        </div>

        <div className="filters-grid">
          <label>
            Search
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Project title, description, impact"
            />
          </label>
          <label>
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            Location
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="State or region"
            />
          </label>
        </div>

        {activeFilters.length > 0 && (
          <div className="active-filters">
            {activeFilters.map((filter) => (
              <span key={filter} className="pill">
                {filter}
              </span>
            ))}
          </div>
        )}

        {loading && <p>Loading projects...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <>
            <div className="results-row">
              <h2>Project Portfolio</h2>
              <p>{projects.length} matching projects</p>
            </div>
            <div className="cards-grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default PublicProjectListPage;
