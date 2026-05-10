const nodemailer = require("nodemailer");
const User = require("../models/User");
const { logger } = require("../logger/logger");
const { signResetToken, verifyToken } = require("../utils/jwt");
const validator = require("../utils/validator"); // for password validation if needed
const bcrypt = require("bcryptjs");

// ------------FORGET PASSWORD-----------------
exports.forgotPassword = async (req, res) => {
  const reqId = req.id;

  try {
    const { email } = req.body;

    // 1. Validate email presence
    if (!email) {
      return res
        .status(400)
        .json({ error: true, message: "Email is required" });
    }

    // 2. Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        error: true,
        message: "Invalid email format",
      });
    }

    // 3. Find user (do not reveal existence)
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(
        { reqId, email },
        "Password reset requested for non-existing account"
      );

      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });
    }

    // 4. Rate limit — allow new reset email only every 2 minutes
    if (
      user.resetRequestedAt &&
      Date.now() - user.resetRequestedAt < 2 * 60 * 1000
    ) {
      logger.warn({ reqId, email }, "Reset email requested too frequently");
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });
    }

    // 5. Generate reset token (10 minutes)
    const token = signResetToken(user._id);

    // 6. Check email ENV configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      logger.error({ reqId }, "Email environment variables missing");
      return res.status(500).json({
        error: true,
        message: "Email service not configured",
      });
    }

    // 7. Configure Gmail transporter (secure)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const mailOptions = {
      from: `"Notes App Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
                <h2>Password Reset Request</h2>
                <p>You requested to reset your password for your Notes App account.</p>
                <p><a href="${resetLink}" style="color:#1a73e8;">Click here to reset your password</a></p>
                <p><small>This link will expire in 10 minutes. If you didn’t request this, please ignore this email.</small></p>
            `,
    };

    try {
      await transporter.sendMail(mailOptions);

      // Update timestamp only if email sent
      user.resetRequestedAt = Date.now();
      await user.save();

      logger.info({ reqId, email }, "Password reset email sent");
    } catch (mailErr) {
      logger.error(
        {
          reqId,
          email,
          error: mailErr.message,
          stack: mailErr.stack,
        },
        "Failed to send reset email"
      );
    }

    // 8. Always send the same response (privacy)
    return res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    });
  } catch (err) {
    logger.error({ reqId, error: err.message }, "Error in forgot password");
    return res.status(500).json({ error: true, message: "Server error" });
  }
};

// ------------RESET PASSWORD-----------------
exports.resetPassword = async (req, res) => {
  const reqId = req.id;

  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ error: true, message: "Token is required" });
    }

    // 1. Validate password format (strength)
    const checkPass = validator.isValidPassword(newPassword);
    if (checkPass !== true) {
      return res.status(400).json({ error: true, message: checkPass });
    }

    // 2. Verify token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (verifyErr) {
      logger.warn(
        { reqId, error: verifyErr.message },
        "Token verification failed"
      );
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (!decoded?.id) {
      logger.warn({ reqId }, "Decoded token missing id");
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // 3. Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // 4. Update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    logger.info({ reqId, userId: user._id }, "Password reset successful");

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (err) {
    logger.error({ reqId, error: err.message }, "Error in reset password");
    return res.status(500).json({ message: "Server error" });
  }
};
