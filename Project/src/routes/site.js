const express = require('express');
const router = express.Router();

const SiteController = require('../app/controllers/SiteController');
const showJobController = require('../app/controllers/showJobController');
router.get('/work/detail/:id',SiteController.detailWork);
router.get('/user/detail/:id',SiteController.detailUser);
router.post('/getShowJob',showJobController.showJob);
router.get('/',SiteController.home);

module.exports = router;
