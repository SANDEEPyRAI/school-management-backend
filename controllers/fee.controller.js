const Fee = require("../models/fee.model");
const Payment = require("../models/payment.model");

// Create fee structure
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

// Get all fees (for admin or class-wise)
exports.getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate("classId");
    res.status(200).json({ fees });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch fees", error: err.message });
  }
};

// Get fees for a specific class
exports.getClassFees = async (req, res) => {
  try {
    const { classId } = req.params;
    const fees = await Fee.find({ classId }).populate("classId");
    res.status(200).json({ fees });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch class fees", error: err.message });
  }
};

// Record payment
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

// Get all payments of a student
exports.getStudentPayments = async (req, res) => {
  try {
    const { studentId } = req.params;
    const payments = await Payment.find({ studentId })
      .populate("studentId", "fullName rollNumber email")
      .populate({
        path: "feeId",
        select: "description amount dueDate",
        populate: { path: "classId", select: "name section" },
      });
    res.status(200).json({ payments });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch student payments",
      error: err.message,
    });
  }
};

// Get all payments (admin overview)
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("studentId", "fullName rollNumber email")
      .populate({
        path: "feeId",
        select: "description amount dueDate",
        populate: { path: "classId", select: "name section" },
      });
    res.status(200).json({ payments });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch payments", error: err.message });
  }
};

// Get single payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId)
      .populate("studentId", "fullName rollNumber email")
      .populate({
        path: "feeId",
        select: "description amount dueDate",
        populate: { path: "classId", select: "name section" },
      });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ payment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch payment", error: err.message });
  }
};

// Update Fee
exports.updateFee = async (req, res) => {
  try {
    const { feeId } = req.params;
    const updatedFee = await Fee.findByIdAndUpdate(feeId, req.body, {
      new: true,
      runValidators: true,
    }).populate("classId");
    if (!updatedFee) {
      return res.status(404).json({ message: "Fee not found" });
    }
    res.status(200).json({ fee: updatedFee });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update fee", error: err.message });
  }
};

// Update Payment
exports.updatePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("studentId", "fullName rollNumber email")
      .populate({
        path: "feeId",
        select: "description amount dueDate",
        populate: { path: "classId", select: "name section" },
      });

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ payment: updatedPayment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update payment", error: err.message });
  }
};
