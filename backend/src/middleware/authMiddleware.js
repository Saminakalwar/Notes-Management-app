// src/middleware/authMiddleware.js
const { verifyToken } = require("../utils/jwt");
const User = require("../models/User");
const { logger } = require("../logger/logger");

const authMiddleware = async (req, res, next) => {
  const reqId = req.id;

  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      logger.warn({ reqId }, "No token provided");
      return res
        .status(401)
        .json({ error: true, message: "No token provided" });
    }

    //Verify Token
    let decoded = verifyToken(token); // will be caught by outer try/catch

    //Fetch User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      //token valid but user not found.
      logger.warn(
        { reqId, userId: decoded.id },
        "token valid but user not found"
      );
      return res.status(401).json({ message: "Invalid token" });
    }

    // user found + valid token => Attach user to req and allow the request to continue
    req.user = user;
    next();
  } catch (err) {
    logger.error(
      { reqId, error: err.message },
      "Auth Middleware Internal error"
    );
    res.status(500).json({ error: true, message: "Authentication Failed" });
  }
};

module.exports = authMiddleware;
