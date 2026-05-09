const express = require("express");
const { registerCorporate, loginCorporate } = require("../controllers/authController");
const { loginAdmin } = require("../controllers/adminAuthController");

const router = express.Router();

router.post("/register", registerCorporate);
router.post("/login", loginCorporate);
router.post("/admin/login", loginAdmin);

module.exports = router;
