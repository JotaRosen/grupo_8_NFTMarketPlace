//add here user model when ready
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
 
const db = require('../database/models/index');
const {Product, User} = db


const { validationResult } = require('express-validator');


module.exports = {
    login: async (req,res) =>{
        try{
            if(req.session.user){
                let user = await User.findOne({
                    where:{
                        userId: req.session.user.userId
                    }});
                let productsFromUser = await user.getOwned_prods();
                let sessionData = {
                    user: req.session.user,
                    collection: productsFromUser,
                    cardStyle: {
                        iconStyle: 'edit',
                        icon: 'pen',
                        method: 'GET'
                    }
                };
                return res.render('profileCollection', sessionData);
            }
            return res.render('login', {errors: undefined});

        } catch(error){
            return res.send('Error catched ' + error);
        }
    },


    register: (req,res) => res.render('register', {errors: undefined}),
    resetPass: (req,res) => res.render('resetPassword'),


    createUser: async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.render("register",{ errors: errors,title:"Join",old:req.body });
        }else{
            try{
                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    username: (req.body.username) ? req.body.username: String(data.email).trim()
                    .replace(/\s/g, "")
                    .split("@")[0]
                    .toLowerCase(),
                    password: bcrypt.hashSync(req.body.password,10)
                })
                return res.redirect("login");
            }
            catch(error){
                return res.send('Error catched ' + error);
            }
        }
        
      },

    access: async (req,res) => {
        try{
            const errors = validationResult(req);
        // checks req is a valid req 

            if (!errors.isEmpty()) {
                //errors is a promise and is being set from loginValidator Middleware
                console.log(errors)
                return res.render("login",{ errors: errors,title:"Access", old:req.body });
            }else{
                let user = await User.findOne(
                    {
                        where:{
                            email: req.body.email 
                        }
                });
                if(req.body.stayLogged == 'on'){
                //setting cookie value, and time duration
                res.cookie("email",req.body.email,{maxAge:300000})
                }
            req.session.user = user;
            return res.redirect("/market")
            }

        }catch (error){
            return res.send('Error catched ' + error);
        }
      },

      logout: (req,res) => {
        //res.cookie("email",req.session.user.email,{maxAge:0})
        delete req.session.user;
        return res.redirect("/")
      },

    userProfile: async (req,res) =>{ 
        try{
            let actualUser = await User.findOne({
                where:{
                    userId: req.session.user.userId
                }});
            let productsFromUser = await actualUser.getOwned_prods();
        
            return res.render('profileCollection',{
                user: actualUser,
                collection: productsFromUser,
                cardStyle: {
                    iconStyle: 'edit',
                    icon: 'pen',
                    method: 'GET'
                } 
        })

        }catch (error) {
            return res.send('Error catched ' + error);
        }
    },
    userCreate: (req,res) => res.render('profileCreate'),

    userFavs: async (req,res) => {
        try{
            let user = await User.findByPk(req.session.user.userId);
            let userLikedNfts = await user.getFavorites();

            return res.render('profileFavs', {
                userLikes: userLikedNfts,
                cardStyle: {
                    iconStyle: 'remove',
                    icon: 'trash',
                    method: 'PUT'
                } 
            });

        } catch (error) {
            return res.send('Error catched ' + error);
        }
    },

    userFavsErase: async (req,res) => {
        try{
            let rawItemId = req.params.id;
            let nftToUnlike = await Product.findByPk(rawItemId);
            let user = await User.findByPk(req.session.user.userId);
            await user.removeFavorites(nftToUnlike);
            return res.redirect("/profile/Favs");
        }catch (error) {
            return res.send('Error catched ' + error);
        }
    },

    userAddtoFavs: async (req,res) =>{
        let userSession = req.session.user;
        if(!userSession){
            return res.redirect('/login');
        }

        try{
            let rawItemId = req.params.id;
            let nftTolike = await Product.findByPk(rawItemId);
            let user = await User.findByPk(req.session.user.userId);
            await user.addFavorites(nftTolike);
            return res.redirect("/profile/Favs");
        }catch (error) {
            return res.send('Error catched ' + error);
        }
        //return res.redirect("/productDetail/" + rawItemId);

    },
    userEdit: async (req,res) => {
        try{
            let rawId = req.params.id;
            let product = await Product.findByPk(rawId, {include: ['Owner']});
        
            return res.render('itemEdit', {
                item: product,
                author: product.Owner[0]
            });
        } catch(error){
            res.send('Error catched ' + error);
        }
    },
    userSettings: (req,res) => res.render('profileSettings' , {userArtists: req.session.user}),

    userSettingsEdit: async (req,res) =>{
        try{

            const errors  = validationResult(req);

            if(errors.isEmpty()){
                let userToBeUpdate = await User.findByPk(req.session.user.userId);

                userToBeUpdate.name = (req.body.name) ? req.body.name:userToBeUpdate.name;
                userToBeUpdate.username = (req.body.username) ? req.body.username:userToBeUpdate.username;
                userToBeUpdate.description = (req.body.description) ? req.body.description:userToBeUpdate.description;

                if((req.file != undefined) && (userToBeUpdate.profile_pic != null)){
                    let imageToErase = userToBeUpdate.profile_pic;
                    fs.unlinkSync(path.resolve(__dirname,"../../public/img/usersProfile",imageToErase));
                    userToBeUpdate.profile_pic = req.file.filename;
                }

                await userToBeUpdate.save();

                return res.redirect("/profile");

            }else{
                console.log(errors);
                return res.send(errors);
            }
        }catch(error){
            res.send('Error catched ' + error);
        }    

    }

    //TODO delete user
}