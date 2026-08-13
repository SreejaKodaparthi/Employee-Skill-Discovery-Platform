const express = require("express");

const {
  getAnalyticsSummary,
  getTopSkills,
  getDepartmentAnalytics,
  getCertificationAnalytics,
  getSkillGapAnalytics,
  getResumeStats,
} = require("../controllers/analyticsController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

/*
 * All analytics endpoints require authentication.
 */
router.use(protect);

/*
 * Analytics are intended for organisation-level roles.
 */
router.get(
  "/summary",
  authorizeRoles("manager", "hr", "ld"),
  getAnalyticsSummary
);

router.get(
  "/top-skills",
  authorizeRoles("manager", "hr", "ld"),
  getTopSkills
);

router.get(
  "/departments",
  authorizeRoles("manager", "hr", "ld"),
  getDepartmentAnalytics
);

router.get(
  "/certifications",
  authorizeRoles("manager", "hr", "ld"),
  getCertificationAnalytics
);

router.get(
  "/skill-gaps",
  protect,
  authorizeRoles("hr","manager","ld"),
  getSkillGapAnalytics
);

router.get(
  "/resume-stats",
  authorizeRoles("manager", "hr", "ld"),
  getResumeStats
);

module.exports = router;