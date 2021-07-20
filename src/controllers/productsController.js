const products = require('../models/product');
const userArtists = require('../models/userArtists');
module.exports = {
    index: (req,res) => res.render('market', {product: products.all()}),

    productDetail: (req,res) => {
        let rawId = req.params.id;
        product = products.one(rawId);
        res.render('productDetail', {
            product: product,
            author: userArtists.one(product.author)
        })
    }
}