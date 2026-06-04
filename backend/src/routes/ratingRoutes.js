const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  submitRating,
} = require("../controllers/ratingController");

router.post(
  "/",
  authMiddleware,
  submitRating
);

module.exports = router;