const Sequelize = require("sequelize");
require("dotenv").config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;

// const db = new Sequelize(
//   `postgres://${user}:${password}@${host}.oregon-postgres.render.com:${port}/${name}`,
//   {
//     dialect: "postgres",
//     protocol: "postgres",
//     dialectOptions: {
//       ssl: true,
//       native: true,
//     },
//     logging: false,
//   }
// );

const db = new Sequelize({
  dialect: "postgres",
  host: `${host}.oregon-postgres.render.com`,
  port: port,
  database: name,
  username: user,
  password: password,
  protocol: "postgres",
  dialectOptions: {
    ssl: true,
    native: true,
  },
  logging: false,
});

module.exports = db;
