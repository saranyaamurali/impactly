const express = require("express");
const {
  getPendingProjects,
  approveProject,
  rejectProject,
  getPendingPartnerships,
  approvePartnership,
  rejectPartnership,
<<<<<<< HEAD
  getPendingNgos,
  verifyNgo,
  rejectNgo,
=======
>>>>>>> 9b69005d4586ec2f41ef9a5cbce4270d37a0a929
} = require("../controllers/adminController");
const { requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/projects/pending", requireAdmin, getPendingProjects);
router.post("/projects/:id/approve", requireAdmin, approveProject);
router.post("/projects/:id/reject", requireAdmin, rejectProject);

router.get("/partnerships/pending", requireAdmin, getPendingPartnerships);
router.post("/partnerships/:id/approve", requireAdmin, approvePartnership);
router.post("/partnerships/:id/reject", requireAdmin, rejectPartnership);

<<<<<<< HEAD
router.get("/ngos/pending", requireAdmin, getPendingNgos);
router.post("/ngos/:id/verify", requireAdmin, verifyNgo);
router.post("/ngos/:id/reject", requireAdmin, rejectNgo);

=======
>>>>>>> 9b69005d4586ec2f41ef9a5cbce4270d37a0a929
module.exports = router;
