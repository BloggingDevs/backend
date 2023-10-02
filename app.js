const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const AuthenticatedUser = require("./middleware/AuthenticatedUser.js");
const authRoutes = require("./routes/Auth.js");

const app = express();
app.use(express.json());
app.use(cors())
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
        console.log("Error connecting to database: ", error);
    });

app.get("/", (req, res) => {
    res.status(201).json({message: "Let's Start The backend"});
});
app.use("/auth", authRoutes);
//PROTECTED ROUTES
app.get("/protected", AuthenticatedUser, (req, res) => {
    res.status(201).json({message: "You've accessed a protected route"});
});
app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
});
