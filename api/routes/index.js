const express = require("express");

const router = express.Router();

const Users = require("../models");

const { validateAuth } = require("../middlewares/auth");

const { generateToken, validateToken } = require("../config");

const Sequelize = require("sequelize");

router.get("/users/:userSearched", (req, res) => {
  const { userSearched } = req.params;
  Users.findAll({
    where: {
      user: {
        [Sequelize.Op.substring]: userSearched,
      },
    },
  }).then((user) => {
    res.send(user.map((user) => user.dataValues.user));
  });
});

router.post("/signup", (req, res) => {
  const { email } = req.body;

  Users.findOrCreate({ where: { email }, defaults: req.body }).then((user) => {
    res.status(201).send(user[0].dataValues);
  });
});

router.get("/userfavorites/:username", (req, res) => {
  const user = req.params.username;
  Users.findOne({ where: { user } })
    .then((result) => res.send(result.dataValues.favorites))
    .catch((error) => console.log(error));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        email: user.email,
        name: user.name,
        user: user.user,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      const userFront = payload;
      user.favorites
        ? (userFront.favorites = user.favorites)
        : (user.favorites = []);

      res.status(200).send({ userFront, token });
    });
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");

  console.log("User logged out");
  res.sendStatus(204);
});

router.post("/secret", validateAuth, (req, res) => {
  res.send(req.user);
});

router.post("/me", validateAuth, (req, res) => {
  const userFront = req.user;
  const { email } = req.user;

  console.log("req.user", req.user);

  Users.findOne({ where: { email } })
    .then((user) => {
      user.favorites
        ? (userFront.favorites = user.favorites)
        : (user.favorites = []);
      res.send(userFront);
    })
    .catch((error) => console.log(error));
});

router.put("/addtofavorites", (req, res) => {
  const { favorites, email } = req.body;
  if (req.body.email) {
    Users.update({ favorites }, { where: { email }, returning: true })
      .then(([affectedRows, updated]) => {
        const user = updated[0];
        res.send(user);
      })
      .catch((error) => console.log(error));
  }
});

module.exports = router;
