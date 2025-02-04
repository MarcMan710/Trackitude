// JWT Authentication Middleware
const jwtHelper = require("../utils/jwtHelper");
const responseHelper = require("../utils/responseHelper");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return responseHelper.error(res, "Access Denied. No token provided.", 401);
  }

  try {
    const decoded = jwtHelper.verifyToken(token.replace("Bearer ", ""));
    if (!decoded) return responseHelper.error(res, "Invalid token.", 401);
    
    req.user = decoded;
    next();
  } catch (err) {
    return responseHelper.error(res, "Token verification failed.", 401);
  }
};

module.exports = authMiddleware;
