const UserModel = require("../models/UserModel");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { generateToken } = require("../utils/generateToken");
const { successResponse, errorResponse } = require("../utils/responseHandler");

// Register a new user
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findByEmail(email);

    if (existingUser) return errorResponse(res, "Email already in use", 400);

    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.createUser({ name, email, password: hashedPassword });

    return successResponse(res, "User registered successfully", { user: newUser });
  } catch (error) {
    return errorResponse(res, "Error registering user", 500);
  }
}

// Login user and generate JWT
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByEmail(email);

    if (!user) return errorResponse(res, "Invalid email or password", 401);

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) return errorResponse(res, "Invalid email or password", 401);

    const token = generateToken(user);
    return successResponse(res, "Login successful", { token });
  } catch (error) {
    return errorResponse(res, "Error logging in", 500);
  }
}

module.exports = { registerUser, loginUser };
