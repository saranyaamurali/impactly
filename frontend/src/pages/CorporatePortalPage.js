import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  fetchCorporateMe,
  fetchMyCsrProjects,
  getAuthToken,
  loginCorporate,
  registerCorporate,
  setAuthToken,
} from "../services/api";

function CorporatePortalPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isRegisterPage = location.pathname === "/corporate/register";
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    companyName: "",
    industry: "",
    website: "",
    headquarters: "",
    profile: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [registerSubmitting, setRegisterSubmitting] = useState(false);
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      const token = getAuthToken();

      if (!token) {
        setProfile(null);
        setProjects([]);
        setDashboardLoading(false);
        setDashboardError("Sign in to load the corporate dashboard.");
        return;
      }

      try {
        setDashboardLoading(true);
        const [meResponse, projectsResponse] = await Promise.all([
          fetchCorporateMe(),
          fetchMyCsrProjects(),
        ]);

        setProfile(meResponse.corporate);
        setProjects(projectsResponse.items || []);
        setDashboardError("");
      } catch (requestError) {
        setProfile(null);
        setProjects([]);
        setDashboardError("Unable to load dashboard. Please login again.");
      } finally {
        setDashboardLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      setRegisterSubmitting(true);
      setRegisterError("");
      const response = await registerCorporate(registerForm);
      setAuthToken(response.token);
      navigate("/corporate/dashboard");
    } catch (requestError) {
      setRegisterError(requestError?.response?.data?.message || "Unable to register.");
    } finally {
      setRegisterSubmitting(false);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoginSubmitting(true);
      setLoginError("");
      const response = await loginCorporate(loginForm);
      setAuthToken(response.token);
      navigate("/corporate/dashboard");
    } catch (requestError) {
      setLoginError(requestError?.response?.data?.message || "Unable to login.");
    } finally {
      setLoginSubmitting(false);
    }
  };

  const logout = () => {
    setAuthToken("");
    setProfile(null);
    setProjects([]);
    setDashboardError("Sign in to load the corporate dashboard.");
    navigate("/corporate/login");
  };

  if (!dashboardLoading && profile) {
    return (
      <section className="section-wrap">
        <div className="container">
          <p className="eyebrow">Corporate Dashboard</p>
          <h1>Manage your CSR projects</h1>

          <div className="csr-summary-grid">
            <article className="summary-tile">
              <p className="summary-kicker">Company</p>
              <h3>{profile.companyName}</h3>
              <p>{profile.industry || "Industry not set"}</p>
            </article>
            <article className="summary-tile">
              <p className="summary-kicker">CSR Projects</p>
              <h3>{projects.length}</h3>
              <p>Projects created from your corporate account.</p>
            </article>
            <article className="summary-tile">
              <p className="summary-kicker">Actions</p>
              <div className="cta-row">
                <Link className="btn btn-secondary" to="/corporate/profile">
                  Edit Profile
                </Link>
                <Link className="btn btn-primary" to="/corporate/projects/new">
                  Submit CSR Project
                </Link>
              </div>
            </article>
          </div>

          <div className="results-row">
            <h2>My Projects</h2>
            <button className="btn btn-secondary" onClick={logout} type="button">
              Logout
            </button>
          </div>

          <div className="cards-grid">
            {projects.map((project) => (
              <article className="card" key={project.id}>
                <h3>{project.title}</h3>
                <p>{project.description || "No description provided yet."}</p>
                <div className="meta-grid">
                  <span>Category: {project.category}</span>
                  <span>Location: {project.location}</span>
                  <span>Status: {project.status}</span>
                  <span>Budget: INR {Number(project.budget || 0).toLocaleString("en-IN")}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-wrap">
      <div className="container auth-wrap">
        {isRegisterPage ? (
          <>
            <p className="eyebrow">Corporate Onboarding</p>
            <h1>Create corporate account</h1>
            <p className="section-intro">
              Register your company profile to submit and manage CSR initiatives.
            </p>

            <form className="auth-card" onSubmit={handleRegisterSubmit}>
              <div className="auth-grid">
                <label>
                  Company Name
                  <input
                    name="companyName"
                    value={registerForm.companyName}
                    onChange={handleRegisterChange}
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </label>
                <label>
                  Password
                  <input
                    name="password"
                    type="password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    minLength={8}
                    required
                  />
                </label>
                <label>
                  Industry
                  <input name="industry" value={registerForm.industry} onChange={handleRegisterChange} />
                </label>
                <label>
                  Website
                  <input name="website" value={registerForm.website} onChange={handleRegisterChange} />
                </label>
                <label>
                  Headquarters
                  <input
                    name="headquarters"
                    value={registerForm.headquarters}
                    onChange={handleRegisterChange}
                  />
                </label>
              </div>

              <label>
                Company Profile
                <textarea
                  name="profile"
                  value={registerForm.profile}
                  onChange={handleRegisterChange}
                  rows={4}
                />
              </label>

              {registerError && <p className="error-text">{registerError}</p>}

              <div className="cta-row">
                <button className="btn btn-primary" type="submit" disabled={registerSubmitting}>
                  {registerSubmitting ? "Creating account..." : "Register Corporate"}
                </button>
                <Link className="btn btn-secondary" to="/corporate/login">
                  Already registered? Login
                </Link>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className="eyebrow">Corporate Access</p>
            <h1>Corporate login</h1>
            <p className="section-intro">
              Sign in to access your CSR dashboard, submit projects, and manage your company profile.
            </p>

            <form className="auth-card" onSubmit={handleLoginSubmit}>
              <div className="auth-grid auth-grid-single">
                <label>
                  Email
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                    name="email"
                    required
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                    name="password"
                    required
                  />
                </label>
              </div>

              {loginError && <p className="error-text">{loginError}</p>}

              <div className="cta-row">
                <button className="btn btn-primary" type="submit" disabled={loginSubmitting}>
                  {loginSubmitting ? "Signing in..." : "Login"}
                </button>
                <Link className="btn btn-secondary" to="/corporate/register">
                  Create account
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default CorporatePortalPage;