const express = require("express");
const cors = require("cors");
const { sequelize, connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const habitRoutes = require("./routes/habitRoutes");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
require("dotenv").config();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Connect to Database
connectDB();
sequelize.sync({ alter: true }) // Auto-update DB schema if needed

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/user", userRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
