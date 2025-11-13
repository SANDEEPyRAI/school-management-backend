const express = require("express");
const router = express.Router();
const resultController = require("../controllers/result.controller");
const { protect } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/results:
 *   post:
 *     tags: [Result]
 *     summary: Record student result
 *     description: Records marks and grade for a student in an exam
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               examId: { type: string }
 *               studentId: { type: string }
 *               marksObtained: { type: number }
 *               grade: { type: string }
 *     responses:
 *       201:
 *         description: Result recorded
 *       400:
 *         description: Already recorded
 *       500:
 *         description: Failed to record result
 */
router.post("/", protect, resultController.recordResult);

/**
 * @swagger
 * /api/results/student/{studentId}:
 *   get:
 *     tags: [Result]
 *     summary: Get results by student
 *     description: Returns all results for a student
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: studentId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of results
 *       500:
 *         description: Failed to fetch results
 */
router.get(
  "/student/:studentId",
  protect,
  resultController.getResultsByStudent
);

/**
 * @swagger
 * /api/results/exam/{examId}:
 *   get:
 *     tags: [Result]
 *     summary: Get results by exam
 *     description: Returns all student results for a specific exam
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: examId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of results
 *       500:
 *         description: Failed to fetch results
 */
router.get("/exam/:examId", protect, resultController.getResultsByExam);

module.exports = router;
