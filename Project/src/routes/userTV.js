const express = require('express');
const router = express.Router();

const UserController = require('../app/controllers/UserTVController');
const middlewareController = require('../middlewares/verifyToken')

// XEM THÔNG TIN
router.get('/info',middlewareController.verifyTokenTV,UserController.infoUser);


// CẬP NHẬT THÔNG TIN
router.get('/update',middlewareController.verifyTokenTV, UserController.update);

router.put('/update/:id',middlewareController.verifyTokenTV, UserController.updateinfo);


// ỨNG TUYỂN CÔNG VIỆC
router.get('/ungtuyen',middlewareController.verifyTokenTV,UserController.ungtuyen);

router.get('/ungtuyen/:id',middlewareController.verifyTokenTV,UserController.ungtuyencongviec);

router.get('/favourjob',middlewareController.verifyTokenTV,UserController.favourJob);

// DUYỆT CÔNG VIỆC ĐƯỢC MỜI

router.get('/duyetcongviec/:taikhoan',middlewareController.verifyTokenTV, UserController.handleduyet);

router.get('/duyetcongviec/tuchoi/:taikhoan',middlewareController.verifyTokenTV, UserController.handletuchoi)
;


// XEM THÔNG TIN DOANH NGHIỆP
router.get('/info/doanhnghiep/:taikhoan',middlewareController.verifyTokenTV,UserController.showInfo);

router.get('/info/:id',middlewareController.verifyToken,UserController.getUserInfo);

// YÊU THÍCH CÔNG VIỆC 
router.get('/favourjob',middlewareController.verifyTokenTV,UserController.favourJob);

router.get('/like/:id',middlewareController.verifyTokenTV,UserController.likeJob);

module.exports = router;
