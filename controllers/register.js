const express = require('express');
const router = express.Router();
const User = require('../models/user');

const saltRounds = 10;

//POST HTTP method to /flashcard
router.post('/', function(req,res,next) {

    if (req.body.password !== req.body.passwordConf) {

        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.status(400).json({message: "Passwords do not match"})
        return next(err);
      }
    
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf){

        var userData = new User({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          passwordConf: req.body.passwordConf,
        });

        User.addUser(userData, function(err, user){
            if(err){
                res.json({success: false, message: "Failed to create a new user."});
            }else{
                
                req.session.userId = user._id;
                res.json({success: true, message: "Successful to create a new user."})
            } 
        });
      }else {

        var err = new Error('All fields required.');
        err.status = 400; // Bad request
        return next(err);
  }
});

module.exports = router; 
