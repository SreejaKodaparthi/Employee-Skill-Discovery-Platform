const dns = require("node:dns");

// Use public DNS servers (Cloudflare, Google)
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const apiLimiter = require("./middleware/rateLimiter");
const connectDB = require("./config/db");

// ---------- Route Imports ----------
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const skillRoutes = require("./routes/skillRoutes");
const searchRoutes = require("./routes/searchRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const certificationRoutes = require("./routes/certificationRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const skillCatalogRoutes = require("./routes/skillCatalogRoutes");
const roleRequirementRoutes = require("./routes/roleRequirementRoutes");
const skillGapRoutes = require("./routes/skillGapRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

// Connect Database
connectDB();

const app = express();

/* ------------------------------------------------------------------
   CORS Configuration
------------------------------------------------------------------ */
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT_URL
      : true,

  methods: ["GET", "POST", "PUT", "DELETE"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],

  credentials: true,
};

app.use(cors(corsOptions));

/* ------------------------------------------------------------------
   Global Middleware
------------------------------------------------------------------ */

app.use(express.json());

// Apply rate limiting to all API routes
app.use("/api", apiLimiter);

/* ------------------------------------------------------------------
   Health Routes
------------------------------------------------------------------ */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee Skill Discovery Platform API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
  });
});

/* ------------------------------------------------------------------
   API Routes
------------------------------------------------------------------ */

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/skill-catalog", skillCatalogRoutes);
app.use("/api/roles", roleRequirementRoutes);
app.use("/api/skill-gap", skillGapRoutes);
app.use("/api/recommendations", recommendationRoutes);

/* ------------------------------------------------------------------
   Start Server
------------------------------------------------------------------ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});