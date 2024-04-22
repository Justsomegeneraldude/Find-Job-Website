const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    token:{
        type: String,
        unique: true,
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Tokens",tokenSchema);