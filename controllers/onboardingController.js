const Onboarding = require('../models/Onboarding');

const defaultTasks = [
  { title: 'Complete documentation submission' },
  { title: 'Setup work email and accounts' },
  { title: 'Meet the team' },
  { title: 'Complete HR orientation' },
  { title: 'Setup workstation' },
  { title: 'Review company policies' },
];

// Create onboarding - Admin
exports.createOnboarding = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const existing = await Onboarding.findOne({ employeeId });
    if (existing) {
      return res.status(400).json({ message: 'Onboarding already exists!' });
    }

    const onboarding = await Onboarding.create({
      employeeId,
      tasks: defaultTasks,
      status: 'in-progress'
    });

    res.status(201).json({ message: 'Onboarding created ✅', onboarding });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task - Employee
exports.updateTask = async (req, res) => {
  try {
    const { taskId, completed } = req.body;

    const onboarding = await Onboarding.findOne({ 
      employeeId: req.user.id 
    });

    if (!onboarding) {
      return res.status(404).json({ message: 'Onboarding not found' });
    }

    const task = onboarding.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.completed = completed;

    const allDone = onboarding.tasks.every(t => t.completed);
    if (allDone) onboarding.status = 'completed';

    await onboarding.save();

    res.json({ message: 'Task updated ✅', onboarding });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Own onboarding - Employee
exports.getMyOnboarding = async (req, res) => {
  try {
    const onboarding = await Onboarding.findOne({ 
      employeeId: req.user.id 
    });
    if (!onboarding) {
      return res.status(404).json({ message: 'No onboarding found' });
    }
    res.json(onboarding);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// All onboarding - Admin + HR
exports.getAllOnboarding = async (req, res) => {
  try {
    const onboarding = await Onboarding.find()
      .populate('employeeId', 'name email');
    res.json(onboarding);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};