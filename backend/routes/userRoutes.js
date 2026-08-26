// const express = require("express");

// const {
//   getAllUsers,
//   updateUserRole,
// } = require("../controllers/userController");

// const {
//   protect,
//   authorizeRoles,
// } = require("../middleware/authMiddleware");

// const router = express.Router();

// // All user-management routes require authentication
// router.use(protect);

// // Only HR can manage users
// router.get(
//   "/",
//   authorizeRoles("hr"),
//   getAllUsers
// );

// router.put(
//   "/:id/role",
//   authorizeRoles("hr"),
//   updateUserRole
// );

// module.exports = router;


const express = require("express");

const {
  getAllUsers,
  getEmployees,
  updateUserRole,
} = require("../controllers/userController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// All user-management routes require authentication
router.use(protect);

// Only HR can manage/view all users (used for role reassignment)
router.get(
  "/",
  authorizeRoles("hr"),
  getAllUsers
);

// HR and Manager can view the employee list (used for Skill Gap picker)
router.get(
  "/employees",
  authorizeRoles("hr", "manager"),
  getEmployees
);

router.put(
  "/:id/role",
  authorizeRoles("hr"),
  updateUserRole
);

module.exports = router;