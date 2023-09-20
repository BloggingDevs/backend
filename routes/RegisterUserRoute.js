const bcrypt = require("bcrypt");
const User = require("../models/User");

const RegisterUserRoute = async (req, res) => {
  try {
    const { email, username, password, lastName, firstName } = req.body;
    //check if username exists
    const checkExistingUserName = await User.findOne({ username });
    if (checkExistingUserName) {
      return res
        .status(401)
        .json({ message: "Username already exists, Pick another one" });
    }
    const checkExistingEmail = await User.findOne({ email });
    if (checkExistingEmail) {
      return res
        .status(401)
        .json({ message: "User Already Registered With Us, Try Logging In" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
    });
    user.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(401).json({ error: "Failed To Register User" });
    console.log("Failed To Register User", error);
  }
};

module.exports = RegisterUserRoute;
