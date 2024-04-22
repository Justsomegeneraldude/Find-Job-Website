const mongoose = require("mongoose");

const userTVSchema = new mongoose.Schema(
  {
    hoten: {
        type:String,
        default: "Họ và tên"
    },
    congviec: {
        type:String,
        default: ""
    },
    ngaysinh: {
        type: String,
        default: ""
        // required: true,
      },
    gioitinh: {
      type: String,
      default: "Nam"
    },
    loaicongviec: {
      type: String,
      // required: true,
    },
    linhvuc: {
      type: String,
      // required: true,
      default: ""
    },
    sdt: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      default: ""
    },
    diachi:{
      type: String,
    },
    muctieunghenghiep:{
      type: String,
      default: ""
    },
    hocvan:{
      type: String,
      default: ""
    },
    kinhnghiemlamviec:{
      type: String,
      default: ""
    },
    chitiet:{
      type: String,
      default: ""
    },
    skills: {
      type: [String],
      // required: true,
    },
    taikhoan: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("nguoitimviec",userTVSchema);