const express = require("express");
const {
  createCsrProject,
  getMyProjects,
  getPublicProjects,
  getPublicProjectById,
  getCsrInformationProjects,
<<<<<<< HEAD
  getImpactUpdates,
  addImpactUpdate,
=======
>>>>>>> 9b69005d4586ec2f41ef9a5cbce4270d37a0a929
} = require("../controllers/csrProjectController");
const { requireAuth, requireCorporate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", requireAuth, requireCorporate, createCsrProject);
router.get("/my-projects", requireAuth, requireCorporate, getMyProjects);
router.get("/public", getPublicProjects);
router.get("/information", getCsrInformationProjects);
router.get("/public/:id", getPublicProjectById);

<<<<<<< HEAD
// Impact Tracking Routes
router.get("/:id/impact", requireAuth, getImpactUpdates);
router.post("/:id/impact", requireAuth, addImpactUpdate);

=======
>>>>>>> 9b69005d4586ec2f41ef9a5cbce4270d37a0a929
module.exports = router;