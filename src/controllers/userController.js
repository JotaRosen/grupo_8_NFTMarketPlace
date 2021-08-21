//add here user model when ready
const userArtists = require('../models/userArtists');
const products = require('../models/product');
const { validationResult } = require('express-validator');



module.exports = {
    login: (req,res) =>{
        if(req.session.user){
            let sessionData = {
                user: req.session.user,
                collection: products.allFromOneAuthor(req.session.user.authorId),
                cardStyle: {
                    iconStyle: 'edit',
                    icon: 'pen',
                    method: 'GET'
                }
            };
            return res.render('profileCollection', sessionData);
        }
        return res.render('login', {errors: undefined});
    },


    register: (req,res) => res.render('register', {errors: undefined}),
    resetPass: (req,res) => res.render('resetPassword'),


    createUser: (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.render("register",{ errors: errors,title:"Join",old:req.body });
        }else{
            userArtists.createAccount(req.body);
          return res.redirect("login");
        }
        
      },

    access: (req,res) => {
    
        const errors = validationResult(req);
        // checks req is a valid req 

        if (!errors.isEmpty()) {
            //errors is a promise and is being set from loginValidator Middleware
          return res.render("login",{ errors: errors,title:"Access", old:req.body });
        }else{
          let user = userArtists.oneByEmail(req.body.email);
          if(req.body.remember){
              //setting cookie value, and time duration
            res.cookie("email",req.body.email,{maxAge:300000})
          }
          req.session.user = user;
          return res.redirect("market")
        }
      },

    userProfile: (req,res) =>{ 
        let userSession = req.session.user;
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