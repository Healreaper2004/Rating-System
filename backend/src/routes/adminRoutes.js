const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getDashboardStats,
  createStore,
  createUser,
  getAllStores,
  getAllUsers,
  getAllRatings,
  //getUserDetails,
  getUserById,
} = require("../controllers/adminController");

router.get("/ratings-test", (req, res) => {
  res.json({
    success: true,
    message: "Ratings Route Loaded",
  });
});

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getDashboardStats
);

router.post(
  "/store",
  authMiddleware,
  roleMiddleware("ADMIN"),
  (req, res, next) => {
    console.log("STORE ROUTE HIT");
    next();
  },
  createStore
);

router.get(
  "/ratings",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllRatings
);

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Admin Route Working",
  });
});

router.get(
  "/stores",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllStores
);

router.get(
  "/users/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUserById
);

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllUsers
);

router.post(
  "/user",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createUser
);

module.exports = router;