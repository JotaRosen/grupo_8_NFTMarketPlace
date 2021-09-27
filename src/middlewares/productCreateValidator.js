const { body } = require("express-validator");
const db = require("../database/models/index");
const { Product } = db;
module.exports = [
body("name").isLength({ min: 5})/*.custom( async (value, { req }) => {
    //name must not be empty (even though this is already validated in the front end)
    if (!value){
      return Promise.reject("Name can't be empty");
    } 
    return true

  })*/,
 body("price").custom( async (value) => {
    if(value < 0.00000001)
        return Promise.reject('Value cannot be smaller than minimum fee');
    
    return true;
}),
body("description").isLength({min: 20}),
body('create_image').custom( async (value) => {
    let fileExtension = value.split('.').pop().toUpperCase();

    console.log(value);

    let extensionArray = ['JPG', 'JPEG', 'PNG', 'GIF','WAV','JFIF','MP3', 'MP$'] //nfts can be many media files

    let found = extensionArray.find( element => element == fileExtension);

    if(found == undefined){
        return Promise.reject('Invalid file type')
    }

    return true;
})
]