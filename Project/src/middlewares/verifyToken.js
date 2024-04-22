const jwt = require("jsonwebtoken");
require('dotenv').config({path:'./env/.env'});


const middlewareController =  {
  verifyToken: (req, res, next) => {

    const token = req.cookies.token
  
    if(token){
      jwt.verify(token,process.env.TOKEN_SECRET, (err, user) =>{
  
        if(err){
          return res.redirect('/auth/dangnhap')
        }
        else{
          req.user = user;
          next();
        }
      } )
    }else{
      return res.redirect("/auth/dangnhap")
    }
  },

  
  verifyTokenDN: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.role == "TD")
      {
        next();
      }
      else{
        req.flash('message', 'Bạn không phải là doanh nghiệp')
        return res.redirect('/')
      }
    })
  },

  verifyTokenTV: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.role == "TV")
      {
        next();
      }
      else{
        req.flash('message', 'Bạn không phải là người tìm việc')
        return res.redirect('/')
      }
    })
  }
}


module.exports = middlewareController;