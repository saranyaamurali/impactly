import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCorporateMe, updateCorporateMe } from "../services/api";
import "./CorporateProfile.css";

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
        const corporate = response.data?.corporate || response.corporate;

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
      <div className="corp-profile-page">
        <div className="corp-profile-container">
          <p className="corp-loading">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="corp-profile-page">
      <div className="corp-profile-container">
        {/* Page Header */}
        <div className="corp-profile-header">
          <div>
            <p className="corp-profile-eyebrow">Corporate Account</p>
            <h1 className="corp-profile-title">Company Profile</h1>
            <p className="corp-profile-subtitle">
              Keep your company information accurate and up to date. This profile is visible to NGOs reviewing your CSR projects.
            </p>
          </div>
          <Link className="corp-back-link" to="/corporate/dashboard">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Alerts */}
        {error && (
          <div className="corp-alert corp-alert-error">{error}</div>
        )}
        {message && (
          <div className="corp-alert corp-alert-success">{message}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="corp-form-card">
            <div className="corp-form-card-header">
              <h2>Company Information</h2>
              <p>Basic details about your organisation.</p>
            </div>
            <div className="corp-form-grid">
              <div className="corp-form-group">
                <label htmlFor="companyName">Company Name <span className="corp-required">*</span></label>
                <input
                  id="companyName"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Reliance Industries Ltd."
                />
              </div>
              <div className="corp-form-group">
                <label htmlFor="industry">Industry Sector</label>
                <input
                  id="industry"
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  placeholder="e.g. Manufacturing, Technology, BFSI"
                />
              </div>
              <div className="corp-form-group">
                <label htmlFor="website">Company Website</label>
                <input
                  id="website"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://www.yourcompany.com"
                />
              </div>
              <div className="corp-form-group">
                <label htmlFor="headquarters">Headquarters</label>
                <input
                  id="headquarters"
                  name="headquarters"
                  value={form.headquarters}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai, Maharashtra"
                />
              </div>
              <div className="corp-form-group corp-form-group--full">
                <label htmlFor="csrFocusAreas">CSR Focus Areas</label>
                <input
                  id="csrFocusAreas"
                  name="csrFocusAreas"
                  value={form.csrFocusAreas}
                  onChange={handleChange}
                  placeholder="e.g. Education, Clean Water, Rural Development (comma separated)"
                />
                <p className="corp-form-hint">Separate multiple focus areas with commas.</p>
              </div>
            </div>
          </div>

          <div className="corp-form-card">
            <div className="corp-form-card-header">
              <h2>Corporate Profile Statement</h2>
              <p>A brief description of your company's CSR philosophy and goals. This helps NGOs understand your priorities.</p>
            </div>
            <div className="corp-form-group">
              <label htmlFor="profile">Profile Statement</label>
              <textarea
                id="profile"
                name="profile"
                rows={6}
                value={form.profile}
                onChange={handleChange}
                placeholder="Describe your company's CSR vision, priorities, and the kind of NGO partnerships you are seeking..."
              />
            </div>
          </div>

          <div className="corp-form-actions">
            <button className="corp-btn-save" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <Link className="corp-btn-cancel" to="/corporate/dashboard">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CorporateProfileEditPage;
