const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require("../models");
const { SECRET_KEY } = process.env;

module.exports = {
  register: function(req, res) {
    let hash = "";
    let username = req.body.username;
    if (req.body.password !== "") {
      let salt = bcrypt.genSaltSync(7);
      hash = bcrypt.hashSync(req.body.password, salt);
    }
    let payload = {
      username,
      password: hash,
      name: req.body.name
    };
    user.findOne({ username }).then(found => {
      if (found) {
        res
          .status(400)
          .json({
            err: { message: "Username is used, please pick another username" }
          });
      } else {
        user
          .create(payload)
          .then(newUser => {
            let username = newUser.username;
            let userId = newUser._id;
            let token = jwt.sign({ username, userId }, SECRET_KEY);
            res.status(201).json({
              msg: "Successfully register new user",
              token,
              username
            });
          })
          .catch(err => {
            res.status(400).json(err);
          });
      }
    });
  },
  login: function(req, res) {
    let username = req.body.username;
    let userId = req.body.id;
    let token = jwt.sign({ username, userId }, SECRET_KEY);
    res.status(200).json({
      message: "Successfully login",
      token,
      username
    });
  }
};
