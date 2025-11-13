const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/students:
 *   post:
 *     tags: [Student]
 *     summary: Create a student
 *     description: Admin-only route to create a student profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Student creation failed
 */
router.post("/", protect, isAdmin, studentController.createStudent);

/**
 * @swagger
 * /api/students:
 *   get:
 *     tags: [Student]
 *     summary: Get all students
 *     description: Returns list of all registered students
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *       500:
 *         description: Failed to fetch students
 */
router.get("/", protect, studentController.getAllStudents);

/**
 * @swagger
 * /api/students/{studentId}:
 *   put:
 *     tags: [Student]
 *     summary: Update student info
 *     description: Admin-only route to update student details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: studentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       200:
 *         description: Student updated
 *       500:
 *         description: Update failed
 */
router.put("/:studentId", protect, isAdmin, studentController.updateStudent);

module.exports = router;
