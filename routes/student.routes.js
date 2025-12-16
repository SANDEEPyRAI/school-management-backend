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
 *     parameters:
 *       - name: page
 *         in: query
 *         schema: { type: integer }
 *       - name: limit
 *         in: query
 *         schema: { type: integer }
 *       - name: search
 *         in: query
 *         schema: { type: string }
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
 * /api/students/class/{classId}:
 *   get:
 *     tags: [Student]
 *     summary: Get students by class
 *     description: Requires "students.view" permission. Returns list of students for a specific class.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: classId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of students by class }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch students }
 */
router.get(
  "/class/:classId",
  protect,
  checkPermission("students", "view"),
  studentController.getStudentsByClass
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

/**
 * @swagger
 * /api/students/{studentId}:
 *   delete:
 *     tags: [Student]
 *     summary: Delete a student
 *     description: Requires "students.edit" permission to delete a student profile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: studentId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Student deleted successfully }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: Student not found }
 *       500: { description: Delete failed }
 */
router.delete(
  "/:studentId",
  protect,
  checkPermission("students", "edit"),
  studentController.deleteStudent
);

module.exports = router;
