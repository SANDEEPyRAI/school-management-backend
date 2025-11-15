const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Teacher management APIs
 */

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     tags: [Teacher]
 *     summary: Create a teacher
 *     description: Admin-only route to create a teacher profile
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
 *         description: Teacher created successfully
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Teacher creation failed
 */
router.post("/", protect, isAdmin, teacherController.createTeacher);

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     tags: [Teacher]
 *     summary: Get all teachers
 *     description: Returns list of all registered teachers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of teachers
 *       500:
 *         description: Failed to fetch teachers
 */
router.get("/", protect, teacherController.getAllTeachers);

/**
 * @swagger
 * /api/teachers/{teacherId}:
 *   put:
 *     tags: [Teacher]
 *     summary: Update a teacher
 *     description: Update teacher details by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teacherId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Update failed
 */
router.put("/:teacherId", protect, isAdmin, teacherController.updateTeacher);

/**
 * @swagger
 * /api/teachers/{teacherId}:
 *   delete:
 *     tags: [Teacher]
 *     summary: Delete a teacher
 *     description: Remove a teacher profile by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teacherId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Delete failed
 */
router.delete("/:teacherId", protect, isAdmin, teacherController.deleteTeacher);

/**
 * @swagger
 * /api/teachers/{teacherId}/permissions:
 *   get:
 *     tags: [Teacher]
 *     summary: Get teacher permissions
 *     description: Returns module-wise permissions assigned to a teacher
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teacherId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Permissions returned
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Failed to fetch permissions
 */
router.get(
  "/:teacherId/permissions",
  protect,
  teacherController.getTeacherPermissions
);

module.exports = router;
