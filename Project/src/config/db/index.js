const mongoose = require('mongoose');

function connect (){
    mongoose.connect("mongodb+srv://hieu40262:giabao190802@cluster0.nzghjzq.mongodb.net/FindWork")

    .then(() =>{
        console.log("Connected to MongoDB");
    })
    .catch(() =>{
        console.log("Failed to connect");
    });
}

module.exports = {connect}