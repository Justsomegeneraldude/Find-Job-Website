const express = require('express');
const router = express.Router();

const AuthController = require('../app/controllers/AuthController');
const middlewareController = require('../middlewares/verifyToken');

// Dang ky 
// [GET] /auth/dangky
router.get('/dangky',AuthController.signupGet);
// [POST] /auth/dangky/create
router.post('/dangky/create',AuthController.signup);

// Dang nhap
// [GET] /auth/dangnhap
router.get('/dangnhap',AuthController.loginGet);
// [POST] /auth/dangnhap
router.post('/dangnhap', AuthController.loginUser) ;

// Refresh Token
// [POST] /auth/refresh
router.post('/refresh',AuthController.requestRefreshToken);

// Dang xuat
// [GET] /auth/dangxuat
router.get('/dangxuat',middlewareController.verifyToken,AuthController.requestLogout);

module.exports = router;
