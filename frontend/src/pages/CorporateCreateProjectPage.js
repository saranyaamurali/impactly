import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { csrProjectAPI } from "../services/api";

const initialForm = {
  title: "",
  category: "",
  budget: "",
  location: "",
  timeline: "",
  status: "pending",
  implementingPartner: "",
  beneficiaries: "",
  districts: "",
  progressPercent: "",
  officialWebsite: "",
  sourceWebsite: "",
  description: "",
  impactIdea: "",
  sdgFocus: "",
  expectedOutcomes: "",
};

const parseList = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

function CorporateCreateProjectPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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

      const payload = {
        title: form.title,
        category: form.category,
        budget: Number(form.budget) || 0,
        location: form.location,
        timeline: form.timeline,
        status: form.status,
        implementingPartner: form.implementingPartner,
        beneficiaries: Number(form.beneficiaries) || 0,
        districts: form.districts ? parseList(form.districts) : [],
        progressPercent: Number(form.progressPercent) || 0,
        officialWebsite: form.officialWebsite,
        sourceWebsite: form.sourceWebsite,
        description: form.description,
        impactIdea: form.impactIdea,
        sdgFocus: form.sdgFocus ? parseList(form.sdgFocus) : [],
        expectedOutcomes: form.expectedOutcomes ? parseList(form.expectedOutcomes) : [],
      };

      await csrProjectAPI.createProject(payload);
      setMessage("CSR project created successfully.");
      setForm(initialForm);

      setTimeout(() => {
        navigate("/corporate/dashboard");
      }, 800);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to create CSR project.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="section-wrap">
      <div className="container auth-wrap">
        <p className="eyebrow">Corporate CSR</p>
        <h1>Create a CSR project</h1>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-grid">
            <label>
              Project Title
              <input name="title" value={form.title} onChange={handleChange} required />
            </label>
            <label>
              Category
              <input name="category" value={form.category} onChange={handleChange} required />
            </label>
            <label>
              Budget (INR)
              <input
                name="budget"
                type="number"
                min="0"
                value={form.budget}
                onChange={handleChange}
              />
            </label>
            <label>
              Location
              <input name="location" value={form.location} onChange={handleChange} required />
            </label>
            <label>
              Timeline
              <input name="timeline" value={form.timeline} onChange={handleChange} />
            </label>
            <label>
              Status
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </label>
            <label>
              Implementing Partner
              <input name="implementingPartner" value={form.implementingPartner} onChange={handleChange} />
            </label>
            <label>
              Beneficiaries
              <input
                name="beneficiaries"
                type="number"
                min="0"
                value={form.beneficiaries}
                onChange={handleChange}
              />
            </label>
            <label>
              Districts (comma separated)
              <input name="districts" value={form.districts} onChange={handleChange} />
            </label>
            <label>
              Progress (%)
              <input
                name="progressPercent"
                type="number"
                min="0"
                max="100"
                value={form.progressPercent}
                onChange={handleChange}
              />
            </label>
            <label>
              Official Website
              <input name="officialWebsite" value={form.officialWebsite} onChange={handleChange} />
            </label>
            <label>
              Source Website
              <input name="sourceWebsite" value={form.sourceWebsite} onChange={handleChange} />
            </label>
            <label className="auth-span-2">
              SDG Focus (comma separated)
              <input name="sdgFocus" value={form.sdgFocus} onChange={handleChange} />
            </label>
            <label className="auth-span-2">
              Expected Outcomes (comma separated)
              <input
                name="expectedOutcomes"
                value={form.expectedOutcomes}
                onChange={handleChange}
              />
            </label>
          </div>

          <label>
            Project Description
            <textarea name="description" rows={4} value={form.description} onChange={handleChange} />
          </label>

          <label>
            Impact Idea
            <textarea name="impactIdea" rows={4} value={form.impactIdea} onChange={handleChange} />
          </label>

          {error && <p className="error-text">{error}</p>}
          {message && <p>{message}</p>}

          <div className="cta-row">
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Create Project"}
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

export default CorporateCreateProjectPage;
