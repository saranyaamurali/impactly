const mongoose = require("mongoose");

const csrArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    link: {
      type: String,
      default: "",
      trim: true,
    },
    author: {
      type: String,
      default: "",
      trim: true,
    },
    readTime: {
      type: String,
      default: "",
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    clicks: {
      type: Number,
      default: 0,
      min: 0,
    },
    source: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

csrArticleSchema.index({ title: "text", description: "text", author: "text" });
csrArticleSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model("CsrArticle", csrArticleSchema, "csarticles");
