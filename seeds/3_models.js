const config = require("../src/config");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const image_vivobook = `http://localhost:${config.port}/images/vivobook_model.jpg`;
  const image_msi = `http://localhost:${config.port}/images/msi_model.jpg`;
  const image_legion = `http://localhost:${config.port}/images/legion_model.jpg`;
  // Deletes ALL existing entries
  await knex("models").del();
  await knex("models").insert([
    { name: "Vivobook", image: image_vivobook, brand_id: "1" },
    { name: "MSI X9", image: image_msi, brand_id: "2" },
    { name: "Legion", image: image_legion, brand_id: "3" },
  ]);
};
