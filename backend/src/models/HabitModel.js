const db = require("../config/db");

const HabitModel = {
  // Create a new habit
  async createHabit(habit) {
    return await db("habits").insert(habit).returning("*");
  },

  // Get all habits for a user
  async getHabitsByUser(user_id) {
    return await db("habits").where({ user_id }).orderBy("created_at", "desc");
  },

  // Get a single habit by ID
  async getHabitById(id) {
    return await db("habits").where({ id }).first();
  },

  // Update a habit
  async updateHabit(id, updatedData) {
    return await db("habits").where({ id }).update(updatedData).returning("*");
  },

  // Delete a habit
  async deleteHabit(id) {
    return await db("habits").where({ id }).del();
  },
};

module.exports = HabitModel;
