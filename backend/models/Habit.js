const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Habit = sequelize.define("Habit", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  frequency: {
    type: DataTypes.ENUM("daily", "weekly", "monthly"),
    allowNull: false,
    defaultValue: "daily",
  },
  completedDates: {
    type: DataTypes.ARRAY(DataTypes.DATE),
    defaultValue: [],
  },
}, {
  timestamps: true,
});

Habit.belongsTo(User, { foreignKey: "userId" });

module.exports = Habit;
