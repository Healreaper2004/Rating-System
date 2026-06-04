const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  getStores,
  getStoreById,
  updatePassword,
  submitRating,
  updateRating,
} = require("../controllers/userController");

// Get all stores
router.get(
  "/stores",
  authMiddleware,
  getStores
);

// Get store details by ID
router.get(
  "/store/:id",
  authMiddleware,
  getStoreById
);

// User profile
router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);

//Update password
router.put(
  "/password",
  authMiddleware,
  updatePassword
);

router.post(
  "/rating",
  authMiddleware,
  submitRating
);

router.put(
  "/rating/:storeId",
  authMiddleware,
  updateRating
);

module.exports = router;