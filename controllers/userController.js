const User = require("../models/User");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ msg: "The user already exists" });

    // Create new user
    user = new User(req.body);

    // Saves new user
    await user.save();

    res.json({ msg: "User created" });
  } catch (error) {
    console.log(error);
    res.status(400).send("There has been an error");
  }
};
