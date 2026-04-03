import { NavLink, Outlet } from "react-router-dom";

const navClass = ({ isActive }) =>
  isActive ? "nav-link nav-link-active" : "nav-link";

function MainLayout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-row">
          <NavLink to="/" className="brand-mark">
            Impactly
          </NavLink>
          <nav className="site-nav" aria-label="Main navigation">
            <NavLink to="/csr-projects" className={navClass}>
              Existing CSR Projects
            </NavLink>
            <NavLink to="/csr-projects/information" className={navClass}>
              100+ CSR Info
            </NavLink>
            <NavLink to="/blog" className={navClass}>
              CSR Blogs
            </NavLink>
            <NavLink to="/ecosystem/companies" className={navClass}>
              Companies
            </NavLink>
            <NavLink to="/ecosystem/ngos" className={navClass}>
              NGOs (Curated)
            </NavLink>
            <NavLink to="/ecosystem/ngos-information" className={navClass}>
              100+ NGO Info
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-row">
          <p>Impactly Public Platform</p>
          <p>Built for CSR trust, discovery, and ecosystem intelligence.</p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
