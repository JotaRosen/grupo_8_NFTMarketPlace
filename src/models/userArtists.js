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

    ///Must be something as templates. 3 functions with the same behaviour
    one: function (authorName) { 
        let authorArray = this.all();
        let result = authorArray.find( author => author.authorName == authorName);

        return result;
    },

    oneById: function (authorId) { 
        let authorArray = this.all();
        let result = authorArray.find( author => author.authorId == authorId);

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
      editUser: function(data, file, id){
        const directory = path.resolve(__dirname,"../data","userArtists.json")
        let users = this.all();
        let updated = this.oneById(id);
        let newImage = updated.authorProfilePic;
        // we erase the old image, to reupload the same, or a new one. 
        if(file != undefined){
            if(updated.authorProfilePic != null){
                fs.unlinkSync(path.resolve(__dirname,"../../public/img/usersProfile/",updated.authorProfilePic))
            }
            newImage = file.filename
        }
        users.map(user => {
            if(user.authorId == updated.authorId){
                user.authorName = data.create_title,
                user.description = data.create_description,
                user.authorProfilePic = newImage
                return user
            }
            return user
        });
    
        fs.writeFileSync(directory,JSON.stringify(users,null,2));
        return this.oneById(id);
    },

    findItem: function (authorName, itemId){
        let author = this.one(authorName);
        let item = author.authorCollection.find(item => item.id == itemId);
        return item;

    },
    likeAnItem: function(userId,itemId){
        const directory = this.dir;
        let usersArray = this.all();


        let user = this.oneById(userId); 
        if((user.likedProds.find( item => item == itemId))){
            //if already liked
            return true
        }
        user.likedProds.push(itemId);
        
        let indexToUpdate = usersArray.findIndex( userToUpdate => userToUpdate.authorId == user.authorId )
        usersArray[indexToUpdate] = user;

        fs.writeFileSync(directory,JSON.stringify(usersArray,null,2));
        return user;
    },

    unlikeAnItem: function(userId,itemId){
        const directory = this.dir;
        let usersArray = this.all();

        let user = this.oneById(userId);
        let result = user.likedProds.filter(item => item != itemId);

        let indexToUpdate = usersArray.findIndex( userToUpdate => userToUpdate.authorId == user.authorId )
        usersArray[indexToUpdate].likedProds = result;

        fs.writeFileSync(directory,JSON.stringify(usersArray,null,2));
        return result;
    }

}

module.exports = model;
