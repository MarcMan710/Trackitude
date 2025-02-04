// Handles User Authentication and Authorization
const User = require("../models/User");
const hashHelper = require("../utils/hashHelper");
const jwtHelper = require("../utils/jwtHelper");
const responseHelper = require("../utils/responseHelper");

const authController = {
  /** REGISTER USER */
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return responseHelper.error(res, "Email already exists.", 400);

      // Hash password and create user
      const hashedPassword = await hashHelper.hashPassword(password);
      const newUser = await User.create({ name, email, password: hashedPassword });

      return responseHelper.success(res, "User registered successfully", { id: newUser.id, email: newUser.email }, 201);
    } catch (err) {
      return responseHelper.error(res, "Registration failed", 500);
    }
  },

  /** LOGIN USER */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ where: { email } });
      if (!user) return responseHelper.error(res, "Invalid email or password", 401);

      // Validate password
      const isPasswordValid = await hashHelper.comparePassword(password, user.password);
      if (!isPasswordValid) return responseHelper.error(res, "Invalid email or password", 401);

      // Generate JWT token
      const token = jwtHelper.generateToken(user);
      return responseHelper.success(res, "Login successful", { token });
    } catch (err) {
      return responseHelper.error(res, "Login failed", 500);
    }
  },

  /** GET USER PROFILE */
  profile: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, { attributes: ["id", "name", "email"] });
      if (!user) return responseHelper.error(res, "User not found", 404);

      return responseHelper.success(res, "User profile fetched", user);
    } catch (err) {
      return responseHelper.error(res, "Failed to fetch profile", 500);
    }
  },
};

module.exports = authController;
