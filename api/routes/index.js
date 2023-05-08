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
  console.log("REQ USER", req.user);
  res.send(req.user);
});

router.put("/add_favorite", (req, res) => {
  res.send("hola");
});

router.put("/remove_favorite", (req, res) => {
  res.send("hola");
});

module.exports = router;
