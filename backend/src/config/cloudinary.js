const cloudinary = require("cloudinary").v2;
const { logger } = require("../logger/logger");

// Validate environment variables
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  logger.error("❌ Missing Cloudinary environment variables");
  throw new Error("Missing Cloudinary env vars");
}

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Safe Upload
const uploadSafe = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file, { folder });

    logger.info(
      { folder, publicId: result.public_id },
      "Cloudinary image uploaded successfully"
    );

    return result;
  } catch (err) {
    logger.error(
      { error: err.message, folder },
      "Cloudinary upload failed"
    );
    return null;
  }
};

// Safe Delete
const deleteSafe = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    logger.info(
      { publicId },
      "Cloudinary image deleted successfully"
    );

    return result;
  } catch (err) {
    logger.error(
      { error: err.message, publicId },
      "Cloudinary delete failed"
    );
    return null;
  }
};

module.exports = {
  cloudinary,
  uploadSafe,
  deleteSafe,
};
