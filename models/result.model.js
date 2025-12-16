const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  grade: { type: String },

  // ✅ subject-wise marks
  marksObtained: {
    hindi: { type: Number, default: 0 },
    english: { type: Number, default: 0 },
    maths: { type: Number, default: 0 },
    science: { type: Number, default: 0 },
    socialScience: { type: Number, default: 0 },
    physics: { type: Number, default: 0 },
    chemistry: { type: Number, default: 0 },
    biology: { type: Number, default: 0 },
    computer: { type: Number, default: 0 },
    economics: { type: Number, default: 0 },
    businessStudies: { type: Number, default: 0 },
    accountancy: { type: Number, default: 0 },
    geography: { type: Number, default: 0 },
    politicalScience: { type: Number, default: 0 },
    history: { type: Number, default: 0 },
    psychology: { type: Number, default: 0 },
  },

  // ✅ total marks and percentage for easy queries
  totalMarks: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
});

module.exports = mongoose.model("Result", resultSchema);
