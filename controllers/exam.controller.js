const Exam = require("../models/exam.model");

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

exports.getExamsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const exams = await Exam.find({ classId });
    res.status(200).json({ exams });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch exams", error: err.message });
  }
};

exports.getExamsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const exams = await Exam.find({ date });
    res.status(200).json({ exams });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch exams", error: err.message });
  }
};
