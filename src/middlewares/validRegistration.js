const { body } = require("express-validator");
const db = require("../database/models/index");
const { User } = db;
module.exports = [
  body("email").isEmail().custom((value, { req }) => {
    if(value != req.body.emailConfirmed){
        return Promise.reject('E-mails did not match');
    }
    let registered = User.findOne({where:{email: value}});
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