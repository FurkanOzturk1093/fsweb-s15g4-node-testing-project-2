/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  const all = knex.schema.createTable("watch_brands", (t) => {
    t.increments("watch_id"),
      t.string("watch_name").notNullable().unique(),
      t.integer("watch_price").unsigned();
  });
  return all;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("watch_brands");
};
