const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const { protect } = require("../middlewares/auth.middleware");
const { checkPermission } = require("../middlewares/rbac.middelware");

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student management APIs
 */

/**
 * @swagger
 * /api/students:
 *   post:
 *     tags: [Student]
 *     summary: Create a student
 *     description: Requires "students.edit" permission to create a student profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201: { description: Student created successfully }
 *       400: { description: Email already exists }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Student creation failed }
 */
router.post(
  "/",
  protect,
  checkPermission("students", "edit"),
  studentController.createStudent
);

/**
 * @swagger
 * /api/students:
 *   get:
 *     tags: [Student]
 *     summary: Get all students
 *     description: Requires "students.view" permission. Returns list of all registered students.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of students }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch students }
 */
router.get(
  "/",
  protect,
  checkPermission("students", "view"),
  studentController.getAllStudents
);

/**
 * @swagger
 * /api/students/{studentId}:
 *   put:
 *     tags: [Student]
 *     summary: Update student info
 *     description: Requires "students.edit" permission to update student details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: studentId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       200: { description: Student updated }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: Student not found }
 *       500: { description: Update failed }
 */
router.put(
  "/:studentId",
  protect,
  checkPermission("students", "edit"),
  studentController.updateStudent
);

module.exports = router;
