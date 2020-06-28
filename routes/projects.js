const express = require("express");
const { check } = require("express-validator");

const projectController = require("../controllers/projectController");
const auth = require("../middleware/auth");

const router = express.Router();

// api/projects

// Create projects
router.post(
  "/",
  auth,
  [check("name", "The name is mandatory").not().isEmpty()],
  projectController.createProject
);

// Get all projects for a user
router.get("/", auth, projectController.getProjects);

// Update a project
router.put(
  "/:id",
  auth,
  [check("name", "The name is mandatory").not().isEmpty()],
  projectController.updateProject
);

module.exports = router;
