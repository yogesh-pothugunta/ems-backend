const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/rbac');
const { 
  addReview, 
  getAllReviews, 
  getMyReviews 
} = require('../controllers/performanceController');

// Employee — own reviews
router.get('/my', authMiddleware, getMyReviews);

// Admin + HR only
router.post('/', authMiddleware, checkRole('admin', 'hr'), addReview);
router.get('/', authMiddleware, checkRole('admin', 'hr'), getAllReviews);

module.exports = router;