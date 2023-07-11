const Sequelize = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class Users extends Sequelize.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

Users.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    surname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    favorites: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    salt: {
      type: Sequelize.STRING,
    },
  },

  { sequelize: db, modelName: "user" }
);

Users.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();
  user.salt = salt;
  return user.hash(user.password, salt).then((hash) => (user.password = hash));
});

module.exports = Users;
