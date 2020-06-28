// Routes for creating users
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");

// Create user
// api/users
router.post(
  "/",
  [
    check("name", "The name is mandatory").not().isEmpty(),
    check("email", "Add a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  userController.createUser
);

module.exports = router;
