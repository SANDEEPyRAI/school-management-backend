const Teacher = require("../models/user.model"); // using User model with role = teacher

exports.createTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await Teacher.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await require("bcryptjs").hash(password, 10);
    const teacher = await Teacher.create({
      ...req.body,
      password: hashedPassword,
      role: "teacher",
    });

    res.status(201).json({ teacher });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Teacher creation failed", error: err.message });
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({ role: "teacher" }).select(
      "-password"
    );
    res.status(200).json({ teachers });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch teachers", error: err.message });
  }
};

exports.getTeacherPermissions = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const teacher = await Teacher.findById(teacherId);
    if (!teacher || teacher.role !== "teacher") {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ permissions: teacher.permissions });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch permissions", error: err.message });
  }
};
