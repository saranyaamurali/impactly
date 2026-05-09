const express = require('express');
const ngoController = require('../controllers/ngoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes - NGO specific
router.get('/profile', authMiddleware, ngoController.getNgoProfile);
router.put('/profile', authMiddleware, ngoController.updateNgoProfile);
router.get('/:ngoId/stats', ngoController.getNgoStats);
router.get('/:ngoId/partnerships', ngoController.getNgoPartnerships);
// Public routes
router.get('/public/:ngoId', ngoController.getPublicNgoProfile);
router.get('/search', ngoController.searchNgos);

module.exports = router;
