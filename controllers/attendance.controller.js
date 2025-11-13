const Attendance = require("../models/attendance.model");

exports.markAttendance = async (req, res) => {
  try {
    const { classId, date, records } = req.body;

    const existing = await Attendance.findOne({ classId, date });
    if (existing)
      return res
        .status(400)
        .json({ message: "Attendance already marked for this date" });

    const attendance = await Attendance.create({ classId, date, records });
    res.status(201).json({ attendance });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to mark attendance", error: err.message });
  }
};

exports.getAttendanceByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const records = await Attendance.find({ classId }).populate(
      "records.studentId",
      "fullName email"
    );
    res.status(200).json({ records });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch attendance", error: err.message });
  }
};

exports.getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Attendance.find({ "records.studentId": studentId });
    res.status(200).json({ records });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch attendance", error: err.message });
  }
};
