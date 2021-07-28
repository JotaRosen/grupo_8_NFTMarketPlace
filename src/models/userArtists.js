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

    },
    likeAnItem: function(userId,itemId){
        let user = this.one(userId);    
        user.likeProds.push(itemId);
        return true;
    },

    unlikeAnItem: function(userName,itemId){
        const directory = path.resolve(__dirname,"../data","userArtists.json")
        let usersArray = this.all();

        let user = this.one(userName);
        let result = user.likedProds.filter(item => item != itemId);

        let indexToUpdate = usersArray.findIndex( userToUpdate => userToUpdate.authorId == user.authorId )
        usersArray[indexToUpdate].likedProds = result;

        fs.writeFileSync(directory,JSON.stringify(usersArray,null,2));
        return true;
    }


}

module.exports = model;
