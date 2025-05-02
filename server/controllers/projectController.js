const Project = require('../models/projectModel');

exports.createProject = async (req, res) => {
  const { name } = req.body;
  try {
    const projects = await Project.find({ user: req.user.id });
    if (projects.length >= 4) {
      return res.status(400).json({ message: 'Cannot create more than 4 projects' });
    }

    const project = new Project({ name, user: req.user.id });
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
