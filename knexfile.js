// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const sharedConfig = {
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3",
  },
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
  useNullAsDefault: true,
};
module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: "./data/schemes.db3" },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: "./data/testing.db3" },
  },
};
