const Performance = require('../models/Performance');

// Review add cheyyatam - Admin + HR only
exports.addReview = async (req, res) => {
  try {
    const { employeeId, rating, comments, period, goals } = req.body;

    const review = await Performance.create({
      employeeId,
      reviewedBy: req.user.id,
      rating,
      comments,
      period,
      goals
    });

    res.status(201).json({ message: 'Review added successfully ✅', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// All reviews - Admin + HR
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Performance.find()
      .populate('employeeId', 'name email')
      .populate('reviewedBy', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Own reviews - Employee
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Performance.find({ employeeId: req.user.id })
      .populate('reviewedBy', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};