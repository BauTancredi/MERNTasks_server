const express = require("express");
const { check } = require("express-validator");

const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");

const router = express.Router();

// api/tasks

// Create tasks
router.post(
  "/",
  auth,
  [
    check("Name", "The name is mandatory.").not().isEmpty(),
    check("Project", "The Project is mandatory.").not().isEmpty(),
  ],
  taskController.createTask
);

router.get("/", auth, taskController.obtainTasks);

module.exports = router;
