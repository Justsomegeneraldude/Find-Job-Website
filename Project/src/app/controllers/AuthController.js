const Account = require("../../models/Account");
const DoanhNghiep = require("../../models/DoanhNghiep");
const NguoiTimViec = require("../../models/NguoiTimViec");
const Token = require("../../models/Token");
const bccypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "./env/.env" });

const AuthController = {
  signupGet: async (req, res) => {
    const token = req.cookies.token;
    if (!token)
    { 

      return res.render("dangky", { layout: "LoginSignup",message: req.flash('message'),
      success: req.flash('success'), });
    }
    else if (token)
    {
      req.flash('message', 'Bạn đã đăng nhập')
      return res.redirect('/');
    }
  },

  //SIGNUP
  signup: async (req, res) => {
    try {
      const salt = await bccypt.genSalt(10);
      const hashed = await bccypt.hash(req.body.matkhau, salt);
    
      const oldUser = await Account.findOne({ taikhoan: req.body.taikhoan });
      const oldEmail = await Account.findOne({ email: req.body.email});
      const oldPhone = await Account.findOne({ sdt: req.body.sdt});
      if (oldUser) {
        req.flash('message', 'Tài khoản này đã tồn tại')
        return res.redirect('/auth/dangky')
      }
      else if (oldEmail) {
        req.flash('message', 'Email này đã tồn tại')
        return res.redirect('/auth/dangky')
      }
      else if(oldPhone){
        req.flash('message', 'SĐT này đã tồn tại')
        return res.redirect('/auth/dangky')
      }
      // Tao User trong database
      const newUser = new Account({
        taikhoan: req.body.taikhoan,
        email: req.body.email,
        matkhau: hashed,
        sdt: req.body.sdt,
        role: req.body.role,
        tendoanhnghiep: req.body.tendoanhnghiep,
        diachi: req.body.diachi,
        website: req.body.website,
      });
      
      // Luu vao Database
      const userDN = new DoanhNghiep(newUser);
      const userTV = new NguoiTimViec(newUser);
      const user = await newUser.save();
      
      if(req.body.role == "TD"){
        await userDN.save();
      }
      else if(req.body.role == "TV")
      {
        await userTV.save();
      }
  
      // return res.status(200).json({
      //   status: "Success",
      //   data: {user,userDN}
      // });
      req.flash('success', 'Đăng ký thành công')
      return res.redirect("/auth/dangnhap");
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //[GET] /auth/dangnhap
  loginGet: (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.render("dangnhap", { 
        layout: "LoginSignup",
        message: req.flash('message'),
        success: req.flash('success'),
       });
    }
    else if(token)
    {
      req.flash('message', 'Bạn đã đăng nhập')
      return res.redirect('/');
    }
  },

  // LOGIN //
  loginUser: async (req, res) => {
    try {
      const user = await Account.findOne({ taikhoan: req.body.taikhoan });

      if (!user) {
        req.flash('message', 'Sai tài khoản')
        return res.redirect('/auth/dangnhap')
      }
      const validPassWord = await bccypt.compare(
        req.body.matkhau,
        user.matkhau
      );
      if (!validPassWord) {
        req.flash('message', 'Sai mật khẩu')
        return res.redirect('/auth/dangnhap')
        // return res.status(404).json("Wrong password");
      }
      if (req.body.role != user.role) {
        req.flash('message', 'Sai vai trò')
        return res.redirect('/auth/dangnhap')
      }

      if (user && validPassWord && req.body.role == user.role) {
        const token = jwt.sign(
          { id: user._id, role: user.role, taikhoan: user.taikhoan },
          process.env.TOKEN_SECRET,
          { expiresIn: "7200s" }
        );
        const refreshToken = jwt.sign(
          { id: user._id, role: user.role, taikhoan: user.taikhoan },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "365d" }
        );
        const { matkhau, ...others } = user._doc;
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        const RefreshTokenStore = new Token({
          token: refreshToken,
        });
        const refreshTokens = await RefreshTokenStore.save();
        // return res.status(200).json({
        //     data: {...others} ,token
        // });
        req.flash('success', 'Đăng nhập thành công')
        return res.redirect("/");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    // const refreshTokens = await Token.findOne(refreshToken);
    if (!refreshToken) {
      return res.status(401).json("Ban chua dang nhap");
    }
    // if(!refreshTokens)
    // {
    //     return res.status(403).json("Refresh token is not valid");
    // }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
      }

      // Update: Rã token lấy thêm tài khoản
      const newToken = jwt.sign(
        { id: user._id, role: user.role, taikhoan: user.taikhoan },
        process.env.TOKEN_SECRET,
        { expiresIn: "7200s" }
      );
      const newRefreshToken = jwt.sign(
        { id: user._id, role: user.role, taikhoan: user.taikhoan },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "365d" }
      );
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      return res.status(200).json({ token: newToken });
    });
  },

  requestLogout: async (req, res) => {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    req.flash("success","Đăng xuất thành công");
    return res.redirect("/");
  },
};
module.exports = AuthController;
