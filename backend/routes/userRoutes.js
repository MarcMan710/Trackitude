const express = require("express");
const { createHabit, getHabits, updateHabit, deleteHabit } = require("../controllers/habitController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/habits
// @desc    Create a new habit
// @access  Private
router.post("/", authMiddleware, createHabit);

// @route   GET /api/habits
// @desc    Get all habits of a user
// @access  Private
router.get("/", authMiddleware, getHabits);

// @route   PUT /api/habits/:id
// @desc    Update a habit
// @access  Private
router.put("/:id", authMiddleware, updateHabit);

// @route   DELETE /api/habits/:id
// @desc    Delete a habit
// @access  Private
router.delete("/:id", authMiddleware, deleteHabit);

module.exports = router;
