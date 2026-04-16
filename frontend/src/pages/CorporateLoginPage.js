import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginCorporate, setAuthToken } from "../services/api";

function CorporateLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      const response = await loginCorporate({ email, password });
      setAuthToken(response.token);
      navigate("/corporate/dashboard");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to login.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-wrap">
      <div className="container auth-wrap">
        <p className="eyebrow">Corporate Access</p>
        <h1>Corporate login</h1>
        <p className="section-intro">
          Access your CSR dashboard, submit projects, and update company profile.
        </p>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-grid auth-grid-single">
            <label>
              Email
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="cta-row">
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Signing in..." : "Login"}
            </button>
            <Link className="btn btn-secondary" to="/corporate/register">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CorporateLoginPage;
