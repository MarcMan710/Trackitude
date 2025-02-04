// Global Error Handling Middleware
const responseHelper = require("../utils/responseHelper");

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  responseHelper.error(res, err.message || "Internal Server Error", err.status || 500);
};

module.exports = errorMiddleware;
