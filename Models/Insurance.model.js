const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const insuranceSchema = new Schema(
   {
      insuranceName: { type: String },
      insuranceNumber: { type: String, maxlength: 16 },
   },
   { timestamps: true }
);

module.exports = { insuranceSchema };
