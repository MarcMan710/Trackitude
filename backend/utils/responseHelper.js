// Standard API Response Format
const responseHelper = {
  success: (res, message = "Success", data = {}, statusCode = 200) => {
    return res.status(statusCode).json({ success: true, message, data });
  },
  error: (res, message = "Error", statusCode = 500) => {
    return res.status(statusCode).json({ success: false, message });
  }
};

module.exports = responseHelper;
