const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./src/config/db");
const { logger, expressLogger } = require("./src/logger/logger");

const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const { randomUUID } = require("crypto");

// Validate required ENV variables
const requiredEnv = [
  "JWT_SECRET",
  // "JWT_RESET_SECRET",
  "MONGO_URI",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "EMAIL_USER",
  "EMAIL_PASS",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
});

const authRoutes = require("./src/routes/authRoutes");
const noteRoutes = require("./src/routes/noteRoutes");
const profileRoutes = require("./src/routes/profileRoute");
const passwordRoutes = require("./src/routes/passRoutes");
const errorMiddleware = require("./src/middleware/errorMiddleware");

const app = express();

// Global Middlewares
// app.use(express.json());  // to parse json ,whenever
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   }),
// );
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL, // production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(compression());

// Adds a unique ID to each request for traceable logging
app.use((req, res, next) => {
  req.id = randomUUID();
  next();
});

//to log each request(method, path, status)
app.use(expressLogger);

//Routes

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/auth", passwordRoutes);
app.use("/api", profileRoutes);

//404-error handler
app.use((req, res) => {
  logger.warn({ reqId: req.id, url: req.originalUrl }, "404 - Route not found");
  res.status(404).json({ error: true, message: "Route not found" });
});

//global error handler(must be the last)
app.use(errorMiddleware);

// Server + DB initialization
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info({
        msg: `Server started successfully`,
        port: PORT,
        env: process.env.NODE_ENV || "development",
      });
    });
  })
  .catch((err) => {
    logger.error({ msg: "DB connection Failed", error: err.message });
    process.exit(1);
  });

//Graceful shutdown
process.on("SIGINT", () => {
  logger.info("🛑 Server shutting down...");
  process.exit(0);
});

module.exports = app;
