const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    // Create new project
    const project = new Project(req.body);

    // Save creator with JWT
    project.creator = req.user.id;

    project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred");
  }
};

// Obtain all the projects of actual user

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ creator: req.user.id }).sort({
      created: -1,
    });
    res.json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).send("There has been an error");
  }
};

// Update project
exports.updateProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name } = req.body;
  const newProject = {};

  if (name) newProject.name = name;

  try {
    // Check ID
    let project = await Project.findById(req.params.id);

    // Verify if project exists
    if (!project) return res.status(404).json({ msg: "Project not found" });

    // Verify the creator
    if (project.creator.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorizated" });

    // Update
    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );
    res.json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

// Delete project by id
exports.deleteProject = async (req, res) => {
  try {
    // Check ID
    let project = await Project.findById(req.params.id);

    // Verify if project exists
    if (!project) return res.status(404).json({ msg: "Project not found" });

    // Verify the creator
    if (project.creator.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorizated" });

    // Delete project\
    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Project deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
