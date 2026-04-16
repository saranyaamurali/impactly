import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerCorporate, setAuthToken } from "../services/api";

function CorporateRegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    companyName: "",
    industry: "",
    website: "",
    headquarters: "",
    profile: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      setError("");
      const response = await registerCorporate(form);
      setAuthToken(response.token);
      navigate("/corporate/dashboard");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to register.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-wrap">
      <div className="container auth-wrap">
        <p className="eyebrow">Corporate Onboarding</p>
        <h1>Create corporate account</h1>
        <p className="section-intro">
          Register your company profile to submit and manage CSR initiatives.
        </p>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-grid">
            <label>
              Company Name
              <input name="companyName" value={form.companyName} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
              />
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
          </div>
          <label>
            Company Profile
            <textarea name="profile" value={form.profile} onChange={handleChange} rows={4} />
          </label>

          {error && <p className="error-text">{error}</p>}

          <div className="cta-row">
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Creating account..." : "Register Corporate"}
            </button>
            <Link className="btn btn-secondary" to="/corporate/login">
              Already registered? Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CorporateRegisterPage;
