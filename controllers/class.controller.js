const Class = require("../models/class.model");

exports.createClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json({ class: newClass });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Class creation failed", error: err.message });
  }
};

exports.assignStudents = async (req, res) => {
  try {
    const { classId } = req.params;
    const { studentIds } = req.body;
    const updated = await Class.findByIdAndUpdate(
      classId,
      {
        $addToSet: { studentIds: { $each: studentIds } },
      },
      { new: true }
    );
    res.status(200).json({ updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to assign students", error: err.message });
  }
};

exports.assignTeachers = async (req, res) => {
  try {
    const { classId } = req.params;
    const { teacherIds } = req.body;
    const updated = await Class.findByIdAndUpdate(
      classId,
      {
        $addToSet: { teacherIds: { $each: teacherIds } },
      },
      { new: true }
    );
    res.status(200).json({ updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to assign teachers", error: err.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate(
      "teacherIds studentIds",
      "fullName email role"
    );
    res.status(200).json({ classes });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch classes", error: err.message });
  }
};
