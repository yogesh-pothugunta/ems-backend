const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/rbac');
const Employee = require('../models/Employee');

// Own salary view - Employee
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.user.id })
      .populate('userId', 'name email');
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    res.json({
      name: employee.userId.name,
      email: employee.userId.email,
      department: employee.department,
      position: employee.position,
      salary: employee.salary,
      joiningDate: employee.joiningDate,
      salarySlip: {
        basic: employee.salary * 0.6,
        hra: employee.salary * 0.2,
        allowances: employee.salary * 0.2,
        total: employee.salary
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// All salaries - Admin + HR only
router.get('/', authMiddleware, checkRole('admin', 'hr'), async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('userId', 'name email');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;