export {};
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      maxlength: 50
    },
    email: {
      type: String,
      maxlength: 100
    },
    // picture: {
    //   type: String,
    //   maxlength: 500
    // },
    password: {
      type: String,
      maxlength: 8
    },
    favoriteProducts: {
      type: Array,
      default: []
    },
    cart: {
      type: Array,
      default: []
    },


})

// Called before save method on the model
// Turns user entered password into a hash value, with salt
UserSchema.pre('save', function(this: any, next: any,){
  // had to use a regular function ^ to get the correct scope of 'this'.
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err: Error, salt: any) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err: any, hash: any) => {
      if (err) return next(err);
      if(hash) {
        user.password = hash;
        this.password = user.password;
        console.log('Password Hashed');
        console.log(user.password);
        return next();
      }
    })
  })
  })

UserSchema.methods.comparePassword = function(candidatePassword: any, cb: (err: Error | null, isMatch: boolean) => void) {
  bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
    // console.log('Password: ' + candidatePassword);
    // console.log('Hashed Password: ' + this.password);
    // console.log('Passwords Match: ' + isMatch);
    if (err) return cb(null, isMatch);
    cb(null, isMatch);
  })
}


//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
  //get the private key from the config file -> environment variable
  const token = jwt.sign({ _id: this._id }, config.get('myprivatekey')); 
  return token;
}

// exports.validate = validateUser;

const User = mongoose.model('User', UserSchema);
module.exports = User;

// User.watch().on('change', data  =>  {
//   console.log('YO!')
//   console.log(data)
// });