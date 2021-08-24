const { body } = require("express-validator");
const bcrypt = require("bcrypt");
const userModel = require("../models/userArtists");
module.exports = [
  body("email").isEmail().custom(value => {
    let registered = userModel.oneByEmail(value);
    if (!registered) {
      return Promise.reject('E-mail no found');
    }
    return true
  }),
  body("password").isLength({ min: 8 }).custom((value, { req }) => {

    let registered = userModel.oneByEmail(req.body.email);

    if (bcrypt.compareSync(value, registered.authorPassword) != true) {
      return Promise.reject('Wrong Password');
    }

    return true;
  })
]