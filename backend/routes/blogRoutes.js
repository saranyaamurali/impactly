const express = require("express");
const {
	getBlogs,
	getBlogById,
	getExternalCsrBlogs,
} = require("../controllers/blogController");

const router = express.Router();

router.get("/", getBlogs);
router.get("/external", getExternalCsrBlogs);
router.get("/:id", getBlogById);

module.exports = router;