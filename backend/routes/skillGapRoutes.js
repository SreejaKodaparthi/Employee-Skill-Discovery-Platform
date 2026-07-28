const express = require("express");

// Controller that computes (or returns cached) skill gap data and
// AI-generated learning recommendations for an employee/role pair
const {
  generateSkillGapReport,
} = require("../controllers/skillGapController");

// protect: verifies JWT and attaches the logged-in user to req.user
// authorizeRoles: restricts access to specific user roles
const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// GET /:employeeId/:roleId
// Generates (or fetches a cached) skill gap report comparing an
// employee's current skills against a role's required skills,
// along with an AI-generated learning recommendation.
//
// Access control:
// - protect: must be a logged-in user with a valid token
// - authorizeRoles: manager, hr, ld, and employee roles may call this route
//   (employees are further restricted inside the controller to only
//   generate/view their OWN report, via the req.user._id check)
router.get(
  "/:employeeId/:roleId",
  protect,
  authorizeRoles(
    "manager",
    "hr",
    "ld",
    "employee"
  ),
  generateSkillGapReport
);

module.exports = router;