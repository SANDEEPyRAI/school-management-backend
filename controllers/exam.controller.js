const Exam = require("../models/exam.model");
const ExamType = require("../models/examType.model");

// ✅ Create exam
exports.createExam = async (req, res) => {
  try {
    const { title, classId, examTypeId, scheduledAt, subjects } = req.body;

    // Validate examTypeId
    const examType = await ExamType.findById(examTypeId);
    if (!examType) {
      return res.status(400).json({ message: "Invalid exam type" });
    }

    // Validate date (must be future)
    if (new Date(scheduledAt) <= new Date()) {
      return res
        .status(400)
        .json({ message: "Exam date must be in the future" });
    }

    const exam = await Exam.create({
      title,
      classId,
      examTypeId,
      scheduledAt,
      subjects,
    });

    res.status(201).json({ exam });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create exam", error: err.message });
  }
};

// ✅ Get all exams (with exam type + class populated)
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("classId").populate("examTypeId");
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
    const exams = await Exam.find({ classId })
      .populate("classId")
      .populate("examTypeId");
    res.status(200).json({ exams });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch exams", error: err.message });
  }
};

// ✅ Get exams by date (scheduledAt)
exports.getExamsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const exams = await Exam.find({
      scheduledAt: { $gte: start, $lte: end },
    })
      .populate("classId")
      .populate("examTypeId");

    res.status(200).json({ exams });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch exams", error: err.message });
  }
};

// ✅ Get exams by exam type
exports.getExamsByType = async (req, res) => {
  try {
    const { examTypeId } = req.params;
    const exams = await Exam.find({ examTypeId })
      .populate("classId")
      .populate("examTypeId");
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
    const updated = await Exam.findByIdAndUpdate(id, req.body, { new: true })
      .populate("classId")
      .populate("examTypeId");
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
