const User = require("../models/user.model");

// Admin creates a user (teacher/student)
exports.createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await require("bcryptjs").hash(password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "User creation failed", error: err.message });
  }
};

// Admin assigns permissions to a teacher
exports.assignPermissions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { permissions } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== "teacher") {
      return res.status(404).json({ message: "Teacher not found" });
    }

    user.permissions = permissions;
    await user.save();

    res.status(200).json({ message: "Permissions updated", permissions });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Permission assignment failed", error: err.message });
  }
};
