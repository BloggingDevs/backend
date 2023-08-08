/* ==============   IMPORTS ================*/
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());

//ROUTES
app.get("/", (req, res) => {
  res.send("<h1>GodwinEgo Welcomes you to our blog backend</h1>");
});

app.listen(port, () => {
  console.log(`App is running on ${port} `);
});
