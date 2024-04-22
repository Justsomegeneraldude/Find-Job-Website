const mongoose = require("mongoose");

const DuyetUngVienSchema = new mongoose.Schema(
  {
    taikhoan: {
      type: String,
    },
    slug: {
      type: String
    },
    ungvien: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NguoiTimViec",
    },
  },
  { timestamps: true }
);

const DuyetUngVien = mongoose.model("DuyetUngVien", DuyetUngVienSchema);

module.exports = DuyetUngVien;  
