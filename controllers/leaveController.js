const LeaveRequest = require('../models/LeaveRequest');

// Leave apply cheyyatam - Employee
exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    const leave = await LeaveRequest.create({
      employeeId: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason
    });

    res.status(201).json({ message: 'Leave applied successfully ✅', leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Own leaves get cheyyatam - Employee
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ employeeId: req.user.id });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// All leaves get cheyyatam - Admin + HR
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find()
      .populate('employeeId', 'name email')
      .populate('reviewedBy', 'name');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Leave approve/reject cheyyatam - Admin + HR
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const leave = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status, reviewedBy: req.user.id },
      { new: true }
    );

    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    res.json({ message: `Leave ${status} successfully ✅`, leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Leave delete cheyyatam - Employee own pending leave
exports.deleteLeave = async (req, res) => {
  try {
    const leave = await LeaveRequest.findOne({
      _id: req.params.id,
      employeeId: req.user.id,
      status: 'pending'
    });

    if (!leave) return res.status(404).json({ message: 'Leave not found or already processed' });

    await LeaveRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Leave cancelled successfully ✅' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};