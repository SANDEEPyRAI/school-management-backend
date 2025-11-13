const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      required: true,
    },
    slots: [
      {
        period: { type: Number },
        subject: { type: String },
        teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        startTime: { type: String }, // e.g. "09:00"
        endTime: { type: String }, // e.g. "09:45"
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);
