const Student = require("../models/user.model"); // using User model with role = student

exports.createStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await Student.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await require("bcryptjs").hash(password, 10);
    const student = await Student.create({
      ...req.body,
      password: hashedPassword,
      role: "student",
    });

    res.status(201).json({ student });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Student creation failed", error: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ role: "student" }).select(
      "-password"
    );
    res.status(200).json({ students });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch students", error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const updated = await Student.findByIdAndUpdate(studentId, req.body, {
      new: true,
    });
    res.status(200).json({ updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};
