const express = require("express");

const router = express.Router();

const corporateAuthController = require(
  "../controllers/corporateAuthController"
);

const {
  requireCorporate,
} = require("../middleware/authMiddleware");


// PUBLIC ROUTES

router.post(
  "/register",
  corporateAuthController.registerCorporate
);

router.post(
  "/login",
  corporateAuthController.loginCorporate
);


// PROTECTED ROUTES

router.get(
  "/me",
  requireCorporate,
  corporateAuthController.getCurrentCorporate
);


module.exports = router;