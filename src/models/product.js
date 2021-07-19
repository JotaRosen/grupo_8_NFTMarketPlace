const path = require('path');
const fs = require('fs');

const model = {
    all: function() {
        const directory = path.resolve(__dirname,"../data","products.json")
        const file = fs.readFileSync(directory,"utf-8")
        const productsArray = JSON.parse(file)
        //productsArray are all the elements in our database.
        return productsArray
    },
    one: function (id) {
        let products = this.all();
        let result = products.find(product => product.id == id)
        // result contains the specific object we are looking for
        // for the product detail page for example
        return result;
    }

    //create, update, delete methods (only products) will go here.
}

module.exports = model;
