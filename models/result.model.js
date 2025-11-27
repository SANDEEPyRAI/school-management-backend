const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    marksObtained: { type: Number, required: true },
    grade: { type: String },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true, // ✅ class wise RBAC possible
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
