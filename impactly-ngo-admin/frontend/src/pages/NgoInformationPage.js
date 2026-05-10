import { useEffect, useMemo, useState } from "react";
import { fetchNgoInformation } from "../services/api";

const focusOptions = ["All", "Education", "Healthcare", "Livelihood", "Environment"];

function NgoInformationPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [focus, setFocus] = useState("All");
  const [region, setRegion] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadNgoInformation = async () => {
      try {
        setLoading(true);
        const params = { limit: 120 };

        if (focus !== "All") {
          params.focus = focus;
        }

        if (region.trim()) {
          params.region = region.trim();
        }

        if (search.trim()) {
          params.search = search.trim();
        }

        const response = await fetchNgoInformation(params);
        setEntries(response.items || []);
        setError("");
      } catch (requestError) {
        setError("Unable to load NGO information entries.");
      } finally {
        setLoading(false);
      }
    };

    loadNgoInformation();
  }, [focus, region, search]);

  const focusSummary = useMemo(() => {
    const grouped = entries.reduce((acc, item) => {
      acc[item.focusArea] = (acc[item.focusArea] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([name, count]) => `${name}: ${count}`)
      .join(" | ");
  }, [entries]);

  return (
    <section className="section-wrap">
      <div className="container">
        <p className="eyebrow">NGO Information View</p>
        <h1>100+ NGO ecosystem information entries with official links</h1>
        <p className="section-intro">
          This directory is an information view for CSR ecosystem mapping and discovery.
          Each listing links to official NGO websites for verification.
        </p>

        <div className="ad-strip">
          <p className="eyebrow">Ad Space</p>
          <h3>NGO Discovery Sponsored Slot</h3>
          <p>Reserved for paid ecosystem sponsorship and partner listings.</p>
        </div>

        <div className="filters-grid">
          <label>
            Focus
            <select value={focus} onChange={(event) => setFocus(event.target.value)}>
              {focusOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            Region
            <input
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              placeholder="India, Pan-India, Global"
            />
          </label>
          <label>
            Search
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="NGO name or profile"
            />
          </label>
        </div>

        {!loading && !error && (
          <div className="summary-tile info-summary">
            <p className="summary-kicker">NGO Information Coverage</p>
            <h3>{entries.length} entries</h3>
            <p>{focusSummary}</p>
          </div>
        )}

        {loading && <p>Loading NGO information...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <div className="table-wrap">
            <table className="info-table">
              <thead>
                <tr>
                  <th>NGO</th>
                  <th>Focus Area</th>
                  <th>Region</th>
                  <th>Official Link</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.focusArea}</td>
                    <td>{item.region}</td>
                    <td>
                      <a href={item.officialWebsite} target="_blank" rel="noopener noreferrer">
                        Open NGO website
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

export default NgoInformationPage;
