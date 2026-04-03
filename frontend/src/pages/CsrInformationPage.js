import { useEffect, useMemo, useState } from "react";
import { fetchCsrInformationProjects } from "../services/api";

const categories = ["All", "Education", "Healthcare", "Livelihood", "Environment"];

function CsrInformationPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [organization, setOrganization] = useState("");

  useEffect(() => {
    const loadInformationProjects = async () => {
      try {
        setLoading(true);
        const params = { limit: 120 };

        if (search.trim()) {
          params.search = search.trim();
        }

        if (category !== "All") {
          params.category = category;
        }

        if (organization.trim()) {
          params.organization = organization.trim();
        }

        const response = await fetchCsrInformationProjects(params);
        setItems(response.items || []);
        setError("");
      } catch (requestError) {
        setError(
          "Unable to load CSR information entries. Please ensure the backend is running on port 5000."
        );
      } finally {
        setLoading(false);
      }
    };

    loadInformationProjects();
  }, [search, category, organization]);

  const categoryCounts = useMemo(() => {
    const grouped = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([name, count]) => `${name}: ${count}`)
      .join(" | ");
  }, [items]);

  return (
    <section className="section-wrap">
      <div className="container">
        <p className="eyebrow">CSR Information View</p>
        <h1>100+ CSR program information entries with official links</h1>
        <p className="section-intro">
          This page is an information view designed for discovery. Entries are linked to
          organization sustainability or CSR pages for public reference.
        </p>

        <div className="ad-strip">
          <p className="eyebrow">Ad Space</p>
          <h3>Featured Sustainability Partner Slot</h3>
          <p>Reserved banner area for paid placements and campaign promotion.</p>
        </div>

        <div className="filters-grid">
          <label>
            Search
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Program title, organization, category"
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
            Organization
            <input
              value={organization}
              onChange={(event) => setOrganization(event.target.value)}
              placeholder="Tata, Infosys, HCL, NTPC"
            />
          </label>
        </div>

        {!loading && !error && (
          <div className="summary-tile info-summary">
            <p className="summary-kicker">Information Coverage</p>
            <h3>{items.length} entries</h3>
            <p>{categoryCounts}</p>
          </div>
        )}

        {loading && <p>Loading CSR information entries...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <div className="table-wrap">
            <table className="info-table">
              <thead>
                <tr>
                  <th>Program Information Entry</th>
                  <th>Organization</th>
                  <th>Category</th>
                  <th>Official Link</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.organization}</td>
                    <td>{item.category}</td>
                    <td>
                      <a href={item.officialWebsite} target="_blank" rel="noopener noreferrer">
                        Open source page
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default CsrInformationPage;
