const jwt = require("jsonwebtoken");
const { user } = require("../models");

module.exports = function(req, res, next) {
  let token = req.headers.token;
  if (token) {
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = decoded.userId
    next();
  } else {
    res.status(403).json({
      message: "You aren't logged in, please login for access"
    });
  }
};
