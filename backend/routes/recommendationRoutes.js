const express = require("express");

// Controller that fetches the stored learning recommendation
// for a given employee/role pair
const {
  getRecommendation
} = require("../controllers/recommendationController");

// protect: verifies JWT and attaches the logged-in user to req.user
// authorizeRoles: restricts access to specific user roles
const {
  protect,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

// GET /:employeeId/:roleId
// Returns the learning recommendation generated for a specific
// employee against a specific role.
//
// Access control:
// - protect: must be a logged-in user with a valid token
// - authorizeRoles: manager, hr, ld, and employee roles may call this route
//   (employees are further restricted inside the controller to only
//   fetch their OWN recommendation, via the req.user._id check)
router.get(
  "/:employeeId/:roleId",
  protect,
  authorizeRoles(
    "manager",
    "hr",
    "ld",
    "employee"
  ),
  getRecommendation
);

module.exports = router;