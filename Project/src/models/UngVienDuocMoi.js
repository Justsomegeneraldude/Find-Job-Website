const mongoose = require("mongoose");

const UngVienDuocMoiSchema = new mongoose.Schema(
  {
    taikhoan: {
      type: String,
    },

    tendoanhnghiep: {
      type: String,
    },

    trangthai: {
        type: String,
        default: "Đang chờ duyệt"
    },

    slug: {
      type: String,
    },

    ungvienduocmoi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoitimviec",
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("UngVienDuocMoi", UngVienDuocMoiSchema);

module.exports = Cart;
