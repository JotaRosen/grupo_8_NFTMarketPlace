//add here user model when ready
const userArtists = require('../models/userArtists');


module.exports = {
    login: (req,res) => res.render('login'),
    register: (req,res) => res.render('register'),
    resetPass: (req,res) => res.render('resetPassword'),
    userProfile: (req,res) => res.render('profileCollection'),
    userCreate: (req,res) => res.render('profileCreate'),
    userFavs: (req,res) => res.render('profileFavs'),
    userEdit: (req,res) => {
        //hardcoing for mockup purposes. Real data will be incoming from a post http method
        res.render('itemEdit', {
            item: userArtists.findItem('Author Name',1),
            author: userArtists.one('Author Name')
        })
    }
}