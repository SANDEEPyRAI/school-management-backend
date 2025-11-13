const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g. "Midterm Math"
    subject: { type: String, required: true },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    date: { type: Date, required: true },
    duration: { type: Number }, // in minutes
    maxMarks: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);
