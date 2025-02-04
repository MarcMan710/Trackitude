const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const routes = require("./routes");
const errorMiddleware = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", routes);

// Global Error Handler
app.use(errorMiddleware);

// Database Sync
sequelize.sync()
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ Database sync error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
