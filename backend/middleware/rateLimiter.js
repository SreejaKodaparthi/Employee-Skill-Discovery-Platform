const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  // 15 minutes
  windowMs: 15 * 60 * 1000,

  // Maximum requests per IP during the time window
  max: 100,

  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
  },

  // Adds standard RateLimit-* headers
  standardHeaders: true,

  // Disables legacy X-RateLimit-* headers
  legacyHeaders: false,

  // Skip successful requests? (Keep false so every request counts)
  skipSuccessfulRequests: false,

  // Skip failed requests? (Keep false to protect against abuse)
  skipFailedRequests: false,
});

module.exports = apiLimiter;