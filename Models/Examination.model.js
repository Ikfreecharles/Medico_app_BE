const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examinationSchema = new Schema(
   {
      marker: { type: Number },
      examination: { type: String },
   },
   { timestamps: true }
);

module.exports = { examinationSchema };
