const jwt = require("jsonwebtoken")
const NguoiTimViec = require('../../models/NguoiTimViec')
const Account = require('../../models/Account')
const Work = require('../../models/Work')
const CongViecUngTuyen = require('../../models/CongViecUngTuyen')
const DoanhNghiep = require("../../models/DoanhNghiep")
const UngVienDuocMoi = require('../../models/UngVienDuocMoi')
const DuyetCongViec = require('../../models/DuyetCongViec')
const CongViecYeuThich = require('../../models/CongViecYeuThich')


class UserTVController{
    
    async infoUser(req, res, next){

        // Rã Token
        const token = req.cookies.token
        let getUser = {};
        let checkTV = false
        
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

        await NguoiTimViec.findOne({taikhoan: getUser.taikhoan}).lean()
        .then(user => {
            
            res.render('infoUser',
            {
                layout: 'UserInfo',
                getUser,
                checkTV,
                user
            })
        })
        .catch(next)
    }

    async getUserInfo(req, res, next){
        const getUser = req.user; 
        let checkTD = false
        let checkTV = false
        //check role
        if( getUser.role === "TD"){
            checkTD = true
        }
        else if(getUser.role === "TV"){
            checkTV = true
        }
        await NguoiTimViec.findById(req.params.id).lean()
        .then(user => {
            user.check = checkTD
            res.render('infoUser',
            {
                layout: 'UserInfo',
                getUser,
                user,
                checkTD,
                checkTV,
            })
        })
        .catch(next)
    }

    // [POST_PUT] UPDATE INFO USER TÌM VIỆC /tv/update/:id
    async updateinfo(req, res, next){
        
        await Account.updateOne({_id: req.params.id}, req.body)
        
        const skills = req.body.skills.split(',');

        await NguoiTimViec.updateOne({_id: req.params.id}, 
            {
                hoten: req.body.hoten,
                congviec: req.body.congviec,
                ngaysinh: req.body.ngaysinh,
                gioitinh: req.body.gioitinh,
                loaicongviec: req.body.loaicongviec,
                linhvuc: req.body.linhvuc,
                sdt: req.body.sdt,
                email: req.body.email,
                city: req.body.city,
                diachi: req.body.diachi,
                hocvan: req.body.hocvan,
                muctieunghenghiep: req.body.muctieunghenghiep,
                kinhnghiemlamviec: req.body.kinhnghiemlamviec,
                chitiet: req.body.chitiet,
                skills: skills
            })
        
            .then(() =>{ 
              req.flash('success', 'Cập nhật thông tin thành công')
              res.redirect('/')
            })
            .catch(next)
    }   

    //[GET] /tv/update ( Render Update Nguoi Tim Viec)
    async update(req, res, next){
        let userTV = {};
        const getUser = req.user;
        let checkTV = false      
        //check role
        if(getUser.role === "TV"){
            checkTV = true
        }
       userTV = await NguoiTimViec.findById(getUser.id).lean();
       res.render('updatetv',{layout: 'User',
       checkTV,
       userTV,
       getUser,});
    }

    // [GET] /tv/ungtuyen [Render Trang Duyet Cong Viec]
    async ungtuyen(req, res, next){
        const getUser = req.user;
        let checkTV = false
        let ketqua = 0
        let getTK = ""
        
        //check role
        if(getUser.role === "TV"){
            checkTV = true
        }
        const doanhnghiep = await UngVienDuocMoi.find().lean().populate('ungvienduocmoi').exec()

        doanhnghiep.map((data) => {
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
            getTK = data.tendoanhnghiep
          
            return data;  
          });
        
        // const logo = await DoanhNghiep.findOne({tendoanhnghiep: getTK}).lean()
        // console.log(logo);

        // doanhnghiep.map((data) => {
        //     data.logo = getDN.logo
        //     return data
        // })

        await CongViecUngTuyen.find({taikhoan: getUser.taikhoan}).lean().populate('congviec').exec()
            .then((congviec)=>{
                congviec = congviec.map((ele) => {
                    if(ele.trangthai =="Đang chờ duyệt"){
                        ele.choduyet = true
                    }
                    else if(ele.trangthai =="Đã đồng ý"){
                        ele.dongy = true
                    }
                    else{
                        ele.tuchoi = true
                    }
                    return ele

                })
                res.render('congviecduocmoi',{
                    layout: 'UserInfo',
                    checkTV, 
                    getUser,
                    congviec,
                    doanhnghiep,
                    success: req.flash('success'),
                })


            })
            .catch(next)
    }

    async favourJob(req, res, next){
        let checkTV = false
        const getUser = req.user;
        //check role
        if(getUser.role === "TV"){
            checkTV = true
        }

        await CongViecYeuThich.find({taikhoan: getUser.taikhoan}).lean().populate('congviec').exec()
          .then((congviec)=> {
            congviec = congviec.map((data) =>{
              return data
            })
   
            res.render('congviecdathich',{
              layout: 'UserInfo',
              checkTV, 
              getUser,
              congviec
          })
          })
          .catch(next)

        
    }

    async ungtuyencongviec(req, res, next){

        const token = req.cookies.token
        let getUser = {};
        let checkTV = false
        let checkUT = false;
        let hoten = ""
        
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

        const workDetail = await Work.findById(req.params.id).lean()

        const getUserTV = await NguoiTimViec.find({taikhoan: getUser.taikhoan}).lean()

        getUserTV.map((data) => {
            hoten = data.hoten
            return data
        })
         
        const check = await CongViecUngTuyen.find({taikhoan: getUser.taikhoan}).lean()
        
        check.map((data)=>{
            if(data.congviec.valueOf() == req.params.id){
                checkUT = true
            };
        })

        let work = new Work(workDetail)

        let congviecungtuyen = new CongViecUngTuyen({
            taikhoan : getUser.taikhoan,
            hoten: hoten,
            slug: work.slug,
            congviec : work._id
        })
        
        if(!checkUT){
            await congviecungtuyen.save();
        }
        else{
            req.flash('message', 'Công việc này bạn đã ứng tuyển rồi!')
            return res.redirect('/')
        }
        req.flash('success', 'Bạn đã ứng tuyển thành công')
        return res.redirect('/tv/ungtuyen')
    }

    async handleduyet(req, res, next){
        // Rã Token
     const token = req.cookies.token
     let getUser = {};
    
     if(token){
       jwt.verify(token,process.env.TOKEN_SECRET, (err, user) =>{
             req.user = user;
             getUser = req.user;
       } )
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
    const GetDN = await DoanhNghiep.findOne({taikhoan: slug}).lean()

    let doanhnghiep = new DoanhNghiep(GetDN)

    await UngVienDuocMoi.updateOne({slug: taikhoan, taikhoan: slug}, {trangthai: "Đã đồng ý"})
    
    let duyetcongviec = new DuyetCongViec({
        taikhoan: getUser.taikhoan,
        slug: slug,  
        doanhnghiep: doanhnghiep._id
    })

    await duyetcongviec.save()
    .then(()=> res.redirect("/tv/ungtuyen"))
    .catch(next)
    }

    async handletuchoi(req, res, next){
        const token = req.cookies.token
        let getUser = {};
    
     if(token){
       jwt.verify(token,process.env.TOKEN_SECRET, (err, user) =>{
             req.user = user;
             getUser = req.user;
       } )
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
    await UngVienDuocMoi.updateOne({slug: taikhoan, taikhoan: slug}, {trangthai: "Đã từ chối"})
        .then(() => res.redirect("/tv/ungtuyen"))
        .catch(next)
    }

    async showInfo(req, res, next){

        await DoanhNghiep.findOne({taikhoan: req.params.taikhoan}).lean()
          .then((emp) => {
            res.redirect('/dn/info/doanhnghiep/'+ emp._id)
          })
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
        await UngVienDuocMoi.find({}).lean().populate('ungvienduocmoi').exec()
          .then((data)=>{
            data.map((ele) => {
              if(ele.ungvienduocmoi.taikhoan == getUser.taikhoan){
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

    async likeJob(req, res, next){

      const getUser = req.user;

      const getWork = await Work.findById(req.params.id).lean()
      let congviec = new Work(getWork)

      let congviecyeuthich = new CongViecYeuThich({
        taikhoan: getUser.taikhoan,
        slug: congviec.slug,  
        congviec: congviec._id
    })

      await congviecyeuthich.save()
      .then(()=> res.redirect("/tv/favourjob"))
      .catch(next)
  }
}
module.exports =  new UserTVController;