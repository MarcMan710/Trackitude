const db = require("../config/db");

const UserModel = {
  // Create a new user
  async createUser(user) {
    return await db("users").insert(user).returning("*");
  },

  // Find user by email
  async findByEmail(email) {
    return await db("users").where({ email }).first();
  },

  // Find user by ID
  async findById(id) {
    return await db("users").where({ id }).first();
  },

  // Delete user
  async deleteUser(id) {
    return await db("users").where({ id }).del();
  },
};

module.exports = UserModel;
