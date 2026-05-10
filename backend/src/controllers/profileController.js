const User = require("../models/User");
const { logger } = require("../logger/logger");
const { uploadSafe, deleteSafe } = require("../config/cloudinary");

//  GET profile picture
exports.getProfilePic = async (req, res, next) => {
  const reqId = req.id;

  try {
    const user = await User.findById(req.user._id).select("profilePic");
    if (!user)
      return res.status(404).json({ error: true, message: "User not found" });

    logger.info(
      { reqId, userId: user._id },
      "Profile picture retrieved successfully"
    );
    res.json({ error: false, profilePic: user.profilePic });
  } catch (err) {
    logger.error({ reqId, error: err.message }, "Error fetching profile pic");
    next(err);
  }
};

// PUT upload new profile picture
exports.uploadProfilePic = async (req, res, next) => {
  const reqId = req.id;

  // inside uploadProfilePic handler - replace the block where you used uploadSafe
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ error: true, message: "No image uploaded" });

    const user = await User.findById(req.user._id);

    // Remove old pic from Cloudinary if exists (use stored publicId)
    if (user.profilePic?.publicId) {
      // fire-and-forget deletion (non-blocking)
      deleteSafe(user.profilePic.publicId)
        .then(() =>
          logger.info(
            { reqId, publicId: user.profilePic.publicId },
            "Old Cloudinary file deleted"
          )
        )
        .catch((err) =>
          logger.error(
            { reqId, error: err.message },
            "Failed deleting old Cloudinary file"
          )
        );
    }

    // Multer Cloudinary storage already uploaded the file — use metadata from req.file
    // Common keys to check: req.file.path, req.file.secure_url, req.file.filename, req.file.public_id
    // Use the safest available fields:
    const uploadedUrl = req.file.path || req.file.secure_url || req.file.url;
    const publicId =
      req.file.filename ||
      req.file.public_id ||
      (req.file.path && extractPublicIdFromUrl(req.file.path));

    // Save to DB
    user.profilePic = {
      url: uploadedUrl || "",
      publicId: publicId || "",
    };
    await user.save();

    logger.info(
      { reqId, userId: user._id, publicId },
      "Profile picture uploaded successfully"
    );

    return res.json({
      error: false,
      profilePic: user.profilePic,
      message: "Profile picture uploaded successfully",
    });
  } catch (err) {
    logger.error({ reqId, error: err.message }, "Error uploading profile pic");
    next(err);
  }
};

exports.deleteProfilePic = async (req, res, next) => {
  const reqId = req.id;

  // deleteProfilePic
  try {
    const user = await User.findById(req.user._id);

    if (!user.profilePic?.publicId) {
      // fast response if nothing to delete
      user.profilePic = { url: "", publicId: "" };
      await user.save();
      return res.json({
        error: false,
        message: "No profile picture to remove",
      });
    }

    const publicId = user.profilePic.publicId;

    // Clear picture immediately to keep UI snappy
    user.profilePic = { url: "", publicId: "" };
    await user.save();

    // Respond quickly
    res.json({ error: false, message: "Profile picture removed successfully" });

    // Delete from Cloudinary in background (non-blocking)
    deleteSafe(publicId)
      .then(() =>
        logger.info({ reqId, publicId }, "Cloudinary deletion complete")
      )
      .catch((err) =>
        logger.error(
          { reqId, error: err.message, publicId },
          "Cloudinary deletion failed"
        )
      );
  } catch (err) {
    logger.error({ reqId, error: err.message }, "Error removing profile pic");
    next(err);
  }
};

// GET complete profile (data + picture)
exports.getProfile = async (req, res, next) => {
  const reqId = req.id;

  try {
    const user = await User.findById(req.user._id).select(
      "username email profilePic profileData createdAt"
    );

    if (!user)
      return res.status(404).json({ error: true, message: "User not found" });

    logger.info({ reqId, userId: user._id }, "Profile retrieved successfully");
    res.json({ error: false, user });
  } catch (err) {
    logger.error({ reqId, error: err.message }, "Error fetching profile");
    next(err);
  }
};

// PUT update profile data (name, gender, links, etc.)
exports.updateProfile = async (req, res, next) => {
  const reqId = req.id;

  try {
    const { profileData } = req.body;

    if (!profileData)
      return res
        .status(400)
        .json({ error: true, message: "No profile data provided" });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profileData },
      { new: true }
    ).select("username email profilePic profileData createdAt");

    logger.info(
      { reqId, userId: updatedUser._id },
      "Profile Data updated successfully"
    );
    res.json({
      error: false,
      user: updatedUser,
      message: "Profile Data updated successfully",
    });
  } catch (err) {
    logger.error({ reqId, error: err.message }, "Error updating profile");
    next(err);
  }
};

exports.deleteAccount = async (req, res, next) => {
  const reqId = req.id;

  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    // Delete profile picture if it exists
    if (user.profilePic?.publicId) {
      await deleteSafe(user.profilePic.publicId);
    }

    await User.findByIdAndDelete(userId);
    logger.info({ reqId, userId }, "User account deleted successfully");
    res.json({ error: false, message: "Account deleted successfully" });
  } catch (err) {
    logger.error({ reqId, error: err.message }, "Error deleting account");
    next(err);
  }
};

function extractPublicIdFromUrl(url) {
  // Example Cloudinary url:
  // https://res.cloudinary.com/<cloud_name>/image/upload/v12345678/mern-profile-pics/abc123.jpg
  try {
    const parts = url.split("/");
    const last = parts.slice(-1)[0]; // abc123.jpg
    const fileName = last.split(".")[0]; // abc123
    const folderParts = parts.slice(0, parts.length - 1);
    // find index of 'upload' and collect the rest as public id path
    const uploadIdx = folderParts.findIndex((p) => p === "upload");
    if (uploadIdx >= 0) {
      const publicParts = folderParts.slice(uploadIdx + 1).concat(fileName);
      return publicParts.join("/");
    }
    return fileName;
  } catch (e) {
    return "";
  }
}
