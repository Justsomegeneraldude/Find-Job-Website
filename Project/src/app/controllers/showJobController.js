const Work = require('../../models/Work');
const jwt = require('jsonwebtoken')
class job{
    async showJob(req, res, next){
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

      

        var inputData = req.body;
   
        var swk = inputData['search-work'].split(" ");

        var sln = inputData['search-location'].split(" ");
        var work = "(?i)";

        var location = "(?i)";

        for(let i = 0;i<swk.length;i++){
            work = work + swk[i];
            if (i == swk.length - 1){
                continue;
            }
            work = work + "|";
        }
      
        for(let i = 0;i<sln.length;i++){
            location = location + sln[i];
            if (i == sln.length - 1){
                continue;
            }
            location = location + "|";
        }
        console.log(location);

        var query = { 
            $or:[
                {tendoanhnghiep :{'$regex':work}},
                {description : {'$regex':work}},
                {position : {'$regex':work}},
                {career : {'$regex':work}},
                {job_requirement :{'$regex':work}}
            ],  
            diachi: {'$regex':location},
        }       
    
   
        const workDetail = await Work.findOne(query).sort({ create_at: 1 }).lean();
      
        Work.find(query).lean()
        .then((works) => {
          res.render("home", {
            works,
            workDetail,
            checkTD,
            checkTV,
            getUser,
          });
        })
        .catch(next);  
    }
}

module.exports =  new job;
