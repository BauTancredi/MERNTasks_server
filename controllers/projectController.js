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
