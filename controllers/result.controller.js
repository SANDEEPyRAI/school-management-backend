const Result = require("../models/result.model");

// // Record new result
// const Result = require("../models/result.model");

exports.recordResult = async (req, res) => {
  try {
    const { examId, studentId, classId, grade, subjects } = req.body;

    // ✅ Prevent duplicate exam+student
    const existing = await Result.findOne({ examId, studentId });
    if (existing) {
      return res.status(400).json({ message: "Result already recorded" });
    }

    // ✅ Map subjects → marksObtained
    const marksObtained = subjects || {};

    // ✅ Calculate totals
    const totalMarks = Object.values(marksObtained).reduce(
      (sum, val) => sum + Number(val || 0),
      0
    );
    const subjectCount = Object.keys(marksObtained).length || 1;
    const percentage = (totalMarks / (subjectCount * 100)) * 100;

    // ✅ Create result
    const result = await Result.create({
      examId,
      studentId,
      classId,
      grade,
      marksObtained,
      totalMarks,
      percentage,
    });

    res.status(201).json({ result });
  } catch (err) {
    res.status(500).json({
      message: "Failed to record result",
      error: err.message,
    });
  }
};

// // Get results by student
// exports.getResultsByStudent = async (req, res) => {
//   try {
//     const { studentId } = req.params;
//     const results = await Result.find({ studentId })
//       .populate("examId")
//       .populate("classId");
//     res.status(200).json({ results });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch results", error: err.message });
//   }
// };// Get results by student
exports.getResultsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const results = await Result.find({ studentId })
      .populate("examId")
      .populate("classId")
      .populate("studentId");

    res.status(200).json({ results });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch results",
      error: err.message,
    });
  }
};

// Get results by exam
exports.getResultsByExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const results = await Result.find({ examId })
      .populate("studentId", "fullName email")
      .populate("classId");
    res.status(200).json({ results });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch results", error: err.message });
  }
};

// Get all results
exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("examId")
      .populate("studentId", "fullName email")
      .populate("classId");
    res.status(200).json({ results });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch all results", error: err.message });
  }
};

// Update result
exports.updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Result.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Result not found" });
    res.status(200).json({ result: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update result", error: err.message });
  }
};

// Delete result
exports.deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Result.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Result not found" });
    res.status(200).json({ message: "Result deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete result", error: err.message });
  }
};
