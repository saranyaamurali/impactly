const express = require("express");
const { registerCorporate, loginCorporate } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerCorporate);
router.post("/login", loginCorporate);

module.exports = router;
