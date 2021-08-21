const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
 
const model = {
    dir: path.resolve(__dirname,"../data","userArtists.json"),
    
    all: function() {
        const directory = this.dir;
        const file = fs.readFileSync(directory,"utf-8")
        const userArray = JSON.parse(file)
        //userArray will be all our users in our database.
        return userArray
    },
    one: function (authorName) { 
        let authorArray = this.all();
        let result = authorArray.find( author => author.authorName == authorName);

        return result;
    },
    oneByEmail: function(authorEmail){
        let authorArray = this.all();
        let result = authorArray.find( author => author.authorEmail == authorEmail);

        return result;

    },
    createAccount: function(data){
        let users = this.all();
        let lastUser = users[users.length -1]
        let newUser = {
          authorName: data.name ? data.name : String(data.email).trim()
        .replace(/\s/g, "")
        .split("@")[0]
        .toLowerCase(),
          authorId: users.length > 0 ? lastUser.authorId +1 : 1, 
          authorUsername: String(data.username),
          authorEmail: String(data.email),
          description: null,
          authorPassword: bcrypt.hashSync(data.password,10),
          authorProfilePic: null,
          likedProds: []
        };
        users.push(newUser);
        fs.writeFileSync(this.dir,JSON.stringify(users,null,2));
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
        const directory = this.dir;
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
