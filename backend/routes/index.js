const express = require("express");
const authRoutes = require("./authRoutes");
const habitRoutes = require("./habitRoutes");

const router = express.Router();

/** API ROUTES */
router.use("/auth", authRoutes);
router.use("/habits", habitRoutes);

module.exports = router;
