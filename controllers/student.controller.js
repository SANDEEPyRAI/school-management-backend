const Student = require("../models/user.model"); // User model with role = student
const bcrypt = require("bcryptjs");

// ✅ Create student
exports.createStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await Student.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
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

// ✅ Get all students (paginated + search)
exports.getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const filter = { role: "student" };
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { admissionNumber: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Student.countDocuments(filter);

    const students = await Student.find(filter)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      students,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch students", error: err.message });
  }
};

// ✅ Get students by class
exports.getStudentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const students = await Student.find({ role: "student", classId }).select(
      "-password"
    );
    res.status(200).json({ students });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch students by class",
      error: err.message,
    });
  }
};

// ✅ Update student
exports.updateStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const updated = await Student.findByIdAndUpdate(studentId, req.body, {
      new: true,
    }).select("-password");
    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// ✅ Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const deleted = await Student.findByIdAndDelete(studentId);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
