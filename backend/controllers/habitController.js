const Habit = require("../models/Habit");

// Create Habit
exports.createHabit = async (req, res) => {
    try {
        const { title, description, frequency } = req.body;
        const newHabit = await Habit.create({ title, description, frequency, userId: req.user.id });

        res.status(201).json({ message: "Habit created successfully", habit: newHabit });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Habits for User
exports.getHabits = async (req, res) => {
    try {
        const habits = await Habit.findAll({ where: { userId: req.user.id } });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Habit
exports.updateHabit = async (req, res) => {
    try {
        const habit = await Habit.findByPk(req.params.id);

        if (!habit || habit.userId !== req.user.id) {
            return res.status(404).json({ message: "Habit not found" });
        }

        await habit.update(req.body);
        res.json({ message: "Habit updated successfully", habit });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Habit
exports.deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findByPk(req.params.id);

        if (!habit || habit.userId !== req.user.id) {
            return res.status(404).json({ message: "Habit not found" });
        }

        await habit.destroy();
        res.json({ message: "Habit deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
