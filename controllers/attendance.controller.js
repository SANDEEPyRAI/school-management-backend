const Attendance = require("../models/attendance.model");
const Class = require("../models/class.model");
const dayjs = require("dayjs");

// POST: Mark attendance (create only, prevents duplicate class+date)
exports.markAttendance = async (req, res) => {
  try {
    const { classId, date, records } = req.body;
    const normalizedDate = dayjs(date).startOf("day").toDate();
    const existing = await Attendance.findOne({
      classId,
      date: normalizedDate,
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for this date" });
    }
    const attendance = await Attendance.create({
      classId,
      date: normalizedDate,
      records,
    });
    res.status(201).json({ attendance });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to mark attendance", error: err.message });
  }
};

// PUT: Upsert attendance by class and date
exports.upsertAttendanceByClassAndDate = async (req, res) => {
  try {
    const { classId } = req.params;
    const { date, records } = req.body;
    const normalizedDate = dayjs(date).startOf("day").toDate();

    const updated = await Attendance.findOneAndUpdate(
      { classId, date: normalizedDate },
      { $set: { records } },
      { new: true, upsert: true }
    ).populate("records.studentId", "fullName rollNumber email");

    res.json({ attendance: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to upsert attendance", error: err.message });
  }
};

// GET: Attendance by class
exports.getAttendanceByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { date } = req.query;

    if (date) {
      const normalizedDate = dayjs(date).startOf("day").toDate();
      const attendance = await Attendance.findOne({
        classId,
        date: normalizedDate,
      }).populate("records.studentId", "fullName rollNumber email");
      return res.json({ records: attendance ? attendance.records : [] });
    }

    const attendances = await Attendance.find({ classId }).populate(
      "records.studentId",
      "fullName rollNumber email"
    );
    const allRecords = attendances.map((a) => a.records).flat();
    res.json({ records: allRecords });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch attendance", error: err.message });
  }
};

// PUT: Update attendance by ID
exports.updateAttendanceById = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const { date, records } = req.body;
    const payload = {};
    if (date) payload.date = dayjs(date).startOf("day").toDate();
    if (records) payload.records = records;

    const updated = await Attendance.findByIdAndUpdate(
      attendanceId,
      { $set: payload },
      { new: true }
    ).populate("records.studentId", "fullName rollNumber email");

    if (!updated)
      return res.status(404).json({ message: "Attendance not found" });
    res.json({ attendance: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update attendance", error: err.message });
  }
};

// DELETE: Attendance by ID
exports.deleteAttendanceById = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const deleted = await Attendance.findByIdAndDelete(attendanceId);
    if (!deleted)
      return res.status(404).json({ message: "Attendance not found" });
    res.json({ message: "Attendance deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete attendance", error: err.message });
  }
};

// GET: Attendance by student
exports.getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Attendance.find({
      "records.studentId": studentId,
    }).populate("records.studentId", "fullName rollNumber email");
    res.json({ records });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch attendance", error: err.message });
  }
};

// GET: Attendance summary per class
exports.getAttendanceSummary = async (req, res) => {
  try {
    const { date } = req.query;
    const filter = {};
    if (date) filter.date = dayjs(date).startOf("day").toDate();

    const classes = await Class.find().populate("studentIds", "fullName");
    const summaries = [];

    for (const cls of classes) {
      const attendance = await Attendance.findOne({
        classId: cls._id,
        ...filter,
      });
      let present = 0,
        absent = 0,
        leave = 0;
      if (attendance) {
        attendance.records.forEach((r) => {
          if (r.status === "present") present++;
          else if (r.status === "absent") absent++;
          else if (r.status === "leave") leave++;
        });
      }
      summaries.push({
        classId: cls._id,
        className: cls.name,
        section: cls.section,
        totalStudents: cls.studentIds.length,
        present,
        absent,
        leave,
      });
    }

    res.json({ summaries });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch summary", error: err.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const { date } = req.query; // 👈 frontend se date pass karna hoga (YYYY-MM-DD)

    const matchStage = date
      ? { $match: { date: new Date(date) } } // 👈 filter by date
      : { $match: {} };

    const summary = await Attendance.aggregate([
      matchStage,
      { $unwind: "$records" },
      {
        $group: {
          _id: { classId: "$classId" },
          totalStudents: { $sum: 1 },
          present: {
            $sum: { $cond: [{ $eq: ["$records.status", "present"] }, 1, 0] },
          },
          absent: {
            $sum: { $cond: [{ $eq: ["$records.status", "absent"] }, 1, 0] },
          },
          leave: {
            $sum: { $cond: [{ $eq: ["$records.status", "leave"] }, 1, 0] },
          },
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "_id.classId",
          foreignField: "_id",
          as: "classInfo",
        },
      },
      { $unwind: "$classInfo" },
      {
        $project: {
          classId: "$_id.classId",
          className: "$classInfo.name",
          section: "$classInfo.section",
          totalStudents: 1,
          present: 1,
          absent: 1,
          leave: 1,
        },
      },
    ]);

    res.json(summary);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch summary", error: err.message });
  }
};
