const express = require("express");
const { createHabit, getUserHabits, getHabitById, updateHabit, deleteHabit } = require("../controllers/habitController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new habit (Protected)
router.post("/", authMiddleware, createHabit);

// Get all habits for a user (Protected)
router.get("/", authMiddleware, getUserHabits);

// Get a specific habit by ID (Protected)
router.get("/:id", authMiddleware, getHabitById);

// Update a habit (Protected)
router.put("/:id", authMiddleware, updateHabit);

// Delete a habit (Protected)
router.delete("/:id", authMiddleware, deleteHabit);

module.exports = router;
