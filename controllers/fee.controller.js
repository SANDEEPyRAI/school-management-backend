const Fee = require("../models/fee.model");
const Payment = require("../models/payment.model");

exports.createFee = async (req, res) => {
  try {
    const fee = await Fee.create(req.body);
    res.status(201).json({ fee });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create fee", error: err.message });
  }
};

exports.recordPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json({ payment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to record payment", error: err.message });
  }
};

exports.getStudentPayments = async (req, res) => {
  try {
    const { studentId } = req.params;
    const payments = await Payment.find({ studentId }).populate("feeId");
    res.status(200).json({ payments });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch payments", error: err.message });
  }
};
