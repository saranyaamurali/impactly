import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { fetchBlogs, fetchExternalCsrBlogs } from "../services/api";

function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [externalBlogs, setExternalBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const [internalResponse, externalResponse] = await Promise.all([
          fetchBlogs(),
          fetchExternalCsrBlogs(),
        ]);
        setBlogs(internalResponse.items || []);
        setExternalBlogs(externalResponse.items || []);
      } catch (requestError) {
        setError("Unable to load blog content.");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <section className="section-wrap">
      <div className="container">
        <p className="eyebrow">CSR Knowledge Hub</p>
        <h1>Read practical insights from the CSR ecosystem</h1>
        <p className="section-intro">
          Internal explainers and external reference links are listed as an
          information view for stakeholders researching CSR and sustainability.
        </p>

        <div className="ad-strip">
          <p className="eyebrow">Ad Space</p>
          <h3>Thought Leadership Sponsored Slot</h3>
          <p>Reserved for paid editorial campaigns, reports, and ESG knowledge launches.</p>
        </div>

        {loading && <p>Loading articles...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <>
            <div className="results-row">
              <h2>Impactly Editorial</h2>
              <p>{blogs.length} internal explainers</p>
            </div>
            <div className="cards-grid">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            <div className="results-row">
              <h2>External CSR References</h2>
              <p>{externalBlogs.length} verified source links</p>
            </div>
            <div className="cards-grid">
              {externalBlogs.map((blog) => (
                <article className="card" key={blog.id}>
                  <span className="pill">External Source</span>
                  <h3>{blog.title}</h3>
                  <p>{blog.summary}</p>
                  <div className="meta-grid">
                    <span>{blog.sourceName}</span>
                    <span>{blog.publishedAt}</span>
                  </div>
                  <a
                    className="text-link"
                    href={blog.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open source link
                  </a>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default BlogListPage;
