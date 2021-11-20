const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
   {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      dob: { type: String, required: true, trim: true },
      gender: { type: String, required: true, trim: true },
      phoneNumber: { type: Number, required: true, trim: true },
      workPlace: { type: String, required: true, trim: true },
      agent: { type: String, trim: true },
      patientId: [{ type: Schema.Types.ObjectId, ref: "patient", default: [] }],
   },
   { timeStamp: true }
);

module.exports = mongoose.model("doctor", doctorSchema);
