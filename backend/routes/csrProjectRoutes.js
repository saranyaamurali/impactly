const express = require("express");
const {
  getPublicProjects,
  getPublicProjectById,
  getCsrInformationProjects,
} = require("../controllers/csrProjectController");

const router = express.Router();

router.get("/public", getPublicProjects);
router.get("/information", getCsrInformationProjects);
router.get("/public/:id", getPublicProjectById);

module.exports = router;