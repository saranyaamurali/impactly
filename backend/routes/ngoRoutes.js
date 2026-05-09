const express = require('express');
const ngoController = require('../controllers/ngoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes - NGO specific
router.get('/profile', authMiddleware, ngoController.getNgoProfile);
router.put('/profile', authMiddleware, ngoController.updateNgoProfile);
router.get('/:ngoId/stats', ngoController.getNgoStats);
router.get('/:ngoId/partnerships', ngoController.getNgoPartnerships);
router.post('/partnerships/propose', authMiddleware, ngoController.sendPartnershipProposal);

// Public routes
router.get('/public/:ngoId', ngoController.getPublicNgoProfile);
router.get('/search', ngoController.searchNgos);

// Impact updates
router.post('/:projectId/impact', authMiddleware, ngoController.addImpactUpdate);
router.get('/:projectId/impact', ngoController.getProjectImpactUpdates);

module.exports = router;
