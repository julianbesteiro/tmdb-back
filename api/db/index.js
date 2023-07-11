const Sequelize = require("sequelize");
require("dotenv").config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const hostname = process.env.DB_HOSTNAME;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;
const url = process.env.DB_INTERNAL_URL;

const db = new Sequelize(
  `postgres://${username}:${password}@${hostname}.oregon-postgres.render.com:${port}/${name}`,
  {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: true,
      native: true,
    },
    logging: false,
  }
);

module.exports = db;
