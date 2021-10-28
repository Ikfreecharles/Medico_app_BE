const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
   {
      address: { type: String },
      postCode: { type: String },
      state: { type: String },
   },
   { timestamps: true }
);

module.exports = { addressSchema };
