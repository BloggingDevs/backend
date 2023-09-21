const jwt = require("jsonwebtoken");

const AuthenticatedUser = async () => {
  try {
    const AuthorizationHeader = req.authorization.headers;
    if (!AuthorizationHeader) {
      return res
        .status(401)
        .json({ error: "You're not allowed to access this page" });
    }
    const token = AuthorizationHeader.split("")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized, token not provided" });
    }
    if (!token.value) {
      return res.status(401).json({ error: "Incorrect token provided" });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return res.staus(401).json({ error: "Unauthorized" });
    console.error(error);
  }
};

module.exports = AuthenticatedUser;
