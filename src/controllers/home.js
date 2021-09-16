const db = require('../database/models/index');
const {Product} = db;

module.exports = {
    show: async (req,res) =>{
        try {
            //const user = await User.findByPk(1],{include: ['Favorites']}  );
            //const user = await User.findByPk(1,{include: ['Owned_prods']}  );
            //const user = await Product.findByPk(1,{include: ['Likers']});
            const nfts = await Product.findAll();
            
            return res.render("home", {products: nfts[(Math.round(Math.floor(Math.random()*nfts.length)))]});
        } catch (error) {
            return res.send('Error catched:' + error);
        }
    }
    
    /*(req,res) => {
        return User.findAll({
            include: [Products]
        }).then(data => res.send(data)).catch( error => res.send(error)); //res.render("home", {products: Products.random()})
    }*/
}