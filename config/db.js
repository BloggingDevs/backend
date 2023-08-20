const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

/*=============     MONGODB CONNECT     ================*/
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
  });
