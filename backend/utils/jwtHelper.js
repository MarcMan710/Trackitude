// JWT Token Generation & Verification using jsonwebtoken
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/dotenv");

const jwtHelper = {
  generateToken: (user) => {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
  },
  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return null;
    }
  }
};

module.exports = jwtHelper;
