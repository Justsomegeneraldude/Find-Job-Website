const mongoose = require("mongoose");

const CongViecYeuThichSchema = new mongoose.Schema(
  {
    taikhoan: {
      type: String,
    },

    tendoanhnghiep: {
      type: String,
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

const Cart = mongoose.model("CongViecYeuThich", CongViecYeuThichSchema);

module.exports = Cart;
