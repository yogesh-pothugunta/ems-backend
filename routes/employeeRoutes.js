const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/rbac');
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getMyProfile
} = require('../controllers/employeeController');

// Own profile - Employee access
router.get('/me', authMiddleware, getMyProfile);

// All employees - Admin + HR only
router.get('/', authMiddleware, checkRole('admin', 'hr'), getAllEmployees);

// Single employee - Admin + HR only
router.get('/:id', authMiddleware, checkRole('admin', 'hr'), getEmployeeById);

// Create employee - Admin only
router.post('/', authMiddleware, checkRole('admin'), createEmployee);

// Update employee - Admin + HR
router.put('/:id', authMiddleware, checkRole('admin', 'hr'), updateEmployee);

// Delete employee - Admin only
router.delete('/:id', authMiddleware, checkRole('admin'), deleteEmployee);

module.exports = router;