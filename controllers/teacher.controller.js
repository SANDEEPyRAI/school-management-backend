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

// exports.getAllTeachers = async (req, res) => {
//   try {
//     const teachers = await Teacher.find({ role: "teacher" }).select(
//       "-password"
//     );
//     res.status(200).json({ teachers });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch teachers", error: err.message });
//   }
// };
exports.getAllTeachers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const filter = { role: "teacher" };
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Teacher.countDocuments(filter);

    const teachers = await Teacher.find(filter)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      teachers,
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

// controllers/teacher.controller.js

exports.updateTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const updated = await Teacher.findByIdAndUpdate(teacherId, req.body, {
      new: true,
    }).select("-password"); // password hide karna better hai

    if (!updated) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const deleted = await Teacher.findByIdAndDelete(teacherId);

    if (!deleted) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
