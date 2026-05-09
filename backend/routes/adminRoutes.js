const express = require("express");
const {
  getPendingProjects,
  approveProject,
  rejectProject,
  getPendingPartnerships,
  approvePartnership,
  rejectPartnership,
} = require("../controllers/adminController");
const { requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/projects/pending", requireAdmin, getPendingProjects);
router.post("/projects/:id/approve", requireAdmin, approveProject);
router.post("/projects/:id/reject", requireAdmin, rejectProject);

router.get("/partnerships/pending", requireAdmin, getPendingPartnerships);
router.post("/partnerships/:id/approve", requireAdmin, approvePartnership);
router.post("/partnerships/:id/reject", requireAdmin, rejectPartnership);

module.exports = router;
