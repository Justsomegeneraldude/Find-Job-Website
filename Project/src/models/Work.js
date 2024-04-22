const mongoose = require("mongoose");
slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const workSchema = new mongoose.Schema(
  {
    name_job: {
        type: String,
        required: true,
      },
    tendoanhnghiep: {
      type: String,
      // required: true,
    },
    salary: {
      type: String,
      // required: true,
    },
    worktime: {
      type: String,
      // required: true,
    },
    skills: {
      type: [String],
      // required: true,
    },
    diachi: {
      type: String,
      // required: true,
    },
    logo: {
      type: String,
      // required: true,
    },
    description: {
      type: [String],
      // required: true,
    },
    position: {
      type: String,
      // required: true,
    },
    benefit: {
      type: [String],
      // required: true,
    },
    degree: {
      type: String,
      // required: true,
    },
    career: {
      type: String,
      // required: true,
    },
    job_requirement: {
      type: [String],
      // required: true,
    },
    position: {
      type: String,
      // required: true,
    },
    information: {
      type: String,
      // required: true,
    },
    date: {
      type: String,
      // required: true,
    },
    timeleft:{
      type: String,
    },
    taikhoan: {
      type: String,
      required: true,
    },  
    slug: {
      type: String,
      slug: "name_job",
      unique: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Work",workSchema);