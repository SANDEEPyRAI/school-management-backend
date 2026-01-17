// models/examType.model.js
const mongoose = require("mongoose");

const examTypeSchema = new mongoose.Schema({
  category: { type: String, required: true }, // ✅ no enum restriction
  title: { type: String },
  description: String,
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("ExamType", examTypeSchema);
