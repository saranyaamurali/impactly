const express = require('express');
const ngoAuthController = require('../controllers/ngoAuthController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register-ngo', ngoAuthController.registerNgo);
router.post('/login-ngo', ngoAuthController.loginNgo);
router.post('/verify-token', ngoAuthController.verifyToken);

// Protected routes
router.post('/change-password', authMiddleware, ngoAuthController.changePassword);
router.post('/reset-password', ngoAuthController.resetPassword);

module.exports = router;
