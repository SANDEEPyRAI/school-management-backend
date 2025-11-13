const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    targetRoles: [{ type: String, enum: ["admin", "teacher", "student"] }],
    targetClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);
