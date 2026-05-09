import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchNgos } from "../services/api";

function EcosystemNgosPage() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [focus, setFocus] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const loadNgos = async () => {
      try {
        setLoading(true);
        const params = {};
        if (focus.trim()) {
          params.focus = focus.trim();
        }
        if (region.trim()) {
          params.region = region.trim();
        }

        const response = await fetchNgos(params);
        setNgos(response.items || []);
        setError("");
      } catch (requestError) {
        setError("Unable to load NGO information.");
      } finally {
        setLoading(false);
      }
    };

    loadNgos();
  }, [focus, region]);

  return (
    <section className="section-wrap">
      <div className="container">
        <p className="eyebrow">CSR Ecosystem Information</p>
        <h1>NGO landscape by sector specialization</h1>
        <p className="section-intro">
          Curated information-view NGO profiles for quick ecosystem orientation.
          Official source links are provided where available.
        </p>

        <div className="ad-strip">
          <p className="eyebrow">Ad Space</p>
          <h3>NGO Campaign Promotion Slot</h3>
          <p>Reserved for paid awareness campaigns and partner highlights.</p>
          <Link className="btn btn-secondary" to="/ecosystem/ngos-information">
            Open 100+ NGO Information View
          </Link>
        </div>

        <div className="filters-grid">
          <label>
            Focus Area
            <input
              value={focus}
              onChange={(event) => setFocus(event.target.value)}
              placeholder="Learning, water, livelihoods"
            />
          </label>
          <label>
            Region
            <input
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              placeholder="State or zone"
            />
          </label>
        </div>

        {loading && <p>Loading NGOs...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <div className="cards-grid">
            {ngos.map((ngo) => (
              <article className="card" key={ngo.id}>
<<<<<<< HEAD
                <h3>
                  {ngo.name} 
                  {ngo.verificationStatus === 'verified' && <span title="Verified NGO" style={{ marginLeft: '8px' }}>🛡️</span>}
                </h3>
=======
                <h3>{ngo.name}</h3>
>>>>>>> 9b69005d4586ec2f41ef9a5cbce4270d37a0a929
                <p>{ngo.profile}</p>
                <h4>Focus Areas</h4>
                <div className="active-filters">
                  {ngo.focusAreas.map((item) => (
                    <span className="pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <h4>Experience</h4>
                <p>{ngo.experience}</p>
                <h4>Regions</h4>
                <p>{ngo.regions.join(", ")}</p>
                {ngo.officialWebsite && (
                  <a
                    className="text-link"
                    href={ngo.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open official NGO website
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default EcosystemNgosPage;
