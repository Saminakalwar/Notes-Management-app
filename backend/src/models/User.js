const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    resetRequestedAt: {
      type: Date,
      default: null,
    },
    profilePic: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" }, // store cloudinary public_id (including folder if any)
    },
    profileData: {
      fullname: String,
      gender: String,
      country: String,
      language: String,
      timezone: String,
      linkedin: String,
      github: String,
    },
  },
  { timestamps: true }
);

// Ensure MongoDB handles unique email errors cleanly
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    return next(new Error("Email already exists"));
  }
  next(error);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
