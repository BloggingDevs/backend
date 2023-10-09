const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//USER REGISTRATION
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    //check if username exists
    const checkExistingUserName = await User.findOne({ username });
    if (checkExistingUserName) {
      return res
        .status(401)
        .json({ message: "Username Already Exists, Try Another One" });
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
    });
    await user.save();
    res.status(200).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(401).json({ error: "Failed To Register User" });
  }
});

// USER LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h", // Token expires in 1 hour
    });
    return res.status(201).json({ message: "Login Successful", token });
  } catch (error) {
    return res.status(401).json({ error: "Login Failed" });
  }
});

module.exports = router;
