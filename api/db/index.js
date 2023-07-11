const Sequelize = require("sequelize");
require("dotenv").config();

const url = process.env.DB_URL;

const db = new Sequelize(url, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: true,
    native: true,
  },
  logging: false,
});

module.exports = db;
