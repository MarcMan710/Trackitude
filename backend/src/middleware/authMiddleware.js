const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseHandler");
require("dotenv").config();

function authMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return errorResponse(res, "Access Denied. No token provided.", 401);
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return errorResponse(res, "Invalid or expired token.", 401);
  }
}

module.exports = authMiddleware;
