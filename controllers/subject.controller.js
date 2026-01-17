// controllers/subject.controller.js
const Subject = require("../models/subject.model");

// Create subject
exports.createSubject = async (req, res) => {
  try {
    const { name, code, classId } = req.body;
    const subject = await Subject.create({ name, code, classId });
    res.status(201).json({ subject });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create subject", error: err.message });
  }
};

// Get all subjects
exports.getAllSubjects = async (_req, res) => {
  try {
    const subjects = await Subject.find({ isActive: true }).populate("classId");
    res.status(200).json({ subjects });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch subjects", error: err.message });
  }
};

// Get subjects by class
exports.getSubjectsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const subjects = await Subject.find({ classId, isActive: true });
    res.status(200).json({ subjects });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch subjects", error: err.message });
  }
};

// Update subject
exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json({ subject });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update subject", error: err.message });
  }
};

// Delete subject (soft delete)
exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json({ message: "Subject archived" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete subject", error: err.message });
  }
};
