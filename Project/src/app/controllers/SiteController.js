const Work = require('../../models/Work')
const NguoiTimViec = require('../../models/NguoiTimViec')
const jwt = require('jsonwebtoken')
class SiteController{

    // [GET] 
    async home(req, res, next){
        // Rã Token
        const token = req.cookies.token
        let getUser = {};
        let checkTD = false
        let checkTV = false
        
        if(token){
          jwt.verify(token,process.env.TOKEN_SECRET, (err, user) =>{
                req.user = user;
                getUser = req.user;
          } )
        }
        
        //check role
        if( getUser.role === "TD"){
            checkTD = true;
          
        }
        else if(getUser.role === "TV"){
          checkTV = true;
        }
         //Get first data
         const workDetail = await Work.findOne({})
         .sort({ create_at: 1 })
         .lean();
        // Get first data
          const userTVDetail = await NguoiTimViec.findOne({}).sort({create_at:1}).lean();

        //Get all data và truyền dữ liệu vào
        const userTV = await NguoiTimViec.find({}).lean();
        Work.find({})
         .lean()
         .then((works) => {
           res.render("home", {
             works,
             workDetail,
             userTV,
             userTVDetail,
             checkTD,
             checkTV,
             getUser,
             message: req.flash('message'),
             success: req.flash('success'),
           });
         })
         .catch(next);
    }  
    
    // [GET] (Gọi ajax trả dữ liệu json bảng Work ) /work/detail/:id
    async detailWork(req, res, next){
    
        // const works = await Work.find({}).lean()
        // .then(work => (work = work.filter((ele) => ele)));

        Work.findById(req.params.id).lean()
        .then(workDetail => {
            res.json(workDetail)
        })
        .catch(next)
    } 

    // [GET] (Gọi jax trả dữ liệu json bảng NguoiTimViec) /user/detail/:id
    async detailUser(req, res, next){
    
      // const works = await Work.find({}).lean()
      // .then(work => (work = work.filter((ele) => ele)));

      NguoiTimViec.findById(req.params.id).lean()
      .then(userTVDetail => {
          res.json(userTVDetail)
      })
      .catch(next)
  } 

}

module.exports =  new SiteController;