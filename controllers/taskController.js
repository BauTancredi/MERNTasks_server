const { validationResult } = require("express-validator");

const Task = require("../models/Task");
const Project = require("../models/Project");

// Create new task
exports.createTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    // Extract the project and check if exists
    const { project } = req.body;

    const projectExists = await Project.findById(project);

    if (!projectExists)
      return res.status(404).json({ msg: "Project didn't found" });

    // Check if project belongs to user authenticated
    if (projectExists.creator.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorizated" });

    // Create task
    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("There has been an error");
  }
};

// Obtain project tasks
exports.obtainTasks = async (req, res) => {
  try {
    // Extract the project and check if exists
    const { project } = req.query;

    const projectExists = await Project.findById(project);

    if (!projectExists)
      return res.status(404).json({ msg: "Project didn't found" });

    // Check if project belongs to user authenticated
    if (projectExists.creator.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorizated" });

    const tasks = await Task.find({ project });
    res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send("There has been an error");
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    // Extract the project and check if exists
    const { project, name, status } = req.body;

    const projectExists = await Project.findById(project);
    let task = await Task.findById(req.params.id);

    //Tasks exists or not
    if (!task) return res.status(404).json({ msg: "Task dont exists" });

    // Check if project belongs to user authenticated
    if (projectExists.creator.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorizated" });

    // Create new object
    const newTask = {};

    if (name) newTask.name = name;
    if (status) newTask.status = status;

    // Save task
    task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });

    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("There has been an error");
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    // Extract the project and check if exists
    const { project } = req.query;

    const projectExists = await Project.findById(project);
    let task = await Task.findById(req.params.id);

    //Tasks exists or not
    if (!task) return res.status(404).json({ msg: "Task dont exists" });

    // Check if project belongs to user authenticated
    if (projectExists.creator.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorizated" });

    // Delete task
    await Task.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Task deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("There has been an error");
  }
};
