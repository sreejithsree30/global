const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
  const { title, description, status, projectId } = req.body;
  try {
    const task = new Task({ title, description, status, project: projectId });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.getTasks = async (req, res) => {
  const { projectId } = req.query;
  try {
    const tasks = await Task.find({ project: projectId });
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.updateTask = async (req, res) => {
  const { taskId, title, description, status } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = title;
    task.description = description;
    task.status = status;

    if (status === 'Completed' && !task.completedAt) {
      task.completedAt = new Date();
    }

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    await Task.findByIdAndDelete(taskId);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
