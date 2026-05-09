import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createCsrProject } from "../services/api";

function CorporateProjectSubmitPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "Education",
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
      await createCsrProject(form);
      navigate("/corporate/dashboard");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to submit CSR project.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-wrap">
      <div className="container auth-wrap">
        <p className="eyebrow">CSR Project Submission</p>
        <h1>Submit a CSR project</h1>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-grid">
            <label>
              Title
              <input name="title" value={form.title} onChange={handleChange} required />
            </label>
            <label>
              Category
              <input name="category" value={form.category} onChange={handleChange} required />
            </label>
            <label>
              Budget (INR)
              <input name="budget" type="number" min="0" value={form.budget} onChange={handleChange} />
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
                <option value="pending">pending</option>
                <option value="active">active</option>
                <option value="completed">completed</option>
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
              Progress Percent
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
          </div>

          <label>
            Description
            <textarea name="description" rows={4} value={form.description} onChange={handleChange} />
          </label>
          <label>
            Impact Idea
            <textarea name="impactIdea" rows={3} value={form.impactIdea} onChange={handleChange} />
          </label>
          <label>
            SDG Focus (comma separated)
            <input name="sdgFocus" value={form.sdgFocus} onChange={handleChange} />
          </label>
          <label>
            Expected Outcomes (comma separated)
            <input name="expectedOutcomes" value={form.expectedOutcomes} onChange={handleChange} />
          </label>

          {error && <p className="error-text">{error}</p>}

          <div className="cta-row">
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Project"}
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

export default CorporateProjectSubmitPage;
