const mongoose = require("mongoose");
const { logger } = require("../logger/logger");

const connectDB = async () => {
  const url = process.env.MONGO_URI;

  if (!url) throw new Error("MONGO_URI is not set");

  try {
    await mongoose.connect(url);
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error(`MongoDB connection failed: ${err.message}`);
    if (process.env.NODE_ENV === "development") {
      console.error("Full error:", err);
    }
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  await mongoose.connection.close(false);
  logger.info("MongoDB connection closed (SIGINT)");
  process.exit(0);
});

module.exports = connectDB;
