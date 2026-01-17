const Class = require("../models/class.model");

// Create a class
exports.createClass = async (req, res) => {
  try {
    // create new class
    const newClass = await Class.create(req.body);

    // ✅ re-fetch with populate to include subject name
    const populatedClass = await Class.findById(newClass._id).populate(
      "subjects",
      "_id name"
    ); // only id + name
    // .populate("classTeacher", "_id fullName email"); // optional: teacher details

    res.status(201).json({ class: populatedClass });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Class creation failed", error: err.message });
  }
};

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("teacherIds", "fullName email role")
      .populate("studentIds", "fullName email role")
      .populate("subjects", "_id name");

    res.status(200).json({ classes });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch classes", error: err.message });
  }
};

// ✅ Get class by ID (needed for frontend dropdown + attendance table)
exports.getClassById = async (req, res) => {
  try {
    const { classId } = req.params;
    const cls = await Class.findById(classId)
      .populate("teacherIds", "fullName email role")
      .populate("studentIds", "fullName email role");

    if (!cls) return res.status(404).json({ message: "Class not found" });
    res.status(200).json({ class: cls });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch class", error: err.message });
  }
};

// Assign students
exports.assignStudents = async (req, res) => {
  try {
    const { classId } = req.params;
    const { studentIds } = req.body;
    const updated = await Class.findByIdAndUpdate(
      classId,
      { $addToSet: { studentIds: { $each: studentIds } } },
      { new: true }
    ).populate("teacherIds studentIds", "fullName email role");

    if (!updated) return res.status(404).json({ message: "Class not found" });
    res.status(200).json({ updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to assign students", error: err.message });
  }
};

// Assign teachers
exports.assignTeachers = async (req, res) => {
  try {
    const { classId } = req.params;
    const { teacherIds } = req.body;
    const updated = await Class.findByIdAndUpdate(
      classId,
      { $addToSet: { teacherIds: { $each: teacherIds } } },
      { new: true }
    ).populate("teacherIds studentIds", "fullName email role");

    if (!updated) return res.status(404).json({ message: "Class not found" });
    res.status(200).json({ updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to assign teachers", error: err.message });
  }
};

// Update class
exports.updateClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const updated = await Class.findByIdAndUpdate(classId, req.body, {
      new: true,
    }).populate("teacherIds studentIds", "fullName email role");

    if (!updated) return res.status(404).json({ message: "Class not found" });
    res.status(200).json({ updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Delete class
exports.deleteClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const deleted = await Class.findByIdAndDelete(classId);

    if (!deleted) return res.status(404).json({ message: "Class not found" });
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
