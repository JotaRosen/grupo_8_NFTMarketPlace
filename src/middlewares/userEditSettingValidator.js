const { body } = require("express-validator");
const db = require("../database/models/index");
module.exports = [
body('create_image').custom( async (value, {req}) => {   

    value  = req.file.filename;
    let fileExtension = value.split('.').pop().toUpperCase();

    console.log(value);

    let extensionArray = ['JPG', 'JPEG', 'PNG', 'GIF','JFIF'] 

    let found = extensionArray.find( element => element == fileExtension);

    if(found == undefined){
        return Promise.reject('Invalid file type')
    }

    return true;
})
]