const LeaveRequest = require('../models/LeaveRequest');
const sendEmail = require('../config/emailConfig');

exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    // ✅ SAFETY CHECK
    if (!req.user || !req.user.email) {
      return res.status(400).json({ message: 'User email not found. Check auth middleware.' });
    }

    const leave = await LeaveRequest.create({
      employeeId: req.user._id,
      email: req.user.email,
      leaveType,
      startDate,
      endDate,
      reason
    });

    await sendEmail(
      req.user.email,
      'Leave Request Submitted',
      `<h3>Your leave request is submitted ✅</h3>`
    );

    res.status(201).json(leave);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};