const { body } = require("express-validator");
const bcrypt = require("bcrypt");
const db = require("../database/models/index");
const { User } = db;
module.exports = [
  body("email").isEmail().custom(async (value) => {
    let registered = await User.findOne({where:{email: value}});
    if (!registered) {
      return Promise.reject('E-mail no found');
    }
    return true
  }),
  body("password").isLength({ min: 8 }).custom(async (value, { req }) => {

    let registered = await User.findOne({where:{email: req.body.email}});

    if (bcrypt.compareSync(value, registered.password) != true) {
      return Promise.reject('Wrong Password');
    }

    return true;
  })
]