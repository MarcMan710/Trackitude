const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false // Disable logging (for production)
});

// Test Connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database Connected Successfully!");
    } catch (error) {
        console.error("❌ Database Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
