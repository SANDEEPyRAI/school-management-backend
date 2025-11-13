const Result = require("../models/result.model");

exports.recordResult = async (req, res) => {
  try {
    const { examId, studentId, marksObtained, grade } = req.body;

    const existing = await Result.findOne({ examId, studentId });
    if (existing)
      return res.status(400).json({ message: "Result already recorded" });

    const result = await Result.create({
      examId,
      studentId,
      marksObtained,
      grade,
    });
    res.status(201).json({ result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to record result", error: err.message });
  }
};

exports.getResultsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const results = await Result.find({ studentId }).populate("examId");
    res.status(200).json({ results });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch results", error: err.message });
  }
};

exports.getResultsByExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const results = await Result.find({ examId }).populate(
      "studentId",
      "fullName email"
    );
    res.status(200).json({ results });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch results", error: err.message });
  }
};
