var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var toolBox = require("../toolBox")

router.get('/', function(req, res) {

  
  let token = toolBox.getToken(req.headers);
  let userGroup = jwt.decode(token, {complete: true}).payload.group
  let groupsAllowed = ['admin', 'developper']

  if (toolBox.needsGroup(userGroup, groupsAllowed)) {
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

router.delete('/:id', function(req, res) {

  let token = toolBox.getToken(req.headers);
  let userGroup = jwt.decode(token, {complete: true}).payload.group
  let groupsAllowed = ['admin']

  if (toolBox.needsGroup(userGroup, groupsAllowed)) {
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