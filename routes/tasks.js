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

// Get tasks
router.get("/", auth, taskController.obtainTasks);

// Update task
router.put("/:id", auth, taskController.updateTask);

// Deletae task
router.delete("/:id", auth, taskController.deleteController);
module.exports = router;
