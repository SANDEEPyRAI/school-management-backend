// controllers/examType.controller.js
const ExamType = require("../models/examType.model");

// Create new exam type
exports.createExamType = async (req, res) => {
  try {
    const { category, title, description } = req.body;

    if (!category || !title) {
      return res
        .status(400)
        .json({ message: "Category and title are required" });
    }

    const examType = await ExamType.create({ category, title, description });
    res.status(201).json({ examType });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create exam type", error: err.message });
  }
};

// Get all exam types
exports.getExamTypes = async (req, res) => {
  try {
    const examTypes = await ExamType.find({ isActive: true });
    res.status(200).json({ examTypes });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch exam types", error: err.message });
  }
};
