exports.seed = async function (knex) {
  await knex("users").del(); // Clear existing data
  await knex("users").insert([
    { id: "1", name: "John Doe", email: "john@example.com", password: "hashed_password" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", password: "hashed_password" },
  ]);
};
