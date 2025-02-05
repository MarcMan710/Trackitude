const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Habit = sequelize.define("Habit", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    frequency: {
        type: DataTypes.ENUM("daily", "weekly", "monthly"),
        allowNull: false
    },
    completedDates: {
        type: DataTypes.ARRAY(DataTypes.DATE), // Array to store completed dates
        defaultValue: []
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    }
}, {
    timestamps: true
});

// Define Relationship (One User can have Many Habits)
User.hasMany(Habit, { foreignKey: "userId", onDelete: "CASCADE" });
Habit.belongsTo(User, { foreignKey: "userId" });

module.exports = Habit;
