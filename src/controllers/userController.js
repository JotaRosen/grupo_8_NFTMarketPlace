//add here user model when ready
const userArtists = require('../models/userArtists');
const products = require('../models/product');


module.exports = {
    login: (req,res) => res.render('login'),
    register: (req,res) => res.render('register'),
    resetPass: (req,res) => res.render('resetPassword'),
    userProfile: (req,res) =>{ 
        let userSession = userArtists.one('Author harcodeado');
        //will obtain user id from session, now is harcoded
        res.render('profileCollection',{
            user: userSession,
            collection: products.allFromOneAuthor(userSession.authorId),
            cardStyle: {
                iconStyle: 'edit',
                icon: 'pen',
                method: 'GET'
            } 
    })
    },
    userCreate: (req,res) => res.render('profileCreate'),

    userFavs: (req,res) => {
        //will obtain user id from session, now is harcoded
        let someUser = userArtists.one('Author harcodeado');
        res.render('profileFavs', {
            userLikes: products.filterLikedItems(someUser.likedProds),
            cardStyle: {
                iconStyle: 'remove',
                icon: 'trash',
                method: 'PUT'
            } 
        });
    },

    userFavsErase: (req,res) => {
        //will obtain user id from session, now is harcoded
        let rawItemId = req.params.id
        let result = userArtists.unlikeAnItem('Author harcodeado',rawItemId);

        return result == true ? res.redirect("/profile/Favs") : res.send("Error: no data to unlike ");
        

    },
    userEdit: (req,res) => {
        let rawId = req.params.id;
        product = products.one(rawId);
        //hardcoing for mockup purposes. Real data will be incoming from a post http method
        res.render('itemEdit', {
            item: products.one(rawId),
            author: userArtists.one(product.author)
        })
    }
}