const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  checkIn: { 
    type: String 
  },
  checkOut: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['present', 'absent', 'half-day'], 
    default: 'present' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);