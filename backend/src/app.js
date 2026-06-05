const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storeRoutes = require("./routes/storeRoutes");

const ratingRoutes = require("./routes/ratingRoutes");
const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = require("./config/db");

// Load models and associations
require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Store Rating System API Running",
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log(" MySQL Connected");

    // Create/Update tables
    await sequelize.sync();
    console.log("Tables Created / Synced");

    // Start Express server
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Database Connection Failed");
    console.error(error);
  }
}

app.use("/api/store", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
startServer();