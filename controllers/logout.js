const express = require('express');
const router = express.Router();

// Code runs on GET-request on url '/logout'
router.get('/', function(req, res, next) {

    if (req.session) {

      // Delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {

          console.log("User successfully logged out");
          res.json({success: true});
        }
      });
    }

  });

  module.exports = router; 