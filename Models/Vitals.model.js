const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vitalSchema = new Schema({
   vitalType: { type: String },
   vitalNumber: { type: String },
   unit: { type: String },
   changeInfo: { type: String },
   changeDirection: { type: Number },
   patientId: {
      type: Schema.Types.ObjectId,
      ref: "patient",
      require: true,
   },
});

module.exports = mongoose.model("vital", vitalSchema);
