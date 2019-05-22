const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Mongoose schema for users 
// Creates a structure for a mongo-collection 
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true // Trims whitespaces
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true // Trims whitespaces
  },
  password: {
    type: String, // Hashed password
    required: true,
  },
  passwordConf: {
    type: String, // Password in clear text, only for development
    required: true,
  }
});

// Hashes password before it gets saved in database
UserSchema.pre('save', function (next) {

    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        // Has to return err in next to handle it async 
        return next(err);
      }

      user.password = hash;
      next();
    })
  });

  // Authenticates user at login
  UserSchema.statics.authenticate = function(email, password, callback){

    // Searches for email
    User.findOne({ email: email})
      .exec(function (error, user){
        if(error){
          return callback(error)
        } else if(!user){
          var err = new Error("User not found");
          err.status = 401;
          return callback(err);
        }
        
        // Compares password with stored hashed password
        bcrypt.compare(password, user.password, function(error, result){
          if(result == true){
            // Return user if OK
            return callback(null, user);
          }else{
            return callback();
          }
        })
      }); 
  }

// Exports user model
var User = module.exports = mongoose.model('User', UserSchema, 'users');
module.exports = User;

// Adds user to database
module.exports.addUser = function(newUser, callback){

    newUser.save(callback); 
}

// Fetches user from database
module.exports.getUser = function(id, callback){
    
  let query = {_id: id};
  User.find(query, callback);
}
