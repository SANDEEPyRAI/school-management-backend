const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller");
const { protect } = require("../middlewares/auth.middleware");
const { checkPermission } = require("../middlewares/rbac.middelware");

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Attendance management APIs
 */

/**
 * @swagger
 * /api/attendance:
 *   post:
 *     tags: [Attendance]
 *     summary: Mark attendance (create only, prevents duplicate class+date)
 *     description: Marks attendance for a class on a specific date; fails if already marked
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               records:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     studentId:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: [present, absent, leave]
 *     responses:
 *       201:
 *         description: Attendance marked
 *       400:
 *         description: Already marked
 *       403:
 *         description: Forbidden (RBAC)
 *       500:
 *         description: Failed to mark attendance
 */
router.post(
  "/",
  protect,
  checkPermission("attendance", "edit"), // ✅ needs edit permission
  attendanceController.markAttendance
);

/**
 * @swagger
 * /api/attendance/class/{classId}:
 *   put:
 *     tags: [Attendance]
 *     summary: Upsert attendance by class and date
 *     description: Updates if attendance exists for class+date, otherwise creates new
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               records:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     studentId:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: [present, absent, leave]
 *     responses:
 *       200:
 *         description: Attendance upserted
 *       403:
 *         description: Forbidden (RBAC)
 *       500:
 *         description: Failed to upsert attendance
 */
router.put(
  "/class/:classId",
  protect,
  checkPermission("attendance", "edit"), // ✅ edit permission
  attendanceController.upsertAttendanceByClassAndDate
);

/**
 * @swagger
 * /api/attendance/{attendanceId}:
 *   put:
 *     tags: [Attendance]
 *     summary: Update attendance by ID
 *     description: Updates date and/or records by attendanceId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attendanceId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               records:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     studentId:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: [present, absent, leave]
 *     responses:
 *       200:
 *         description: Attendance updated
 *       404:
 *         description: Attendance not found
 *       403:
 *         description: Forbidden (RBAC)
 *       500:
 *         description: Failed to update attendance
 */
router.put(
  "/:attendanceId",
  protect,
  checkPermission("attendance", "edit"), // ✅ edit permission
  attendanceController.updateAttendanceById
);

/**
 * @swagger
 * /api/attendance/{attendanceId}:
 *   delete:
 *     tags: [Attendance]
 *     summary: Delete attendance by ID
 *     description: Deletes one attendance document by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attendanceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance deleted
 *       404:
 *         description: Attendance not found
 *       403:
 *         description: Forbidden (RBAC)
 *       500:
 *         description: Failed to delete attendance
 */
router.delete(
  "/:attendanceId",
  protect,
  checkPermission("attendance", "edit"), // ✅ edit permission
  attendanceController.deleteAttendanceById
);

/**
 * @swagger
 * /api/attendance/class/{classId}:
 *   get:
 *     tags: [Attendance]
 *     summary: Get attendance by class
 *     description: Returns attendance records for a class; pass ?date=YYYY-MM-DD to fetch a specific day
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Attendance records
 *       403:
 *         description: Forbidden (RBAC)
 *       500:
 *         description: Failed to fetch attendance
 */
router.get(
  "/class/:classId",
  protect,
  checkPermission("attendance", "view"), // ✅ view permission
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
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance records
 *       403:
 *         description: Forbidden (RBAC)
 *       500:
 *         description: Failed to fetch attendance
 */
router.get(
  "/student/:studentId",
  protect,
  checkPermission("attendance", "view"), // ✅ view permission
  attendanceController.getAttendanceByStudent
);

/**
 * @swagger
 * /api/attendance/summary:
 *   get:
 *     tags: [Attendance]
 *     summary: Get attendance summary per class
 *     description: Returns total students and present/absent/leave counts for each class
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Attendance summary
 *       403:
 *         description: Forbidden (RBAC)
 *       500:
 *         description: Failed to fetch summary
 */
router.get(
  "/summary",
  protect,
  checkPermission("attendance", "view"), // ✅ view permission
  attendanceController.getAttendanceSummary
);

module.exports = router;
