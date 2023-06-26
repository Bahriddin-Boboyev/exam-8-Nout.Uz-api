/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("categorys").del();
  await knex("categorys").insert([
    { name: "laptops" },
    { name: "game_laptops" },
    { name: "ultrabuki" },
  ]);
};
