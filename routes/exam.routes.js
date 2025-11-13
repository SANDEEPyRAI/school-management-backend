const express = require("express");
const router = express.Router();
const examController = require("../controllers/exam.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/exams:
 *   post:
 *     tags: [Exam]
 *     summary: Create an exam
 *     description: Admin-only route to create an exam for a class
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               subject: { type: string }
 *               classId: { type: string }
 *               date: { type: string, format: date }
 *               duration: { type: number }
 *               maxMarks: { type: number }
 *     responses:
 *       201:
 *         description: Exam created
 *       500:
 *         description: Exam creation failed
 */
router.post("/", protect, isAdmin, examController.createExam);

/**
 * @swagger
 * /api/exams/class/{classId}:
 *   get:
 *     tags: [Exam]
 *     summary: Get exams by class
 *     description: Returns all exams scheduled for a class
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: classId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of exams
 *       500:
 *         description: Failed to fetch exams
 */
router.get("/class/:classId", protect, examController.getExamsByClass);

/**
 * @swagger
 * /api/exams/date/{date}:
 *   get:
 *     tags: [Exam]
 *     summary: Get exams by date
 *     description: Returns all exams scheduled on a specific date
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: date
 *         in: path
 *         required: true
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: List of exams
 *       500:
 *         description: Failed to fetch exams
 */
router.get("/date/:date", protect, examController.getExamsByDate);

module.exports = router;
