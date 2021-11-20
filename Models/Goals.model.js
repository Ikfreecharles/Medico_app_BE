const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
   subject: { type: String, required: true, trim: true },
   priority: { type: String, required: true },
   date: { type: String, required: true, trim: true },
   status: { type: Number, default: 0, trim: true },
   frequency: { type: String, required: true, trim: true },
   assignedTo: { type: String, trim: true },
});

module.exports = { goalSchema };
