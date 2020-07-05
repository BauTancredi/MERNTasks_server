// Routes for authenticate users
const express = require("express");
const { check } = require("express-validator");

const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

// Authenticate user
// api/auth
router.post(
  "/",
  [
    check("email", "Add a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  authController.authenticateUser
);

// Obtains authenticated user
router.get("/", auth, authController.authenticatedUser);

module.exports = router;
