// src/middleware/errorMiddleware.js
const { logger } = require("../logger/logger");

module.exports = (err, req, res, next) => {
  const reqId = req?.id || "unknown";

  // Categorize error
  let status = err.status || 500;
  let message = err.message || "Internal server error";

  // MongoDB validation or cast errors
  if (err.name === "ValidationError") {
    status = 400;
    message = "Validation failed";
  } else if (err.name === "CastError") {
    status = 400;
    message = "Invalid ID format";
  }

  // JWT or Auth related errors
  if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    status = 401;
    message = "Token expired";
  }

  // MongoDB duplicate key error (e.g., email already registered)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    status = 400;
    message = `The ${field} is already registered. Please use another one.`;
  }

  // Log full error with request ID and path
  logger.error(
    {
      reqId,
      path: req.originalUrl,
      method: req.method,
      status,
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    },
    "Error captured by global middleware"
  );

  res.status(status).json({
    error: true,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
