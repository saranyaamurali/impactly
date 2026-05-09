import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBlogById } from "../services/api";

function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        const response = await fetchBlogById(id);
        setBlog(response.data);
      } catch (requestError) {
        setError("Blog article unavailable.");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  if (loading) {
    return (
      <section className="section-wrap">
        <div className="container">
          <p>Loading article...</p>
        </div>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="section-wrap">
        <div className="container">
          <p className="error-text">{error || "Article not found."}</p>
          <Link className="text-link" to="/blog">
            Back to blog listing
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-wrap">
      <div className="container article-layout">
        <article className="article-card">
          <p className="eyebrow">{blog.category}</p>
          <h1>{blog.title}</h1>
          <div className="meta-grid article-meta">
            <span>{blog.author}</span>
            <span>{blog.publishedAt}</span>
          </div>
          <img src={blog.heroImage} alt={blog.title} className="article-image" />
          <p>{blog.content}</p>
        </article>

        <aside className="sponsored-banner">
          <p className="eyebrow">Sponsored</p>
          <h3>Partner Highlight Slot</h3>
          <p>
            Feature purpose-driven initiatives, annual sustainability reports,
            or campaign announcements in this public knowledge section.
          </p>
          <Link className="btn btn-primary" to="/public-projects">
            Explore CSR Projects
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default BlogDetailPage;
