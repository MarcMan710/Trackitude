const jwt = require("jsonwebtoken");
require("dotenv").config();

// Generate JWT Token
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
}

module.exports = { generateToken };
