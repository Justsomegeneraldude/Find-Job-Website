const express = require('express');

const siteRouter = require('./site');
// const loginRouter = require('./dangnhap');
const authRouter = require('./auth');

const capnhatDNRouter = require('./userDN');
const userDNRouter = require('./userTV');
const error404 = require('./error404');
const error500 = require('./error500');

function routingPaths(app){
    app.use('/auth', authRouter);
    app.use('/dn', capnhatDNRouter);
    app.use('/tv', userDNRouter);
    app.use('/', siteRouter);
    app.use('*',error404);
    app.use('*',error500);
   
}

module.exports = routingPaths;
