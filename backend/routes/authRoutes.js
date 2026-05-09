const express = require("express");
const { registerCorporate, loginCorporate, loginAdmin } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerCorporate);
router.post("/login", loginCorporate);
router.post("/admin/login", loginAdmin);

module.exports = router;
