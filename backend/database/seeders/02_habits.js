exports.seed = async function (knex) {
  await knex("habits").del(); // Clear existing data
  await knex("habits").insert([
    { id: "1", user_id: "1", title: "Morning Exercise", description: "Do 30 minutes of exercise" },
    { id: "2", user_id: "2", title: "Read a Book", description: "Read at least 10 pages" },
  ]);
};
