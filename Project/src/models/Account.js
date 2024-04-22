const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    taikhoan: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    matkhau: {
      type: String,
      minlength: 6,
      required: true,
    },
    sdt: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    tendoanhnghiep: {
      type: String,
    },
    diachi: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Account",userSchema);