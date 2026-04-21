const Employee = require('../models/Employee');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// All employees get cheyyatam - Admin + HR only
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('userId', 'name email role');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Single employee get cheyyatam
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('userId', 'name email role');
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// New employee create cheyyatam - Admin only
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password, department, position, salary, phone, address } = req.body;

    // User create cheyyatam
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'employee'
    });

    // Employee profile create cheyyatam
    const employee = await Employee.create({
      userId: user._id,
      department,
      position,
      salary,
      phone,
      address
    });

    res.status(201).json({ message: 'Employee created successfully ✅', employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employee update cheyyatam - Admin + HR
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee updated successfully ✅', employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employee delete cheyyatam - Admin only
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully ✅' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Own profile get cheyyatam - Employee
exports.getMyProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.user.id }).populate('userId', 'name email role');
    if (!employee) return res.status(404).json({ message: 'Profile not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};