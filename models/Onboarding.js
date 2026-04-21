const mongoose = require('mongoose');

const onboardingSchema = new mongoose.Schema({
  employeeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  tasks: [
    {
      title: String,
      completed: { type: Boolean, default: false }
    }
  ],
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed'], 
    default: 'pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Onboarding', onboardingSchema);