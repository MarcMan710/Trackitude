const HabitModel = require("../models/HabitModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

// Create a new habit
async function createHabit(req, res) {
  try {
    const { title, description } = req.body;
    const user_id = req.user.id; // Retrieved from JWT middleware

    const newHabit = await HabitModel.createHabit({ user_id, title, description });
    return successResponse(res, "Habit created successfully", { habit: newHabit });
  } catch (error) {
    return errorResponse(res, "Error creating habit", 500);
  }
}

// Get all habits for a user
async function getUserHabits(req, res) {
  try {
    const user_id = req.user.id;
    const habits = await HabitModel.getHabitsByUser(user_id);
    return successResponse(res, "User habits retrieved successfully", { habits });
  } catch (error) {
    return errorResponse(res, "Error fetching habits", 500);
  }
}

// Get a single habit by ID
async function getHabitById(req, res) {
  try {
    const { id } = req.params;
    const habit = await HabitModel.getHabitById(id);

    if (!habit) return errorResponse(res, "Habit not found", 404);
    return successResponse(res, "Habit retrieved successfully", { habit });
  } catch (error) {
    return errorResponse(res, "Error fetching habit", 500);
  }
}

// Update a habit
async function updateHabit(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    
    const updatedHabit = await HabitModel.updateHabit(id, updatedData);
    if (!updatedHabit) return errorResponse(res, "Habit not found", 404);

    return successResponse(res, "Habit updated successfully", { habit: updatedHabit });
  } catch (error) {
    return errorResponse(res, "Error updating habit", 500);
  }
}

// Delete a habit
async function deleteHabit(req, res) {
  try {
    const { id } = req.params;
    
    const deletedHabit = await HabitModel.deleteHabit(id);
    if (!deletedHabit) return errorResponse(res, "Habit not found", 404);

    return successResponse(res, "Habit deleted successfully");
  } catch (error) {
    return errorResponse(res, "Error deleting habit", 500);
  }
}

module.exports = { createHabit, getUserHabits, getHabitById, updateHabit, deleteHabit };
