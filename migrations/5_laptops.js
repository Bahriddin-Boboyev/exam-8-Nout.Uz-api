/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("laptops", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
    table.text("description").notNullable();
    table.string("image", 400).notNullable();
    table.decimal("price", 15, 3).notNullable();
    table
      .integer("brand_id")
      .references("id")
      .inTable("brands")
      .onDelete("CASCADE");
    table
      .integer("model_id")
      .references("id")
      .inTable("models")
      .onDelete("CASCADE");
    table
      .integer("category_id")
      .references("id")
      .inTable("categorys")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("laptops");
};
