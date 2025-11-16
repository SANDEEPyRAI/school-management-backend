const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 👈 changed from "Student" to "User"
      required: true,
    },
    status: {
      type: String,
      enum: ["present", "absent", "leave"],
      default: "present",
    },
  },
  { _id: false }
);

const attendanceSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class", // 👈 consistent with your Class model
      required: true,
    },
    date: { type: Date, required: true },
    records: [recordSchema],
  },
  { timestamps: true }
);

// Ensure unique attendance per class+date
attendanceSchema.index({ classId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
