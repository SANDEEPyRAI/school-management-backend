const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fee", feeSchema);
