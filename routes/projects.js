const express = require("express");
const projectController = require("../controllers/projectController");

const router = express.Router();

// Create projects
// api/projectls
router.post("/", projectController.createProject);

module.exports = router;
