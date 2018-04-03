const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
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


  UserSchema.statics.authenticate = function(email, password, callback){

    User.findOne({ email: email})
      .exec(function (error, user){
        if(error){
          return callback(error)
        } else if(!user){
          var err = new Error("User not found");
          err.status = 401;
          return callback(err);
        }
  
        bcrypt.compare(password, user.password, function(error, result){
          if(result == true){
            return callback(null, user);
          }else{
            return callback();
          }
        })
      }); 
  }

var User = module.exports = mongoose.model('User', UserSchema, 'users');

module.exports = User;

module.exports.addUser = function(newUser, callback){

    newUser.save(callback); 
}

module.exports.getUser = function(id, callback){
    
  let query = {_id: id};
  User.find(query, callback);
}

module.exports.comparePassword = function(candidatePw, hash, callback){
  
  bcrypt.compare(password, hash, function (err, result) {

    if(result === true) {
      return callback(null, user);
    } else {
      return callback();
    }
  })
}
