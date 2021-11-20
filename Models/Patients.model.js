const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { insuranceSchema } = require("./Insurance.model");
const { addressSchema } = require("./Address.model");
const { examinationSchema } = require("./Examination.model");

const patientSchema = new Schema(
   {
      patientID: { type: String, required: true, trim: true },
      userAvatar: { type: String },
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      dob: { type: String, required: true, trim: true },
      gender: { type: String, required: true, trim: true },
      height: { type: String, trim: true },
      weight: { type: String, trim: true },
      maritalStatus: { type: String, trim: true },
      hobbies: [{ type: String, trim: true }],
      spouse: { type: String, trim: true },
      children: { type: Number, trim: true },
      address: { type: addressSchema, default: {} },
      preferredCommunication: { type: String },
      email: { type: String, trim: true },
      language: { type: [String] },
      insurance: { type: insuranceSchema, default: {} },
      conditions: { type: [String], default: [] },
      medications: { type: [String], default: [] },
      allergies: { type: [String], default: [] },
      lastAppointment: { type: String, default: "", trim: true },
      vitals: [{ type: Schema.Types.ObjectId, ref: "patient", default: [] }],
      admittedDate: { type: String, trim: true },
      status: { type: Number, trim: true },
      examination: { type: examinationSchema, default: {} },
      diagnosis: { type: String, trim: true },
      recovery: { type: Number, trim: true },
      test: { type: Number, trim: true },
      activities: [
         { type: Schema.Types.ObjectId, ref: "activity", default: [] },
      ],
   },
   { timestamps: true }
);

module.exports = mongoose.model("patient", patientSchema);
