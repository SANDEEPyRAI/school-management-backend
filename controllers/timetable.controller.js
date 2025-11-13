const Timetable = require("../models/timetable.model");

exports.createTimetable = async (req, res) => {
  try {
    const { classId, day, slots } = req.body;

    const existing = await Timetable.findOne({ classId, day });
    if (existing) {
      await Timetable.findByIdAndUpdate(existing._id, { slots }, { new: true });
      return res
        .status(200)
        .json({ message: "Timetable updated", updated: true });
    }

    const timetable = await Timetable.create({ classId, day, slots });
    res.status(201).json({ timetable });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create timetable", error: err.message });
  }
};

exports.getTimetableByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const timetable = await Timetable.find({ classId }).populate(
      "slots.teacherId",
      "fullName email"
    );
    res.status(200).json({ timetable });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch timetable", error: err.message });
  }
};

exports.getTimetableByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const timetable = await Timetable.find({ "slots.teacherId": teacherId });
    res.status(200).json({ timetable });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch timetable", error: err.message });
  }
};
