// const express = require("express");

// const {
//   registerUser,
//   loginUser,
//   getMe,
//   forgotPassword,
//   resetPassword,
// } = require("../controllers/authController");

// const {
//   protect,
// } = require("../middleware/authMiddleware");

// const router = express.Router();


// // ======================================================
// // AUTH ROUTES
// // ======================================================

// // Register
// router.post("/register", registerUser);

// // Login
// router.post("/login", loginUser);

// // Get logged-in user
// router.get(
//   "/me",
//   protect,
//   getMe
// );


// // ======================================================
// // PASSWORD RESET ROUTES
// // ======================================================

// // Request password reset
// router.post(
//   "/forgot-password",
//   forgotPassword
// );

// // Reset password using token
// router.post(
//   "/reset-password/:token",
//   resetPassword
// );


// module.exports = router;

const express = require("express");

const {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const {
  protect,
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


module.exports = router;