const mongoose = require("mongoose");

const DuyetCongViecSchema = new mongoose.Schema(
  {
    taikhoan: {
      type: String,
    },
    slug: {
      type: String
    },
    doanhnghiep: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoanhNghiep",
    },
  },
  { timestamps: true }
);

const DuyetCongViec = mongoose.model("DuyetCongViec", DuyetCongViecSchema);

module.exports = DuyetCongViec;  
