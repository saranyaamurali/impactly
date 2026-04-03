import { useEffect, useState } from "react";
import { fetchCompanies } from "../services/api";

function EcosystemCompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [focus, setFocus] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        const params = {};
        if (focus.trim()) {
          params.focus = focus.trim();
        }
        if (region.trim()) {
          params.region = region.trim();
        }

        const response = await fetchCompanies(params);
        setCompanies(response.items || []);
        setError("");
      } catch (requestError) {
        setError("Unable to load company information.");
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, [focus, region]);

  return (
    <section className="section-wrap">
      <div className="container">
        <p className="eyebrow">CSR Ecosystem Information</p>
        <h1>CSR companies by focus and regional footprint</h1>
        <p className="section-intro">
          Curated informational directory for ecosystem understanding. This is
          not a direct participation or contact marketplace.
        </p>

        <div className="filters-grid">
          <label>
            Focus Area
            <input
              value={focus}
              onChange={(event) => setFocus(event.target.value)}
              placeholder="Education, healthcare, environment"
            />
          </label>
          <label>
            Region
            <input
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              placeholder="State or region"
            />
          </label>
        </div>

        {loading && <p>Loading companies...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <div className="cards-grid">
            {companies.map((company) => (
              <article className="card" key={company.id}>
                <h3>{company.name}</h3>
                <p>{company.profile}</p>
                <h4>CSR Focus Areas</h4>
                <div className="active-filters">
                  {company.csrFocusAreas.map((item) => (
                    <span className="pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <h4>Regions</h4>
                <p>{company.regions.join(", ")}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default EcosystemCompaniesPage;
