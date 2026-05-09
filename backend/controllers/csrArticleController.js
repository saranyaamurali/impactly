const CsrArticle = require("../models/CsrArticle");
const { csrArticles } = require("../services/dataStore");

const buildQuery = ({ category, search, featured }) => {
  const query = {};

  if (category) {
    query.category = { $regex: String(category).trim(), $options: "i" };
  }

  if (featured !== undefined) {
    const featuredValue = String(featured).toLowerCase() === "true";
    query.featured = featuredValue;
  }

  if (search) {
    const keyword = String(search).trim();
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { author: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
    ];
  }

  return query;
};

const filterLocalArticles = ({ category, search, featured, page, limit }) => {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.max(Number(limit) || 24, 1);
  const keyword = search ? String(search).trim().toLowerCase() : "";
  const categoryFilter = category ? String(category).trim().toLowerCase() : "";
  const featuredFilter = featured !== undefined
    ? String(featured).toLowerCase() === "true"
    : undefined;

  const filtered = csrArticles.filter((article) => {
    if (categoryFilter && !String(article.category).toLowerCase().includes(categoryFilter)) {
      return false;
    }

    if (featuredFilter !== undefined && article.featured !== featuredFilter) {
      return false;
    }

    if (!keyword) {
      return true;
    }

    const haystack = `${article.title} ${article.description} ${article.author} ${article.category}`.toLowerCase();
    return haystack.includes(keyword);
  });

  const total = filtered.length;
  const start = (safePage - 1) * safeLimit;
  const items = filtered.slice(start, start + safeLimit);

  return {
    items,
    total,
    pagination: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};

const getArticles = async (req, res) => {
  try {
    const { category, search, featured, page = 1, limit = 24 } = req.query;
    const safePage = Math.max(Number(page) || 1, 1);
    const safeLimit = Math.max(Number(limit) || 24, 1);

    const query = buildQuery({ category, search, featured });

    const [items, total] = await Promise.all([
      CsrArticle.find(query)
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * safeLimit)
        .limit(safeLimit),
      CsrArticle.countDocuments(query),
    ]);

    if (total === 0 && csrArticles.length > 0) {
      return res.status(200).json(
        filterLocalArticles({ category, search, featured, page: safePage, limit: safeLimit })
      );
    }

    return res.status(200).json({
      items,
      total,
      pagination: {
        total,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    });
  } catch (error) {
    if (csrArticles.length > 0) {
      return res.status(200).json(filterLocalArticles(req.query));
    }

    return res.status(500).json({ message: "Unable to load CSR articles" });
  }
};

const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await CsrArticle.findById(id);

    if (!article) {
      const fallback = csrArticles.find((item) => item._id === id);
      if (!fallback) {
        return res.status(404).json({ message: "CSR article not found" });
      }
      return res.status(200).json(fallback);
    }

    return res.status(200).json(article);
  } catch (error) {
    const fallback = csrArticles.find((item) => item._id === req.params.id);
    if (fallback) {
      return res.status(200).json(fallback);
    }

    return res.status(500).json({ message: "Unable to load CSR article" });
  }
};

const createArticle = async (req, res) => {
  try {
    const article = await CsrArticle.create(req.body);
    return res.status(201).json(article);
  } catch (error) {
    return res.status(500).json({ message: "Unable to create CSR article" });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await CsrArticle.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      const fallback = csrArticles.find((item) => item._id === id);
      if (!fallback) {
        return res.status(404).json({ message: "CSR article not found" });
      }
      fallback.clicks = Number(fallback.clicks || 0) + 1;
      return res.status(200).json({ clicks: fallback.clicks });
    }

    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ message: "Unable to update CSR article" });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await CsrArticle.findByIdAndDelete(id);

    if (!article) {
      return res.status(404).json({ message: "CSR article not found" });
    }

    return res.status(200).json({ message: "CSR article deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Unable to delete CSR article" });
  }
};

const trackArticleClick = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await CsrArticle.findByIdAndUpdate(
      id,
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: "CSR article not found" });
    }

    return res.status(200).json({ clicks: article.clicks });
  } catch (error) {
    const fallback = csrArticles.find((item) => item._id === req.params.id);
    if (fallback) {
      fallback.clicks = Number(fallback.clicks || 0) + 1;
      return res.status(200).json({ clicks: fallback.clicks });
    }

    return res.status(500).json({ message: "Unable to track CSR article click" });
  }
};

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  trackArticleClick,
};
