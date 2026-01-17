const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "Class 10 - A"
    section: { type: String },
    // subjects: [String],
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    teacherIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
