const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 👈 consistent with your Class model
      required: true,
    },
    feeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fee",
      required: true,
    },
    amountPaid: { type: Number, required: true },
    status: {
      type: String,
      enum: ["paid", "partial", "unpaid"],
      default: "unpaid",
    },
    paymentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
