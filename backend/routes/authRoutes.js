const express = require("express");

const {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
  updateUserRole,
} = require("../controllers/authController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();


// Register
router.post(
  "/register",
  registerUser
);


// Login
router.post(
  "/login",
  loginUser
);


// Current user
router.get(
  "/me",
  protect,
  getMe
);


// Forgot password
router.post(
  "/forgot-password",
  forgotPassword
);


// Reset password
router.post(
  "/reset-password/:token",
  resetPassword
);

router.patch(
  "/users/:userId/role",
  protect,
  authorizeRoles("hr"),
  updateUserRole
);
module.exports = router;