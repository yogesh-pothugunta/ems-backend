const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/rbac');
const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
  getTodayAttendance
} = require('../controllers/attendanceController');

// Employee routes
router.post('/checkin', authMiddleware, checkIn);
router.post('/checkout', authMiddleware, checkOut);
router.get('/my', authMiddleware, getMyAttendance);

// Admin + HR routes
router.get('/', authMiddleware, checkRole('admin', 'hr'), getAllAttendance);
router.get('/today', authMiddleware, checkRole('admin', 'hr'), getTodayAttendance);

module.exports = router;