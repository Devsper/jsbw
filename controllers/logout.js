const express = require('express');
const router = express.Router();

// GET /logout
router.get('/', function(req, res, next) {

    if (req.session) {

        // delete session object
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