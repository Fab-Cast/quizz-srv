var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");



router.post('/signup', function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            msg: 'Please pass username and password.'
        });
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            group: req.body.group,
        });
        newUser.save(function (err) {
            if (err) {
                return res.status(409).send({
                    success: false,
                    msg: 'username already exists.'
                });
            }
            res.send({
                success: true,
                msg: 'Successful created new user.',
                createdUser: newUser
            });
        });
    }
});

router.post('/signin', function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({
                success: false,
                msg: 'Authentication failed. User not found.'
            });
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 50000 
                    });
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: user
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            });
        }
    });
});


router.post('/signout', function (req, res) {

    req.logout();
    res.json({
        success: true,
        msg: 'Sign out successfully.'
    });

});


module.exports = router;