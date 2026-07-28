const express = require("express");

// Controller functions for CRUD operations on role requirements
const {
  createRoleRequirement,
  getAllRoleRequirements,
  getRoleRequirement,
  updateRoleRequirement,
  deleteRoleRequirement,
} = require("../controllers/roleRequirementController");

// protect: verifies JWT and attaches the logged-in user to req.user
// authorizeRoles: restricts access to specific user roles
const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// All routes below require a logged-in user (valid JWT)
router.use(protect);

// /  (collection-level routes)
router
  .route("/")
  // POST /  -> create a new role requirement
  // Restricted to hr and manager only, since employees/ld should
  // not be able to define what a role requires
  .post(authorizeRoles("hr", "manager"), createRoleRequirement)

  // GET /   -> list all role requirements
  // Read-only access opened up to ld and employee as well,
  // so employees can view requirements (e.g. for career pathing)
  // without being able to modify them
  .get(authorizeRoles("hr", "manager", "ld", "employee"), getAllRoleRequirements);

// /:id  (single role requirement routes)
router
  .route("/:id")
  // GET /:id -> fetch a single role requirement by ID
  // Same read-only access as the list route above
  .get(authorizeRoles("hr", "manager", "ld", "employee"), getRoleRequirement)

  // PUT /:id -> update an existing role requirement
  // Restricted to hr and manager (employees/ld cannot edit requirements)
  .put(authorizeRoles("hr", "manager"), updateRoleRequirement)

  // DELETE /:id -> remove a role requirement
  // Restricted to hr and manager (employees/ld cannot delete requirements)
  .delete(authorizeRoles("hr", "manager"), deleteRoleRequirement);

module.exports = router;