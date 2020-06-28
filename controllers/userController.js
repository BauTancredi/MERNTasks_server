const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ msg: "The user already exists" });

    // Create new user
    user = new User(req.body);

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // Saves new user
    await user.save();

    res.json({ msg: "User created" });
  } catch (error) {
    console.log(error);
    res.status(400).send("There has been an error");
  }
};
