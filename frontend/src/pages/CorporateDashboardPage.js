import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCorporateMe, setAuthToken } from "../services/api";

function CorporateDashboardPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const meResponse = await fetchCorporateMe();

        setProfile(meResponse.data.corporate);
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
                <p className="summary-kicker">Actions</p>
                <div className="cta-row">
                  <Link className="btn btn-secondary" to="/corporate/profile">
                    Edit Profile
                  </Link>
                </div>
              </article>
            </div>

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
