const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/rbac');
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  deleteLeave
} = require('../controllers/leaveController');

// Employee routes
router.post('/apply', authMiddleware, applyLeave);
router.get('/my', authMiddleware, getMyLeaves);
router.delete('/:id', authMiddleware, deleteLeave);

// Admin + HR routes
router.get('/', authMiddleware, checkRole('admin', 'hr'), getAllLeaves);
router.put('/:id', authMiddleware, checkRole('admin', 'hr'), updateLeaveStatus);

module.exports = router;