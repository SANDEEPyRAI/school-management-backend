const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g. "Annual Function"
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }, // optional: event for specific class
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
