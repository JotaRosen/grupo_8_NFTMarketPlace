const userModel = require("../models/userArtists");
module.exports = (req,res,next) => {
  let user = null;
  if(req.cookies && req.cookies.email){
    user = userModel.oneByEmail(req.cookies.email);
  }else if(req.session && req.session.user){
    user = req.session.user
  }
  res.locals.user = user; 
  next();
}