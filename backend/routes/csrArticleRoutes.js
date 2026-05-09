const express = require("express");
const {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  trackArticleClick,
} = require("../controllers/csrArticleController");

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/", createArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);
router.post("/:id/click", trackArticleClick);

module.exports = router;
