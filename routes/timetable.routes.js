const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetable.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/timetable:
 *   post:
 *     tags: [Timetable]
 *     summary: Create or update timetable
 *     description: Admin-only route to create or update weekly timetable for a class
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
 *               day: { type: string, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
 *               slots:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     period: { type: number }
 *                     subject: { type: string }
 *                     teacherId: { type: string }
 *                     startTime: { type: string }
 *                     endTime: { type: string }
 *     responses:
 *       201:
 *         description: Timetable created
 *       200:
 *         description: Timetable updated
 *       500:
 *         description: Failed to create/update timetable
 */
router.post("/", protect, isAdmin, timetableController.createTimetable);

/**
 * @swagger
 * /api/timetable/class/{classId}:
 *   get:
 *     tags: [Timetable]
 *     summary: Get timetable by class
 *     description: Returns weekly timetable for a class
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: classId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Timetable returned
 *       500:
 *         description: Failed to fetch timetable
 */
router.get("/class/:classId", protect, timetableController.getTimetableByClass);

/**
 * @swagger
 * /api/timetable/teacher/{teacherId}:
 *   get:
 *     tags: [Timetable]
 *     summary: Get timetable by teacher
 *     description: Returns all timetable slots assigned to a teacher
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teacherId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Timetable returned
 *       500:
 *         description: Failed to fetch timetable
 */
router.get(
  "/teacher/:teacherId",
  protect,
  timetableController.getTimetableByTeacher
);

module.exports = router;
