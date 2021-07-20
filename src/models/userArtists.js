const path = require('path');
const fs = require('fs');

const model = {
    all: function() {
        const directory = path.resolve(__dirname,"../data","userArtists.json")
        const file = fs.readFileSync(directory,"utf-8")
        const userArray = JSON.parse(file)
        //userArray will be all our users in our database.
        return userArray
    },
    one: function (authorName) { 
        let authorArray = this.all();
        let result = authorArray.find( author => author.authorName == authorName)
        return result;
    },
    findItem: function (authorName, itemId){
        let author = this.one(authorName);
        let item = author.authorCollection.find(item => item.id == itemId);
        return item;

    }

}

module.exports = model;
