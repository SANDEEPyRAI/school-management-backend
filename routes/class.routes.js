const express = require("express");
const router = express.Router();
const classController = require("../controllers/class.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/classes:
 *   post:
 *     tags: [Class]
 *     summary: Create a class
 *     description: Admin-only route to create a class/section
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               section: { type: string }
 *               subjects: { type: array, items: { type: string } }
 *     responses:
 *       201:
 *         description: Class created
 *       500:
 *         description: Class creation failed
 */
router.post("/", protect, isAdmin, classController.createClass);

/**
 * @swagger
 * /api/classes/{classId}/students:
 *   put:
 *     tags: [Class]
 *     summary: Assign students to class
 *     description: Admin-only route to assign students to a class
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: classId
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
 *               studentIds: { type: array, items: { type: string } }
 *     responses:
 *       200:
 *         description: Students assigned
 *       500:
 *         description: Failed to assign students
 */
router.put(
  "/:classId/students",
  protect,
  isAdmin,
  classController.assignStudents
);

/**
 * @swagger
 * /api/classes/{classId}/teachers:
 *   put:
 *     tags: [Class]
 *     summary: Assign teachers to class
 *     description: Admin-only route to assign teachers to a class
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: classId
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
 *               teacherIds: { type: array, items: { type: string } }
 *     responses:
 *       200:
 *         description: Teachers assigned
 *       500:
 *         description: Failed to assign teachers
 */
router.put(
  "/:classId/teachers",
  protect,
  isAdmin,
  classController.assignTeachers
);

/**
 * @swagger
 * /api/classes:
 *   get:
 *     tags: [Class]
 *     summary: Get all classes
 *     description: Returns list of all classes with assigned students and teachers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of classes
 *       500:
 *         description: Failed to fetch classes
 */
router.get("/", protect, classController.getAllClasses);

module.exports = router;
