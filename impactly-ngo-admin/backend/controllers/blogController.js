const { blogs, externalCsrBlogs } = require("../services/dataStore");

const getBlogs = (req, res) => {
  return res.status(200).json({
    items: blogs,
    total: blogs.length,
  });
};

const getBlogById = (req, res) => {
  const { id } = req.params;
  const blog = blogs.find((item) => item.id === id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  return res.status(200).json(blog);
};

const getExternalCsrBlogs = (req, res) => {
  return res.status(200).json({
    items: externalCsrBlogs,
    total: externalCsrBlogs.length,
  });
};

module.exports = {
  getBlogs,
  getBlogById,
  getExternalCsrBlogs,
};