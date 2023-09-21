const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const AuthenticatedUser = async (req, res, next) => {
  try {
    const AuthorizationHeader = req.headers.authorization;
    if (!AuthorizationHeader) {
      return res
        .status(401)
        .json({ error: "You're not allowed to access this page" });
    }
    const token = AuthorizationHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized, token not provided" });
    }
    // if (!token.value) {
    //   return res.status(401).json({ error: "Incorrect token provided" });
    // }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = AuthenticatedUser;
