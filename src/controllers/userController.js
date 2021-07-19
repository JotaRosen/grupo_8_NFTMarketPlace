//add here user model when ready

module.exports = {
    login: (req,res) => res.render('login'),
    register: (req,res) => res.render('register'),
    resetPass: (req,res) => res.render('resetPassword'),
    userProfile: (req,res) => res.render('profileCollection'),
    userCreate: (req,res) => res.render('profileCreate'),
    userFavs: (req,res) => res.render('profileFavs')
}