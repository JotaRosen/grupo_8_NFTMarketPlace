const products = require('../models/product');
const userArtists = require('../models/userArtists');
module.exports = {
    index: (req,res) => res.render('market', {product: products.all()}),

    productDetail: (req,res) => {
        let rawId = req.params.id;
        product = products.one(rawId);
        res.render('productDetail', {
            product: product,
            author: userArtists.one(product.authorName),
            otherJobs: products.allFromOneAuthor(product.authorId,rawId)
        })
    },
    save: (req,res) => {
        let result = products.newProd(req.session.user,req.body,req.file);
        return result == true ? res.redirect("/profile") : res.send("Error: could not create item ") 
    },
    update: (req,res) =>{
        let result = products.edit(req.body,req.file,req.params.id)
        return result == true ? res.redirect("/profile") : res.send("Error: could not create item") 
    },

    delete: (req,res) =>{
        let result = products.delete(req.params.id);
        return result == true ? res.redirect("/profile") : res.send("Error: could not found data ") 
    }

}