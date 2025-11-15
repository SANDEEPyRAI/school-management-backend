const User = require("../models/user.model");
const Fee = require("../models/fee.model");
const Payment = require("../models/payment.model");
const Attendance = require("../models/attendance.model");
const Exam = require("../models/exam.model");
// const Event = require("../models/event.model");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalTeachers = await User.countDocuments({ role: "teacher" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const totalFees = await Fee.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const collectedFees = await Payment.aggregate([
      { $group: { _id: null, collected: { $sum: "$amountPaid" } } },
    ]);

    const today = new Date().toISOString().split("T")[0];
    const todayAttendance = await Attendance.countDocuments({ date: today });

    const upcomingExams = await Exam.find({ date: { $gte: new Date() } }).limit(
      5
    );
    const upcomingEvents = []; // abhi ke liye skip

    res.status(200).json({
      users: {
        students: totalStudents,
        teachers: totalTeachers,
        admins: totalAdmins,
      },
      fees: {
        total: totalFees[0]?.total || 0,
        collected: collectedFees[0]?.collected || 0,
        pending:
          (totalFees[0]?.total || 0) - (collectedFees[0]?.collected || 0),
      },
      attendanceToday: todayAttendance,
      upcomingExams,
      upcomingEvents,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch dashboard stats", error: err.message });
  }
};
