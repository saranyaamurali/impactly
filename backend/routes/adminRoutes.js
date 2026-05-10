const express = require("express");
const {
  getPendingProjects,
  approveProject,
  rejectProject,
  getPendingPartnerships,
  approvePartnership,
  rejectPartnership,
  getPendingNgos,
  verifyNgo,
  rejectNgo,
} = require("../controllers/adminController");
const { requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/projects/pending", requireAdmin, getPendingProjects);
router.post("/projects/:id/approve", requireAdmin, approveProject);
router.post("/projects/:id/reject", requireAdmin, rejectProject);

router.get("/partnerships/pending", requireAdmin, getPendingPartnerships);
router.post("/partnerships/:id/approve", requireAdmin, approvePartnership);
router.post("/partnerships/:id/reject", requireAdmin, rejectPartnership);

router.get("/ngos/pending", requireAdmin, getPendingNgos);
router.post("/ngos/:id/verify", requireAdmin, verifyNgo);
router.post("/ngos/:id/reject", requireAdmin, rejectNgo);

module.exports = router;
