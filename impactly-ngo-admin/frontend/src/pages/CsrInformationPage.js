// Add this to fetch from backend instead of hardcoded data

import { useEffect, useState } from "react";
import "./CsrInformation.css";

const CATEGORIES = ["All", "CSR Basics", "Legal Compliance", /* ... */];

function CsrInformationPage() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch articles from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        if (selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }

        if (searchTerm.trim()) {
          params.append("search", searchTerm.trim());
        }

        const response = await fetch(
          `/api/csr/articles?${params.toString()}`
        );
        const data = await response.json();
        setArticles(data.items || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory, searchTerm]);

  // Track clicks when opening article
  const handleArticleClick = async (articleId) => {
    try {
      await fetch(`/api/csr/articles/${articleId}/click`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  return (
    <section className="csr-information-page">
      {/* Hero Section */}
      <div className="csr-hero">
        <div className="container">
          <p className="eyebrow">CSR Knowledge Center</p>
          <h1>Your A-to-Z Guide to Corporate Social Responsibility</h1>
          <p className="hero-description">
            Explore curated articles, best practices, and resources to understand and implement
            effective CSR programs that drive meaningful impact.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Filters Section */}
        <div className="filters-section">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search articles, topics, authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="category-filter">
            <p className="filter-label">Filter by Category</p>
            <div className="category-pills">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={`pill ${selectedCategory === category ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="results-header">
          <h2>{articles.length} Articles Found</h2>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="loading-state">
            <p>Loading articles...</p>
          </div>
        ) : articles.length > 0 ? (
          <div className="articles-grid">
            {articles.map((article) => (
              <article
                key={article._id}
                className="article-card"
                onClick={() => {
                  handleArticleClick(article._id);
                  window.open(article.link, "_blank");
                }}
              >
                <div className="article-image-wrapper">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="article-image"
                  />
                  <span className="category-badge">{article.category}</span>
                </div>

                <div className="article-content">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-description">{article.description}</p>

                  <div className="article-meta">
                    <span className="author">{article.author}</span>
                    <span className="separator">•</span>
                    <span className="read-time">{article.readTime} read</span>
                  </div>

                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read Full Article →
                  </a>
                </div>

                <div className="card-overlay">
                  <span className="overlay-text">Click to open</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No articles found.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CsrInformationPage;