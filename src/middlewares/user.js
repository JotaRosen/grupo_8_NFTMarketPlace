const db = require("../database/models/index");
const {User} = db 
module.exports = (req,res,next) => {
  let user = null;
  if(req.cookies && req.cookies.email){
    user = User.findOne({
      where:{
        email: req.cookies.email
      }
    });
  }else if(req.session && req.session.user){
    user = req.session.user;
  }
  res.locals.user = user; 
  next();
}