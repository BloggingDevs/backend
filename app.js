/* ==============   IMPORTS ================*/
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL;
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

/*==============    ROUTES    ==================*/
app.get("/", (req, res) => {
  res.send("<h1>GodwinEgo Welcomes you to our blog backend</h1>");
});

/*================USER REGISTRATON=============== */
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successsfully" });
  } catch (error) {
    console.error("Error during registration: ", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

/*==================USER LOGIN==================== */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.secretKey);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login Failed" });
  }
});

/*==============SERVER RUNNING============= */
app.listen(port, () => {
  console.log(`App is running on ${port} `);
});
