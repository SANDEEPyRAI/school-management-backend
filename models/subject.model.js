// models/subject.model.js
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // e.g. "Math"
    code: { type: String, required: true, unique: true }, // e.g. "MATH"
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    }, // ✅ class-wise subject
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
