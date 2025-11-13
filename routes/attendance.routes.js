const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller");
const { protect } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/attendance:
 *   post:
 *     tags: [Attendance]
 *     summary: Mark attendance
 *     description: Marks attendance for a class on a specific date
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classId: { type: string }
 *               date: { type: string, format: date }
 *               records:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     studentId: { type: string }
 *                     status: { type: string, enum: ["present", "absent", "leave"] }
 *     responses:
 *       201:
 *         description: Attendance marked
 *       400:
 *         description: Already marked
 *       500:
 *         description: Failed to mark attendance
 */
router.post("/", protect, attendanceController.markAttendance);

/**
 * @swagger
 * /api/attendance/class/{classId}:
 *   get:
 *     tags: [Attendance]
 *     summary: Get attendance by class
 *     description: Returns attendance records for a class
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: classId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Attendance records
 *       500:
 *         description: Failed to fetch attendance
 */
router.get(
  "/class/:classId",
  protect,
  attendanceController.getAttendanceByClass
);

/**
 * @swagger
 * /api/attendance/student/{studentId}:
 *   get:
 *     tags: [Attendance]
 *     summary: Get attendance by student
 *     description: Returns attendance records for a student
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: studentId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Attendance records
 *       500:
 *         description: Failed to fetch attendance
 */
router.get(
  "/student/:studentId",
  protect,
  attendanceController.getAttendanceByStudent
);

module.exports = router;
