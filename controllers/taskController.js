const { validationResult } = require("express-validator");

const Task = require("../models/Task");
const Project = require("../models/Project");

// Create new task
exports.createTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  // Extract the project and check if exists
  const { project } = req.body;

  try {
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
