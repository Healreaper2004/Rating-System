const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getDashboard,
} = require("../controllers/storeController");

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("STORE_OWNER"),
  getDashboard
);

module.exports = router;