/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("watch_brands")
    .truncate()
    .then(function () {
      return knex("watch_brands").insert([
        {
          watch_name: "Rolex",
          watch_price: 9000,
        },
        {
          watch_name: "Patek Philippe",
          watch_price: 12000,
        },
      ]);
    });
};
