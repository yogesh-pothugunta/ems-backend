const Attendance = require('../models/Attendance');

// Check-in
exports.checkIn = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const existing = await Attendance.findOne({ 
      employeeId: req.user.id, 
      date: today 
    });
    
    if (existing) {
      return res.status(400).json({ message: 'Already checked in today!' });
    }

    const checkInTime = new Date().toLocaleTimeString();
    
    const attendance = await Attendance.create({
      employeeId: req.user.id,
      date: today,
      checkIn: checkInTime,
      status: 'present'
    });

    res.status(201).json({ message: 'Checked in successfully! ✅', attendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check-out
exports.checkOut = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const attendance = await Attendance.findOne({ 
      employeeId: req.user.id, 
      date: today 
    });
    
    if (!attendance) {
      return res.status(400).json({ message: 'Please check in first!' });
    }
    
    if (attendance.checkOut) {
      return res.status(400).json({ message: 'Already checked out today!' });
    }

    attendance.checkOut = new Date().toLocaleTimeString();
    await attendance.save();

    res.json({ message: 'Checked out successfully! ✅', attendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Own attendance get cheyyatam - Employee
exports.getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ 
      employeeId: req.user.id 
    }).sort({ date: -1 });
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// All attendance - Admin + HR
exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate('employeeId', 'name email')
      .sort({ date: -1 });
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Today attendance - Admin + HR
exports.getTodayAttendance = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const attendance = await Attendance.find({ date: today })
      .populate('employeeId', 'name email');
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};