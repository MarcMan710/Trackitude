const express = require("express");
const habitController = require("../controllers/habitController");
const validateMiddleware = require("../middleware/validateMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { habitSchema } = require("../validation/habitValidation");

const router = express.Router();

/** CREATE A HABIT */
router.post("/", authMiddleware, validateMiddleware(habitSchema), habitController.createHabit);

/** GET USER HABITS */
router.get("/", authMiddleware, habitController.getHabits);

/** UPDATE HABIT */
router.put("/:id", authMiddleware, habitController.updateHabit);

/** DELETE HABIT */
router.delete("/:id", authMiddleware, habitController.deleteHabit);

/** MARK HABIT AS COMPLETED */
router.post("/:id/complete", authMiddleware, habitController.markCompleted);

module.exports = router;
