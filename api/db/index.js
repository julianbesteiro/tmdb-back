const Sequelize = require("sequelize");
require("dotenv").config();

const url = process.env.DB_URL;

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
