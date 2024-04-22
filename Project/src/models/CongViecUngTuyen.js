const mongoose = require("mongoose");

const CongViecUngTuyenSchema = new mongoose.Schema(
  {
    taikhoan: {
      type: String,
    },
    hoten: {
      type: String,
    },
    trangthai: {
        type: String,
        default: "Đang chờ duyệt"
    },
    slug: {
      type: String,
    },

    congviec: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Work",
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("CongViecUngTuyen", CongViecUngTuyenSchema);

module.exports = Cart;
