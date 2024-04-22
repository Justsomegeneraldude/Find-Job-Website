const jwt = require("jsonwebtoken")
const DoanhNghiep = require('../../models/DoanhNghiep')
const NguoiTimViec = require('../../models/NguoiTimViec')
const Account = require('../../models/Account')
const Work = require('../../models/Work')
const CongViecUngTuyen = require('../../models/CongViecUngTuyen')
const DuyetUngVien = require('../../models/DuyetUngVien')
const UngVienDuocMoi = require('../../models/UngVienDuocMoi')
const DuyetCongViec = require('../../models/DuyetCongViec')

class UserDNController{
    
    // ĐĂNG VIỆC 
    /// [[GET]] /dn/dangviec
    async dangviec(req, res, next){
        let id = ""
        let checkTD = false
        let checkTV = false
        let tendoanhnghiep = ""
        let diachi = ""
        let email = ""
        let sdt = ""
        let logo = ""
        const getUser = req.user;
        id = getUser.id;

        const user = await DoanhNghiep.findById(id).lean()
        tendoanhnghiep = user.tendoanhnghiep;
        diachi = user.diachi;
        email = user.email;
        sdt = user.sdt;
        logo = user.logo;

        //check role
        if( getUser.role === "TD"){
            checkTD = true
        }
        else if(getUser.role === "TV"){
            checkTV = true
        }

        res.render('dangviec',{layout: 'User',  checkTD,
        checkTV,
        getUser,
        tendoanhnghiep,
        diachi,
        email,
        sdt,
        logo,
        });
    }
    // [POST] /dn/dangviec/create
    async create(req, res, next){
        try {
          
            // Rã Token lấy username 
            const token = req.cookies.token
            let username = ""
            let id = ""
          
            if(token){
              jwt.verify(token,process.env.TOKEN_SECRET, (err, user) =>{
                  req.user = user;
                  username = req.user.taikhoan
              } )
            }
              // Tao Wor trong database
              const moment = new Date(Date.now());
              const date = new Date(req.body.date);
              const time_left = Math.ceil(
                Math.abs(date - moment) / (1000 * 60 * 60 * 24)
              );
              const skill = req.body.skills.split(',');
              const description = req.body.description.split("\n");
              const benefit  = req.body.benefit.split("\n");
              const job_requirement = req.body.job_requirement.split("\n");
              const formDatatuyendung = req.body.soluongtuyendung;
              const soluongtuyendung = `Tuyển dụng ${formDatatuyendung} ứng viên cho vai trò này`
              const newWork = new Work({
                  name_job: req.body.name_job,
                  tendoanhnghiep: req.body.tendoanhnghiep,
                  logo: req.body.logo,
                  salary: req.body.salary,
                  information: soluongtuyendung,
                  worktime: req.body.loaicongviec,
                  diachi: req.body.diachi,
                  skills: skill,
                  description: description,
                  position: req.body.position,
                  benefit: benefit,
                  degree: req.body.degree,
                  job_requirement: job_requirement,
                  career: req.body.career,
                  timeleft: time_left,
                  date: req.body.date,
                  taikhoan: username,
              });
    
              // Luu vao Database
              const work = await newWork.save();
              // return res.status(200).json({
              //   status: "Success",
              //   data: work
              // });
              return res.redirect('/');
          
            } 
            catch (err) {
              return res.status(500).json(err);
            }
    }


    // UPDATE INFO
    async capnhatthongtin(req, res){
         // Rã Token
         const token = req.cookies.token
         let userTV = {};
         let userTD = {};
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
             checkTD = true
             userTD = await DoanhNghiep.findById(getUser.id).lean();
         }
         else if(getUser.role === "TV"){
             checkTV = true
             userTV = await NguoiTimViec.findById(getUser.id).lean();
         }
      
        res.render('updatedn',{layout: 'User',  checkTD,
        checkTV,
        userTD,
        userTV,
        getUser,});
    }

    async updateinfo(req, res, next){
        
        const token = req.cookies.token
        let getUser = {};
        let taikhoan = ""
         
         if(token){
           jwt.verify(token,process.env.TOKEN_SECRET, (err, user) =>{
                 req.user = user;
                 getUser = req.user;
           } )
         }
         taikhoan = getUser.taikhoan
       
        await Work.updateMany({taikhoan: taikhoan}, { tendoanhnghiep: req.body.tendoanhnghiep, logo: req.body.logo })

        await Account.updateOne({_id: req.params.id}, req.body)

        await DoanhNghiep.updateOne({_id: req.params.id}, req.body)
              .then(() => 
              {
                req.flash('success','Cập nhật thông tin thành công')
                res.redirect('/')
              })
              .catch(next)
    }   


    // SHOW INFORMATION

    async hosoDN(req, res, next){

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
            checkTD = true
        }
        else if(getUser.role === "TV"){
            checkTV = true
        }
      
        // Get first data
        const workDetail = await Work.findOne({taikhoan: getUser.taikhoan}).sort({create_at: 1}).lean()
        const infoDoanhNghiep = await DoanhNghiep.findOne({taikhoan: getUser.taikhoan}).lean()
  
       
        // Get all data
        Work.find({taikhoan: getUser.taikhoan}).lean()
        .then(works => {

            res.render('infoAdmin',{
               layout: 'UserInfo',
               works,
               workDetail,
               infoDoanhNghiep,
               checkTD,
               checkTV,
               getUser,
            });
        })
        .catch(next)
   }

   async getHoSoDN(req, res, next){
      DoanhNghiep.findById(req.params.id).lean()
      .then(workDetail => {
          res.json(workDetail)
      })
      .catch(next)
   }

  //  async getWorks(req, res, next){

  //   Work.find({taikhoan: req.params.slug}).lean()
  //   .then(workDetail => {
  //       res.json(workDetail)
  //   })
  //   .catch(next)
  // }

  // RENDER DUYỆT ỨNG VIÊN [GET] /dn/duyetungvien
  async duyetungvien(req, res, next){
    // Rã Token
    const token = req.cookies.token;
    let getUser = {};
    let checkTD = false;
    let checkTV = false;
    let ketqua = 0;

    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        req.user = user;
        getUser = req.user;
      });
    }

    //check role
    if (getUser.role === "TD") {
      checkTD = true;
    } else if (getUser.role === "TV") {
      checkTV = true;
    }

    // Ứng viên dược mời

    const listEmpl = await UngVienDuocMoi.find({ taikhoan: getUser.taikhoan })
      .lean()
      .populate("ungvienduocmoi")
      .exec();

    listEmpl.map((ele) => {
      if (ele.trangthai == "Đang chờ duyệt") {
        ele.choduyet = true;
      } else if (ele.trangthai == "Đã đồng ý") {
        ele.dongy = true;
      } else {
        ele.tuchoi = true;
      }
      return ele;
    });

    // Công việc ứng tuyển
    await CongViecUngTuyen.find()
      .lean()
      .populate("congviec")
      .exec()
      .then((listGetAllWork) => {
        let congviec = listGetAllWork.filter((data) => {
          return data.congviec.taikhoan == getUser.taikhoan;
        });

        congviec.map((data) => {
          if (data.trangthai == "Đã đồng ý") {
            ketqua = 1;
            data.ketqua = ketqua;
            data.show = false;
          } else if (data.trangthai == "Đang chờ duyệt") {
            ketqua = 1;
            data.ketqua = ketqua;
            data.show = true;
          } else {
            data.ketqua = 0;
            data.show = false;
          }
          return data;
        });

        res.render("duyetungvien", {
          layout: "UserInfo",
          getUser,
          checkTD,
          congviec,
          listEmpl,
          success: req.flash('success'),
        });
      })
      .catch(next);
  }


  // HANDLE DUYỆT ỨNG VIÊN [GET] /dn/duyetungvien/:taikhoan
  async handleduyet(req, res, next){
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
         checkTD = true
     }
     else if(getUser.role === "TV"){
         checkTV = true
    }

    let tmp = req.params.taikhoan
    let taikhoan = ""
    let slug = ""
    let check = false
    let count = 0
    let tendoanhnghiep = ""

    for (let i = 0; i < tmp.length; i++){

      if(tmp[i] == "-"){
        check = true
        if(count == 0){
          count++
          continue
        }
      }
      if(!check){
        taikhoan = taikhoan + tmp[i];
      }
      else{
        slug = slug + tmp[i]
      }
  }
    
    const GetUngvien = await NguoiTimViec.findOne({taikhoan: taikhoan}).lean()
  

    let ungvien = new NguoiTimViec(GetUngvien)

    
    await CongViecUngTuyen.updateOne({slug: slug, taikhoan: taikhoan}, {trangthai: "Đã đồng ý"})
    
    let duyetungvien = new DuyetUngVien({
        taikhoan: getUser.taikhoan,
  
        slug: slug,  
        ungvien: ungvien._id
    })

    await duyetungvien.save()
      .then(()=> {
        req.flash('success', 'Duyệt ứng viên thành công')
        res.redirect("/dn/duyetungvien")
      })
      .catch(next)
    
  }

  // HANDLE DUYỆT ỨNG VIÊN [GET] /dn/duyetungvien/tuchoi/:taikhoan
  async handletuchoi(req, res, next){
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
        checkTD = true
    }
    else if(getUser.role === "TV"){
        checkTV = true
   }
   
   let tmp = req.params.taikhoan
   let taikhoan = ""
   let slug = ""
   let check = false
   let count = 0

   for (let i = 0; i < tmp.length; i++){

     if(tmp[i] == "-"){
       check = true
       if(count == 0){
         count++
         continue
       }
     }
     if(!check){
       taikhoan = taikhoan + tmp[i];
     }
     else{
       slug = slug + tmp[i]
     }
 }

   const GetUngvien = await NguoiTimViec.findOne({taikhoan: taikhoan}).lean()

   let ungvien = new NguoiTimViec(GetUngvien)
   
   await CongViecUngTuyen.updateOne({taikhoan: taikhoan, slug: slug}, {trangthai: "Đã từ chối"})
   
   req.flash('success', 'Từ chối ứng viên thành công')
   return res.redirect('/dn/duyetungvien')
  }


  // HANDLE INVITE EMPLOYEE TO COMPANY [GET] /invite/:id
  async handleInvite(req, res, next){
    const token = req.cookies.token
        let getUser = {};
        let checkTV = false
        let checkUT = false;
  
        
        if(token){
          jwt.verify(token,process.env.TOKEN_SECRET, (err, user) =>{
                req.user = user;
                getUser = req.user;
          } )
        }
        
        //check role
        if(getUser.role === "TV"){
            checkTV = true
        }

        const empDetail = await NguoiTimViec.findById(req.params.id).lean()
        const getDN = await DoanhNghiep.findById(getUser.id)


        const check = await UngVienDuocMoi.find({taikhoan: getUser.taikhoan}).lean()
        
        check.map((data)=>{
          if(data.ungvienduocmoi.valueOf() == req.params.id){
            checkUT = true
          };
        })
        
        let newEmp = new NguoiTimViec(empDetail)
        
        let ungvienduocmoi = new UngVienDuocMoi({
            taikhoan : getUser.taikhoan,
            tendoanhnghiep : getDN.tendoanhnghiep,
            slug: newEmp.taikhoan,
            ungvienduocmoi : newEmp._id
        })
        
        if(!checkUT){
          await ungvienduocmoi.save();
        }
        else{
            req.flash('message', 'Bạn đã mời ứng viên này rồi!')
            return res.redirect('/')
        }

      return res.redirect('/dn/duyetungvien')
  }


  // GET DATA INFO EMPLOYEE [GET] /dn/ungvien/:taikhoan
 async showInfo(req, res, next){
  await NguoiTimViec.findOne({taikhoan: req.params.taikhoan}).lean()
    .then((emp) => {
      res.redirect('/tv/info/'+ emp._id)
    })
    .catch(next)
 }


 // RENDER INFO DOANHNGHIEP [GET] /dn/info/doanhnghiep/:id
 async getUserInfo(req, res, next){
  // Rã Token
  const token = req.cookies.token
  let getUser = {};
  let checkTD = false
  let checkTV = false
  let taikhoan = ""
  
  if(token){
    jwt.verify(token,process.env.TOKEN_SECRET, (err, user) =>{
          req.user = user;
          getUser = req.user;
    } )
  }
 
  //check role
  if( getUser.role === "TD"){
      checkTD = true
  }
  else if(getUser.role === "TV"){
      checkTV = true
  }
  
  const doanhnghiep = await DoanhNghiep.findById(req.params.id).lean()
  taikhoan = doanhnghiep.taikhoan
  
   // Get first data
   const workDetail = await Work.findOne({taikhoan: taikhoan}).sort({create_at: 1}).lean()
   const infoDoanhNghiep = await DoanhNghiep.findOne({taikhoan: taikhoan}).lean()

   // Get all data
   Work.find({ taikhoan: taikhoan })
     .lean()
     .then((works) => {
       res.render("infoAdmin", {
         layout: "UserInfo",
         works,
         workDetail,
         infoDoanhNghiep,
         checkTD,
         checkTV,
         getUser,
       });
     })
     .catch(next);

}
async getListUngTuyen(req, res, next){
  const token = req.cookies.token
  let getUser = {};
  let id = ""
  let check = false

  
  if(token){
    jwt.verify(token,process.env.TOKEN_SECRET, (err, user) =>{
          req.user = user;
          getUser = req.user;
    } )
  }

  await CongViecUngTuyen.find({}).lean().populate('congviec').exec()
    .then((data)=>{
      data.map((ele) => {
        if(ele.congviec.taikhoan == getUser.taikhoan){
          check = true
        }
        return data
      })

      if(check){
        return res.json(data)
      }
      else{
        res.json(data)
      }
    })
    .catch(next)
}
}

module.exports =  new UserDNController;