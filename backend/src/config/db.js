const knex = require("knex");
require("dotenv").config(); // Load environment variables

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "trackitude",
    port: process.env.DB_PORT || 5432,
  },
});

module.exports = db;
