const dotenv = require("dotenv");

// Load .env file
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 5000,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    JWT_SECRET: process.env.JWT_SECRET || "supersecret",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d"
};
