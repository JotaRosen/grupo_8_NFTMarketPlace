const products = require('../models/product');

module.exports = {
    show: (req,res) => res.render("home", {products: products.random()})
}