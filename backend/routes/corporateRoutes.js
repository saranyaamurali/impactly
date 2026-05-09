const express = require("express");
const { getCorporateMe, updateCorporateMe } = require("../controllers/corporateController");
const { requireAuth, requireCorporate } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", requireAuth, requireCorporate, getCorporateMe);
router.put("/me", requireAuth, requireCorporate, updateCorporateMe);

module.exports = router;
