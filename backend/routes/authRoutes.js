const express = require("express");
const authController = require("../controllers/authController");
const validateMiddleware = require("../middleware/validateMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { registerSchema, loginSchema } = require("../validation/authValidation");

const router = express.Router();

/** REGISTER */
router.post("/register", validateMiddleware(registerSchema), authController.register);

/** LOGIN */
router.post("/login", validateMiddleware(loginSchema), authController.login);

/** USER PROFILE (Protected Route) */
router.get("/profile", authMiddleware, authController.profile);

module.exports = router;
