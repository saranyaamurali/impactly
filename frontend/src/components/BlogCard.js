import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <article className="card blog-card">
      <img src={blog.heroImage} alt={blog.title} className="blog-image" />
      <div className="blog-content">
        <span className="pill">{blog.category}</span>
        <h3>{blog.title}</h3>
        <p>{blog.summary}</p>
        <div className="meta-grid">
          <span>{blog.author}</span>
          <span>{blog.publishedAt}</span>
        </div>
        <Link className="text-link" to={`/blog/${blog.id}`}>
          Read article
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;
