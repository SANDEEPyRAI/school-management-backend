const express = require("express");
const router = express.Router();
const examController = require("../controllers/exam.controller");
const { protect } = require("../middlewares/auth.middleware");
const { checkPermission } = require("../middlewares/rbac.middelware");

/**
 * @swagger
 * tags:
 *   name: Exam
 *   description: Exam management
 */

/**
 * @swagger
 * /api/exams:
 *   get:
 *     tags: [Exam]
 *     summary: Get all exams
 *     description: Requires "exams.view" permission
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of all exams }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch exams }
 */
router.get(
  "/",
  protect,
  checkPermission("exams", "view"),
  examController.getAllExams
);

/**
 * @swagger
 * /api/exams:
 *   post:
 *     tags: [Exam]
 *     summary: Create an exam
 *     description: Requires "exams.edit" permission
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
 *       201: { description: Exam created }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Exam creation failed }
 */
router.post(
  "/",
  protect,
  checkPermission("exams", "edit"),
  examController.createExam
);

/**
 * @swagger
 * /api/exams/class/{classId}:
 *   get:
 *     tags: [Exam]
 *     summary: Get exams by class
 *     description: Requires "exams.view" permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: classId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of exams }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch exams }
 */
router.get(
  "/class/:classId",
  protect,
  checkPermission("exams", "view"),
  examController.getExamsByClass
);

/**
 * @swagger
 * /api/exams/date/{date}:
 *   get:
 *     tags: [Exam]
 *     summary: Get exams by date
 *     description: Requires "exams.view" permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: date
 *         in: path
 *         required: true
 *         schema: { type: string, format: date }
 *     responses:
 *       200: { description: List of exams }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch exams }
 */
router.get(
  "/date/:date",
  protect,
  checkPermission("exams", "view"),
  examController.getExamsByDate
);

/**
 * @swagger
 * /api/exams/{id}:
 *   put:
 *     tags: [Exam]
 *     summary: Update an exam
 *     description: Requires "exams.edit" permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
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
 *       200: { description: Exam updated }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: Exam not found }
 *       500: { description: Failed to update exam }
 */
router.put(
  "/:id",
  protect,
  checkPermission("exams", "edit"),
  examController.updateExam
);

/**
 * @swagger
 * /api/exams/{id}:
 *   delete:
 *     tags: [Exam]
 *     summary: Delete an exam
 *     description: Requires "exams.edit" permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Exam deleted successfully }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: Exam not found }
 *       500: { description: Failed to delete exam }
 */
router.delete(
  "/:id",
  protect,
  checkPermission("exams", "edit"),
  examController.deleteExam
);

module.exports = router;
