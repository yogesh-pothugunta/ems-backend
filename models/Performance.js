const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  employeeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  reviewedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  },
  comments: { 
    type: String, 
    required: true 
  },
  period: { 
    type: String, 
    required: true 
  },
  goals: { 
    type: String 
  }
}, { timestamps: true });

module.exports = mongoose.model('Performance', performanceSchema);