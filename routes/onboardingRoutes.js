const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/rbac');
const {
  createOnboarding,
  updateTask,
  getMyOnboarding,
  getAllOnboarding
} = require('../controllers/onboardingController');

// Employee routes
router.get('/my', authMiddleware, getMyOnboarding);
router.put('/task', authMiddleware, updateTask);

// Admin + HR routes
router.post('/', authMiddleware, checkRole('admin', 'hr'), createOnboarding);
router.get('/', authMiddleware, checkRole('admin', 'hr'), getAllOnboarding);

module.exports = router;