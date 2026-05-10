const rateLimit = require("express-rate-limit");

const isDev = process.env.NODE_ENV === "development";

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 50 : 5, // Relaxed limit in development
  message: {
    error: true,
    message: "Too many login attempts. Try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

exports.registerLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: isDev ? 20 : 5, // Relaxed limit in development
});

exports.passwordLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: isDev ? 20 : 3,
  message: {
    error: true,
    message: "Too many password reset attempts. Try again later.",
  },
});
