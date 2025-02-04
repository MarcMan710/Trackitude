// Handles Habit Tracking
const Habit = require("../models/Habit");
const responseHelper = require("../utils/responseHelper");

const habitController = {
  /** CREATE A HABIT */
  createHabit: async (req, res) => {
    try {
      const { title, description, frequency } = req.body;
      const newHabit = await Habit.create({ userId: req.user.id, title, description, frequency });

      return responseHelper.success(res, "Habit created successfully", newHabit, 201);
    } catch (err) {
      return responseHelper.error(res, "Failed to create habit", 500);
    }
  },

  /** GET USER HABITS */
  getHabits: async (req, res) => {
    try {
      const habits = await Habit.findAll({ where: { userId: req.user.id } });

      return responseHelper.success(res, "Habits fetched successfully", habits);
    } catch (err) {
      return responseHelper.error(res, "Failed to fetch habits", 500);
    }
  },

  /** UPDATE HABIT */
  updateHabit: async (req, res) => {
    try {
      const { id } = req.params;
      const habit = await Habit.findOne({ where: { id, userId: req.user.id } });

      if (!habit) return responseHelper.error(res, "Habit not found", 404);

      await habit.update(req.body);
      return responseHelper.success(res, "Habit updated successfully", habit);
    } catch (err) {
      return responseHelper.error(res, "Failed to update habit", 500);
    }
  },

  /** DELETE HABIT */
  deleteHabit: async (req, res) => {
    try {
      const { id } = req.params;
      const habit = await Habit.findOne({ where: { id, userId: req.user.id } });

      if (!habit) return responseHelper.error(res, "Habit not found", 404);

      await habit.destroy();
      return responseHelper.success(res, "Habit deleted successfully");
    } catch (err) {
      return responseHelper.error(res, "Failed to delete habit", 500);
    }
  },

  /** MARK HABIT AS COMPLETED */
  markCompleted: async (req, res) => {
    try {
      const { id } = req.params;
      const habit = await Habit.findOne({ where: { id, userId: req.user.id } });

      if (!habit) return responseHelper.error(res, "Habit not found", 404);

      // Add today's date to completedDates array
      const today = new Date().toISOString().split("T")[0];
      if (!habit.completedDates.includes(today)) {
        habit.completedDates.push(today);
        await habit.save();
      }

      return responseHelper.success(res, "Habit marked as completed", habit);
    } catch (err) {
      return responseHelper.error(res, "Failed to mark habit as completed", 500);
    }
  },
};

module.exports = habitController;
