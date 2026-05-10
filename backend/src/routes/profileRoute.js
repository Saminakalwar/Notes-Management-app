const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const profileController = require("../controllers/profileController");
const auth = require("../middleware/authMiddleware");

router.get("/profile-pic", auth, profileController.getProfilePic);
router.put(
  "/profile-pic",
  auth,
  upload.single("profilePic"),
  profileController.uploadProfilePic
);
router.delete("/profile-pic", auth, profileController.deleteProfilePic);

// ✅ Profile Data Routes
router.get("/profile", auth, profileController.getProfile);
router.put("/profile", auth, profileController.updateProfile);
router.delete("/delete-account", auth, profileController.deleteAccount);

module.exports = router;
