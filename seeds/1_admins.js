const bcrypt = require("bcrypt");
const config = require("../src/config");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const hashPassword = await bcrypt.hash("12345", 10);
  const image_name = `http://localhost:${config.port}/images/admin.png`;
  // Deletes ALL existing entries
  await knex("admins").del();
  await knex("admins").insert([
    {
      name: "Bahriddin",
      email: "bahriddin@gmail.com",
      password: hashPassword,
      image: image_name,
    },
  ]);
};
