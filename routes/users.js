var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var toolBox = require("../toolBox")

router.get('/', toolBox.needsGroup('admin'), function(req, res) {
  var token = toolBox.getToken(req.headers);
  if (token) {
    User.find(function (err, users) {
      if (err) return next(err);
      res.json(users);
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
});

router.delete('/:id', toolBox.needsGroup('admin'), function(req, res) {
  var token = toolBox.getToken(req.headers);
  if (token) {
    User.findOneAndRemove({
      _id: req.params.id
    }, function (err, user) {
      if (err) return next(err);
      res.json(user);
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
});

module.exports = router;