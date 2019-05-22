var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Code runs on POST-request on url '/login'
router.post('/', function (req, res, next) {
        
        // Checks email and password is sent
        if(req.body.logEmail && req.body.logPassword){

            // Authenticates user
            User.authenticate(req.body.logEmail, req.body.logPassword, function (error, user){
                if(error || !user){
                   var err = new Error("Wrong email or password");
                   err.status = 401;
                   return next(err);
                }else{
                    // At success send back user values
                    req.session.usedId = user._id;
                    res.json({success: true, username: user.username, userId: user._id});
                }
            });
        }else{
            var err = new Error('Email and password are required');
            err.status = 401;
            return next(err);
        }
    });

module.exports = router; 