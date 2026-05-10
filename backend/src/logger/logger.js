const pino = require("pino");
const expressPino = require("express-pino-logger");

const env = process.env.NODE_ENV || "development";
const isDev = env === "development";
const isTest = env === "test";

const logger = pino({
  base: null, //to remove pid & hostname globally to keep logs clean
  level: isTest ? "silent" : isDev ? "debug" : "info", // more verbose in dev
  transport: isDev
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
          ignore: "pid,hostname",
          messageFormat: "{msg}",
        },
      }
    : undefined, // no pretty-print in production
});

// ✅ Safe function to get URL as a string
const getUrl = (req) => {
  return req.originalUrl || req.url || "";
};

const expressLogger = expressPino({
  logger,
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: getUrl(req),
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
  autoLogging: {
    ignore: (req) => {
      const url = getUrl(req);

      return (
        url === "/favicon.ico" ||
        url.startsWith("/static") ||
        url === "/health" ||
        url.startsWith("/api/auth/get-user") ||
        url.startsWith("/api/notes") ||
        url.startsWith("/api/profile") ||
        (url.includes("/notes") && req.method === "GET")
      );
    },
  },
});

module.exports = { logger, expressLogger };
