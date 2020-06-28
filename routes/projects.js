const express = require("express");
const { check } = require("express-validator");

const projectController = require("../controllers/projectController");
const auth = require("../middleware/auth");

const router = express.Router();

// Create projects
// api/projectls
router.post(
  "/",
  auth,
  [check("name", "The name is mandatory").not().isEmpty()],
  projectController.createProject
);
router.get("/", auth, projectController.createProject);

module.exports = router;
