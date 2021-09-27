const { body } = require("express-validator");
const db = require("../database/models/index");
const { User } = db;
module.exports = [
  body("email").isEmail().custom( async (value, { req }) => {
    if(value != req.body.emailConfirmed){
        return Promise.reject('E-mails did not match');
    }
    let registered = await User.findOne({where:{email: value}});
    if (registered) {
      return Promise.reject('E-mail already exists');
    }
    return true
  }),
  body("password").isLength({ min: 8 }).custom( async (value, { req })  => {
    if(value != req.body.passwordConfirmed){
        return Promise.reject('Passwords did not match');
    }
    regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if(!regex.test(value)){
      return Promise.reject('password must contain at least one special charcter, number & caps');
    }

    return true
  }),

  body("name").isLength({ min: 4}).custom( async (value, { req }) => {
    // A name should only have alphabet chars
    // handling special chars is hard because of names likes o'brian
    if (/\d+/.test(value)){
      return Promise.reject("Real name shouldn't contain numbers");
    } 
    return true

  })/*,
  body('create_image').custom( async (value) => {
    let fileExtension = value.split('.').pop().toUpperCase();

    console.log(value);

    let extensionArray = ['JPG', 'JPEG', 'PNG', 'GIF','JFIF'] 

    let found = extensionArray.find( element => element == fileExtension);

    if(found == undefined){
        return Promise.reject('Invalid file type')
    }

    return true;
})*/
]