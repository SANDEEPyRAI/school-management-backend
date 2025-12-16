const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user.model");

// Helpers
const sanitizeUserOutput = (user) => {
  if (!user) return user;
  const obj = user.toObject ? user.toObject() : user;
  delete obj.password;
  return obj;
};

// Admin creates a user (teacher/student/admin)
exports.createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      role: role || "student",
    });

    res.status(201).json({ user: sanitizeUserOutput(user) });
  } catch (err) {
    res
      .status(500)
      .json({ message: "User creation failed", error: err.message });
  }
};

// Get all users (admin or teacher with read permission)
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { admissionNumber: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .populate("classId", "name section")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.status(200).json({
      users: users.map((u) => {
        const obj = u.toObject();
        delete obj.password;
        return obj;
      }),
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

// Get single user by ID (self, admin, or teacher with read permission)
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await User.findById(userId).populate(
      "classId",
      "name section"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user: sanitizeUserOutput(user) });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: err.message });
  }
};

// Update user (admin, teacher with edit rights, or self)
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // ✅ Only hash if password is provided
    if (req.body.password && req.body.password.trim() !== "") {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    } else {
      // ✅ Remove password field if empty so it doesn't overwrite existing password
      delete req.body.password;
    }

    const updated = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    }).populate("classId", "name section");

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: sanitizeUserOutput(updated) });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update user",
      error: err.message,
    });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: err.message });
  }
};

// Assign permissions to any user (admin, teacher, student)
exports.assignPermissions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { permissions } = req.body; // { exams: { view: true, edit: false }, ... }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Allowed modules list
    const allowedModules = [
      "attendance",
      "students",
      "teachers",
      "classes",
      "exams",
      "results",
      "fees",
      "dashboard",
      "events",
      "library",
      "notices",
      "timetable",
      "transport",
      "users",
    ];

    const newPermissions = {};

    allowedModules.forEach((module) => {
      if (permissions[module]) {
        newPermissions[module] = {
          view: Boolean(permissions[module].view),
          edit: Boolean(permissions[module].edit),
        };
      } else {
        // default false if not provided
        newPermissions[module] = { view: false, edit: false };
      }
    });

    user.permissions = newPermissions;
    await user.save();

    res.status(200).json({
      message: "Permissions updated successfully",
      role: user.role, // ✅ show which role got updated
      permissions: user.permissions,
    });
  } catch (err) {
    res.status(500).json({
      message: "Permission assignment failed",
      error: err.message,
    });
  }
};
