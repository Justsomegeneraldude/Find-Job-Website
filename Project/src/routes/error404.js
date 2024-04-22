const express = require('express');
const router = express.Router();

const error = require('../app/controllers/error');

router.get('/',error.error404);

module.exports = router;
