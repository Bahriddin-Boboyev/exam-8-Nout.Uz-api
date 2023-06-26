const config = require("../src/config");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const image_asus = `http://localhost:${config.port}/images/asus.jpg`;
  const image_msi = `http://localhost:${config.port}/images/msi.png`;
  const image_lenovo = `http://localhost:${config.port}/images/lenovo.png`;
  // Deletes ALL existing entries
  await knex("brands").del();
  await knex("brands").insert([
    { name: "Asus", image: image_asus },
    { name: "MSI", image: image_msi},
    { name: "Lenovo", image: image_lenovo },
  ]);
};
