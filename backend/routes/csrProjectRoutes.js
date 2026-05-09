const express = require("express");
const {
  createCsrProject,
  getMyProjects,
  getPublicProjects,
  getPublicProjectById,
  getCsrInformationProjects,
  getImpactUpdates,
  addImpactUpdate,
} = require("../controllers/csrProjectController");
const { requireAuth, requireCorporate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", requireAuth, requireCorporate, createCsrProject);
router.get("/my-projects", requireAuth, requireCorporate, getMyProjects);
router.get("/public", getPublicProjects);
router.get("/information", getCsrInformationProjects);
router.get("/public/:id", getPublicProjectById);

// Impact Tracking Routes
router.get("/:id/impact", requireAuth, getImpactUpdates);
router.post("/:id/impact", requireAuth, addImpactUpdate);

module.exports = router;