const express = require("express");
const router = express.Router();
const resultController = require("../controllers/result.controller");
const { protect } = require("../middlewares/auth.middleware");
const { checkPermission } = require("../middlewares/rbac.middelware");

/**
 * @swagger
 * /api/results:
 *   post:
 *     tags: [Result]
 *     summary: Record student result
 *     description: Records subject-wise marks and grade for a student in an exam
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               examId:
 *                 type: string
 *               studentId:
 *                 type: string
 *               classId:
 *                 type: string
 *               marksObtained:
 *                 type: object
 *                 properties:
 *                   hindi: { type: number, minimum: 0 }
 *                   english: { type: number, minimum: 0 }
 *                   maths: { type: number, minimum: 0 }
 *                   science: { type: number, minimum: 0 }
 *                   socialScience: { type: number, minimum: 0 }
 *                   physics: { type: number, minimum: 0 }
 *                   chemistry: { type: number, minimum: 0 }
 *                   biology: { type: number, minimum: 0 }
 *                   computer: { type: number, minimum: 0 }
 *                   economics: { type: number, minimum: 0 }
 *                   businessStudies: { type: number, minimum: 0 }
 *                   accountancy: { type: number, minimum: 0 }
 *                   geography: { type: number, minimum: 0 }
 *                   politicalScience: { type: number, minimum: 0 }
 *                   history: { type: number, minimum: 0 }
 *                   psychology: { type: number, minimum: 0 }
 *               grade:
 *                 type: string
 *     responses:
 *       201:
 *         description: Result recorded
 *       400:
 *         description: Already recorded
 *       403:
 *         description: Forbidden (RBAC)
 *       500:
 *         description: Failed to record result
 */

router.post(
  "/",
  protect,
  checkPermission("results", "edit"), // ✅ create/edit both handled by "edit"
  resultController.recordResult
);

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
 *       403:
 *         description: Forbidden (RBAC)
 *       500:
 *         description: Failed to fetch results
 */
router.get(
  "/student/:studentId",
  protect,
  checkPermission("results", "view"),
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
 *       403:
 *         description: Forbidden (RBAC)
 *       500:
 *         description: Failed to fetch results
 */
router.get(
  "/exam/:examId",
  protect,
  checkPermission("results", "view"),
  resultController.getResultsByExam
);

/**
 * @swagger
 * /api/results:
 *   get:
 *     tags: [Result]
 *     summary: Get all results
 *     description: Returns all results across exams and students
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all results
 *       403:
 *         description: Forbidden (RBAC)
 *       500:
 *         description: Failed to fetch results
 */
router.get(
  "/",
  protect,
  checkPermission("results", "view"),
  resultController.getAllResults
);

/**
 * @swagger
 * /api/results/{id}:
 *   put:
 *     tags: [Result]
 *     summary: Update student result
 *     description: Updates subject-wise marks and grade for a student in an exam
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Result ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               examId:
 *                 type: string
 *               studentId:
 *                 type: string
 *               classId:
 *                 type: string
 *               marksObtained:
 *                 type: object
 *                 properties:
 *                   hindi: { type: number, minimum: 0 }
 *                   english: { type: number, minimum: 0 }
 *                   maths: { type: number, minimum: 0 }
 *                   science: { type: number, minimum: 0 }
 *                   socialScience: { type: number, minimum: 0 }
 *                   physics: { type: number, minimum: 0 }
 *                   chemistry: { type: number, minimum: 0 }
 *                   biology: { type: number, minimum: 0 }
 *                   computer: { type: number, minimum: 0 }
 *                   economics: { type: number, minimum: 0 }
 *                   businessStudies: { type: number, minimum: 0 }
 *                   accountancy: { type: number, minimum: 0 }
 *                   geography: { type: number, minimum: 0 }
 *                   politicalScience: { type: number, minimum: 0 }
 *                   history: { type: number, minimum: 0 }
 *                   psychology: { type: number, minimum: 0 }
 *               grade:
 *                 type: string
 *     responses:
 *       200:
 *         description: Result updated
 *       404:
 *         description: Result not found
 *       403:
 *         description: Forbidden (RBAC)
 *       500:
 *         description: Failed to update result
 */

router.put(
  "/:id",
  protect,
  checkPermission("results", "edit"),
  resultController.updateResult
);

/**
 * @swagger
 * /api/results/{id}:
 *   delete:
 *     tags: [Result]
 *     summary: Delete a result
 *     description: Deletes a specific result record by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Result deleted successfully
 *       404:
 *         description: Result not found
 *       403:
 *         description: Forbidden (RBAC)
 *       500:
 *         description: Failed to delete result
 */
router.delete(
  "/:id",
  protect,
  checkPermission("results", "edit"), // ✅ delete also considered "edit"
  resultController.deleteResult
);

module.exports = router;
