const { body } = require("express-validator");
const userModel = require("../models/userArtists");
module.exports = [
  body("email").isEmail().custom((value, { req }) => {
    if(value != req.body.emailConfirmed){
        return Promise.reject('E-mails did not match');
    }
    let registered = userModel.oneByEmail(value);
    if (registered) {
      return Promise.reject('E-mail already exists');
    }
    return true
  }),
  body("password").isLength({ min: 8 }).custom( (value, { req })  => {
    if(value != req.body.passwordConfirmed){
        return Promise.reject('Passwords did not match');
    }

    /*if(value.search("/[0-9]/") == -1){
      return Promise.reject('Invalid password. must contain at least one number');
    } */ //TODO

    return true
  })
]