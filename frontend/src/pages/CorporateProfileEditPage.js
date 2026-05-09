import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCorporateMe, updateCorporateMe } from "../services/api";

function CorporateProfileEditPage() {
  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    website: "",
    headquarters: "",
    csrFocusAreas: "",
    profile: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const response = await fetchCorporateMe();
        const corporate = response.corporate;

        setForm({
          companyName: corporate.companyName || "",
          industry: corporate.industry || "",
          website: corporate.website || "",
          headquarters: corporate.headquarters || "",
          csrFocusAreas: (corporate.csrFocusAreas || []).join(", "),
          profile: corporate.profile || "",
        });
      } catch (requestError) {
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      setError("");
      setMessage("");
      await updateCorporateMe(form);
      setMessage("Profile updated successfully.");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="section-wrap">
        <div className="container">
          <p>Loading profile...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-wrap">
      <div className="container auth-wrap">
        <p className="eyebrow">Corporate Profile</p>
        <h1>Edit corporate profile</h1>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-grid">
            <label>
              Company Name
              <input name="companyName" value={form.companyName} onChange={handleChange} required />
            </label>
            <label>
              Industry
              <input name="industry" value={form.industry} onChange={handleChange} />
            </label>
            <label>
              Website
              <input name="website" value={form.website} onChange={handleChange} />
            </label>
            <label>
              Headquarters
              <input name="headquarters" value={form.headquarters} onChange={handleChange} />
            </label>
            <label className="auth-span-2">
              CSR Focus Areas (comma separated)
              <input name="csrFocusAreas" value={form.csrFocusAreas} onChange={handleChange} />
            </label>
          </div>

          <label>
            Corporate Profile
            <textarea name="profile" rows={5} value={form.profile} onChange={handleChange} />
          </label>

          {error && <p className="error-text">{error}</p>}
          {message && <p>{message}</p>}

          <div className="cta-row">
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Profile"}
            </button>
            <Link className="btn btn-secondary" to="/corporate/dashboard">
              Back to Dashboard
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CorporateProfileEditPage;
