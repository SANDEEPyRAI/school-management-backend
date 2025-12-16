const Exam = require("../models/exam.model");

// ✅ Create exam
exports.createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json({ exam });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Exam creation failed", error: err.message });
  }
};

// ✅ Get all exams
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("classId");
    res.status(200).json({ exams });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch exams", error: err.message });
  }
};

// ✅ Get exams by class
exports.getExamsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const exams = await Exam.find({ classId }).populate("classId");
    res.status(200).json({ exams });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch exams", error: err.message });
  }
};

// ✅ Get exams by date
exports.getExamsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const exams = await Exam.find({ date }).populate("classId");
    res.status(200).json({ exams });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch exams", error: err.message });
  }
};

// ✅ Update exam
exports.updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Exam.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Exam not found" });
    res.status(200).json({ exam: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update exam", error: err.message });
  }
};

// ✅ Delete exam
exports.deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Exam.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Exam not found" });
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete exam", error: err.message });
  }
};
