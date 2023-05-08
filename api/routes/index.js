const express = require("express");

const router = express.Router();

const Users = require("../models");

const { validateAuth } = require("../middlewares/auth");

const { generateToken, validateToken } = require("../config");

router.get("/", (req, res) => {
  res.send("hola");
});

router.post("/signup", (req, res) => {
  Users.create(req.body).then((user) => {
    res.status(201).send(user);
  });
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
        favorites: user.favorites,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.status(200).send(payload);
    });
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");

  console.log("Logged out");
  res.sendStatus(204);
});

router.get("/secret", validateAuth, (req, res) => {
  res.send(req.user);
});

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

router.put("/addtofavorites", (req, res) => {
  const { favorites, email } = req.body;
  Users.update({ favorites }, { where: { email }, returning: true })
    .then(([affectedRows, updated]) => {
      const user = updated[0];
      res.send(user);
    })
    .catch((error) => console.log(error));
});

router.put("/removefromfavorites", (req, res) => {
  Users.update(req.body, { where: { email: req.body.email }, returning: true })
    .then(([affectedRows, updated]) => {
      const user = updated[0];
      res.send(user);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
