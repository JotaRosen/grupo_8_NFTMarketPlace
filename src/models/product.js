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

    },
    
    allFromOneAuthor: function(authorId,itemId){
        let products = this.all();
        let result = products.filter(product => product.authorId == authorId).filter( item => item.id != itemId);
        //returns all the jobs from one artist except for the one that is actually shown on the prodDetail page
        return result;

    },

    random: function(){
        let products = this.all();
        let randomItem = products[(Math.round(Math.floor(Math.random()*products.length)))]
        return randomItem;
    },

    filterLikedItems: function(likedItems){
        let products = this.all();
        let result = []
        likedItems.forEach( element =>{
            result.push(products.find( item => item.id == element));
        });
        return result
    },

    //CRUD Methods

    newProd: function(data,file){
        const directory = path.resolve(__dirname,"../data","products.json")
        let products = this.all();
        let newProduct = {
            id: products.length > 0 ? products[products.length -1].id + 1: 1,
            image: file.filename,
            price: data.create_price,
            author: 'Author harcodeado',
            authorId: 2,
            pieceName: data.create_title,
            description: data.create_description
        }    
        //author and authorId are harcoded for now.
        //both of them will be taken from cookies and sessions
        products.push(newProduct)
        fs.writeFileSync(directory,JSON.stringify(products,null,2));
        return true;    

    },

    edit: function(data, file, id){
        const directory = path.resolve(__dirname,"../data","products.json")
        let products = this.all();
        let updated = this.one(id);
        let newImage = updated.image;
        // we erase the old image, to reupload the same, or a new one. 
        if(file != undefined){
            fs.unlinkSync(path.resolve(__dirname,"../../public/tmp/uploads/",updated.image))
            newImage = file.filename
        }
        products.map(product => {
            if(product.id == id ){
                product.pieceName = data.create_title,
                product.price = data.create_price,
                product.description = data.create_description,
                product.image = newImage
                return product
            }
            return product
        })
        fs.writeFileSync(directory,JSON.stringify(products,null,2));
        return true;
    },

    delete: function(id){
        const directory = path.resolve(__dirname,"../data","products.json")
        let products = this.all();
        let deleted = this.one(id);
        // deleting image form uploads folder
        fs.unlinkSync(path.resolve(__dirname,"../../public/tmp/uploads/",deleted.image))
        // filtering the product
        let filteredProductsList = products.filter(product => product.id != deleted.id).map( item => {
            if(item.id > deleted.id){
                item.id --;
            }
            return item;
        });

        fs.writeFileSync(directory,JSON.stringify(filteredProductsList,null,2));
        return true;
    }

    // update, methods (only products) will go here.
}

module.exports = model;
