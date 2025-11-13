const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    feeId: { type: mongoose.Schema.Types.ObjectId, ref: "Fee", required: true },
    amountPaid: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["paid", "partial", "unpaid"],
      default: "paid",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
