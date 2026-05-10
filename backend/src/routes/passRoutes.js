const express = require("express");
const router = express.Router();
const passController = require("../controllers/passwordController");
const { passwordLimiter } = require("../middleware/rateLimit");

//to test pass routes r accessible
router.get("/test", (req, res) => {
  res.json({ message: "Password route is working" });
});

// Forgot/Reset Password
router.post("/forgot-password", passwordLimiter, passController.forgotPassword);
router.post("/reset-password/:token", passController.resetPassword);

module.exports = router;
