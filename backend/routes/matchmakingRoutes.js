const express = require('express');
const matchmakingController = require('../controllers/matchmakingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get matches for NGO
router.get('/ngo/:ngoId/matches', matchmakingController.getNgoMatches);

// Get matches for Corporate
router.get('/corporate/:corporateId/matches', matchmakingController.getCorporateMatches);

// Get match details
router.get('/match/:ngoId/:projectId', matchmakingController.getMatchDetails);

// Get AI recommendations
router.get('/recommendations', matchmakingController.getRecommendedMatches);

module.exports = router;
