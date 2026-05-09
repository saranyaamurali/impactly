import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="section-wrap">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="section-intro">
          The page you requested is not available on this public platform.
        </p>
        <Link className="btn btn-primary" to="/">
          Go back home
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
