const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const RegisterUserRoute = require("./routes/RegisterUserRoute");

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5001;

//MONGODB  CONNECTION
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connectiong to database: ", error);
  });

app.get("/", (req, res) => {
  res.status(201).json({ message: "Let's Start The backend" });
});

//USER REGISTRATION
app.post("/register", RegisterUserRoute);

app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
