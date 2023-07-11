const Sequelize = require("sequelize");
require("dotenv").config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const name = process.env.DB_NAME;
const url = process.env.DB_URL;

const db = new Sequelize(name, username, password, {
  host: url,
  dialect: "postgres",
  logging: false,
});

module.exports = db;
