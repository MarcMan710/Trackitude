const { validationResult } = require("express-validator");
const { errorResponse } = require("../utils/responseHandler");

// Middleware to validate request fields
function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array()[0].msg, 400);
  }
  next();
}

module.exports = validateRequest;
