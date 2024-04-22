const mongoose = require("mongoose");

const userTDSchema = new mongoose.Schema(
  {
    tendoanhnghiep: {
        type:String,
    },
    logo:{
      type:String,
      default: ""
    },
    linhvuc: {
        type:String,
        default: ""
    },
    website: {
        type: String,
        // required: true,
      },
    sdt: {
      type: String,
    },
    email: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
      default: ""
    },
    diachi: {
      type: String,
      // required: true,
    },
    description_company: {
      type: String,
      // required: true,
      default: ""
    },
    phucloi: {
      type: String,
      default: ""
    },
    taikhoan: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("doanhnghiep",userTDSchema);