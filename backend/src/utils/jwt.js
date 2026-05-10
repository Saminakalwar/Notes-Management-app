const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET is missing in environment variables.");
}

exports.signToken = (userId) =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });

exports.signResetToken = (userId) =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "10m" });

exports.verifyToken = (token) => jwt.verify(token, JWT_SECRET);
