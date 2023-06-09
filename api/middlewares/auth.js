const { validateToken } = require("../config");

function validateAuth(req, res, next) {
  //const token = req.cookies.token;

  const token = req.body.token;
  console.log("token", token);
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  req.user = user;

  next();
}

module.exports = { validateAuth };
