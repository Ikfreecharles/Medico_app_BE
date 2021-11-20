const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { goalSchema } = require("./Goals.model");

const activitySchema = new Schema(
   {
      activity: { type: String, required: true, trim: true },
      activitySince: { type: String, required: true, trim: true },
      progress: { type: Number, default: 0, trim: true },
      goals: [{ type: goalSchema, ref: "goals" }],
      patientId: {
         type: Schema.Types.ObjectId,
         ref: "patient",
         required: true,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("activity", activitySchema);
