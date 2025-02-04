const { errorResponse } = require("../utils/responseHandler");

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  return errorResponse(res, err.message || "Internal Server Error", err.status || 500);
}

module.exports = errorHandler;
