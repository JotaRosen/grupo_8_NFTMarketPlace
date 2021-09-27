
const path = require('path');
const fs = require('fs');
const db = require('../database/models/index');
const { validationResult } = require('express-validator');
const {Product, User} = db

module.exports = {
    index: async (req,res) => {
        try{
            let products = await Product.findAll();
            return res.render('market',{products: products});

        }catch(error){
            return res.send('Error catched ' + error);
        }
        //return Product.findAll().then(data => res.send(data)).catch( error => res.send(error));
    },

    productDetail: async (req,res) => {
        try{
            let rawId = req.params.id;
            // There is, forsure, a better query than this one
            let product = await Product.findByPk(rawId, {include: ['Owner']});
            let ownerId = product.Owner[0].nft_colections.ownerId;
            let user = await User.findOne({
                    where:{
                        userId:ownerId
                    }});
            let productsFromUser = await user.getOwned_prods();
            return res.render('productDetail', {
                product: product,
                author: product.Owner[0].name,
                otherJobs: productsFromUser
            })
        } catch(error){
            return res.send('Error catched' + error);
        }
    },
    save: async (req,res) => {
        try{
            const errors = validationResult(req);
            if(errors.isEmpty()){

                let newNft = await Product.create({
                    image: req.file.filename,
                    price: req.body.price,
                    pieceName: req.body.name,
                    description: req.body.description
                });
                //userId will be obtain from session different from prodId
                let actualUser = await User.findByPk(req.session.user.userId);
                await newNft.addOwner(actualUser);

                return res.redirect('/profile');
            } else {
                console.log(errors)
                res.redirect('/profile/Create');
            }
        } catch (error){
            return res.send('Error cathced ' + error);
        }
    },
    update: async (req,res) =>{
        try{
            let productToBeUpdate = await Product.findByPk(req.params.id);

            //updating

            console.log(req.body);

            let imageToErase = productToBeUpdate.image
            productToBeUpdate.image = (req.create_image) ? req.create_image.filename:productToBeUpdate.image;
            productToBeUpdate.price = (req.body.price) ? req.body.price:productToBeUpdate.price;
            productToBeUpdate.pieceName = (req.body.name) ? req.body.name:productToBeUpdate.pieceName;
            productToBeUpdate.description = (req.body.description) ? req.body.description:productToBeUpdate.description;

            if(req.create_image != undefined){
                fs.unlinkSync(path.resolve(__dirname,"../../public/tmp/uploads/",imageToErase));
            }
    

            await productToBeUpdate.save();
            return res.redirect("/profile");

        } catch(error){
            return res.send('Error catched ' + error);
        }
    },

    delete: async (req,res) =>{
        //req.params.id this is the product Id
        try{
            let productToBeDestroy = await Product.findByPk(req.params.id);
            let imageToErase =productToBeDestroy.image;
            await productToBeDestroy.destroy();

            if(imageToErase != undefined){
                fs.unlinkSync(path.resolve(__dirname,"../../public/tmp/uploads/",imageToErase));
            }

            return res.redirect("/profile")
        } catch (error){
            return res.send(error);
        }
        //return result == true ? res.redirect("/profile") : res.send("Error: could not found data ") 
    }

}