var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();
var User = require("../models/user");
var Quizz = require("../models/quizz");
var toolBox = require("../toolBox")

router.get('/', toolBox.needsGroup('admin'), function(req, res) {
  var token = toolBox.getToken(req.headers);
  if (token) {
    Quizz.find(function (err, quizz) {
      if (err) return next(err);
      res.json(quizz);
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
});
  
router.post('/', function (req, res) {
    var newQuizz = new Quizz({
        title: req.body.title,
        note: req.body.note,
        author: req.body.author,
        questions: req.body.questions,
    });
    newQuizz.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Save quizz failed.'});
        }
        res.json({success: true, msg: 'Successful created new quizz.'});
    });
});

router.delete('/:id', toolBox.needsGroup('admin'), function(req, res) {
  var token = toolBox.getToken(req.headers);
  if (token) {
    Quizz.findOneAndRemove({
      _id: req.params.id
    }, function (err, quizz) {
      if (err) return next(err);
      res.json(quizz);
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
});

module.exports = router;