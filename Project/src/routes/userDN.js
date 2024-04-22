const express = require('express');
const router = express.Router();
const middlewareController = require('../middlewares/verifyToken')

const CapNhatThongTinController = require('../app/controllers/UserDNController');


// Đăng việc
router.get('/dangviec',middlewareController.verifyTokenDN, CapNhatThongTinController.dangviec );

router.post('/dangviec/create',middlewareController.verifyTokenDN, CapNhatThongTinController.create);


// Cập nhật thông tin
router.get('/update',middlewareController.verifyTokenDN, CapNhatThongTinController.capnhatthongtin);

router.put('/update/:id',middlewareController.verifyTokenDN, CapNhatThongTinController.updateinfo);


// Xem thông tin
router.get('/info',middlewareController.verifyTokenDN, CapNhatThongTinController.hosoDN);

router.get('/info/:id',middlewareController.verifyToken, CapNhatThongTinController.getHoSoDN);



// Duyệt ứng viên
router.get('/duyetungvien',middlewareController.verifyTokenDN, CapNhatThongTinController.duyetungvien);

router.get('/duyetungvien/:taikhoan',middlewareController.verifyTokenDN, CapNhatThongTinController.handleduyet);

router.get('/duyetungvien/tuchoi/:taikhoan',middlewareController.verifyTokenDN, CapNhatThongTinController.handletuchoi);


// Mời ứng viên vào cty
router.get('/invite/:id',middlewareController.verifyTokenDN, CapNhatThongTinController.handleInvite);


// Xem thông tin ứng viên
router.get('/info/ungvien/:taikhoan',middlewareController.verifyTokenDN, CapNhatThongTinController.showInfo);

router.get('/info/doanhnghiep/:id',middlewareController.verifyToken,CapNhatThongTinController.getUserInfo);

router.get('/get/ungtuyen',middlewareController.verifyTokenDN,CapNhatThongTinController.getListUngTuyen);

module.exports = router;

