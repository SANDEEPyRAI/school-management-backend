const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher.controller");
const { protect } = require("../middlewares/auth.middleware");
const { checkPermission } = require("../middlewares/rbac.middelware");

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
 *     description: Requires "teachers.edit" permission to create a teacher profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201: { description: Teacher created successfully }
 *       400: { description: Email already exists }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Teacher creation failed }
 */
router.post(
  "/",
  protect,
  checkPermission("teachers", "edit"),
  teacherController.createTeacher
);

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     tags: [Teacher]
 *     summary: Get all teachers
 *     description: Requires "teachers.view" permission. Returns list of all registered teachers.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of teachers }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch teachers }
 */
router.get(
  "/",
  protect,
  checkPermission("teachers", "view"),
  teacherController.getAllTeachers
);

/**
 * @swagger
 * /api/teachers/{teacherId}:
 *   put:
 *     tags: [Teacher]
 *     summary: Update a teacher
 *     description: Requires "teachers.edit" permission to update teacher details by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teacherId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200: { description: Teacher updated successfully }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: Teacher not found }
 *       500: { description: Update failed }
 */
router.put(
  "/:teacherId",
  protect,
  checkPermission("teachers", "edit"),
  teacherController.updateTeacher
);

/**
 * @swagger
 * /api/teachers/{teacherId}:
 *   delete:
 *     tags: [Teacher]
 *     summary: Delete a teacher
 *     description: Requires "teachers.edit" permission to remove a teacher profile by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teacherId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Teacher deleted successfully }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: Teacher not found }
 *       500: { description: Delete failed }
 */
router.delete(
  "/:teacherId",
  protect,
  checkPermission("teachers", "edit"),
  teacherController.deleteTeacher
);

/**
 * @swagger
 * /api/teachers/{teacherId}/permissions:
 *   get:
 *     tags: [Teacher]
 *     summary: Get teacher permissions
 *     description: Requires "teachers.view" permission. Returns module-wise permissions assigned to a teacher.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teacherId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Permissions returned }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: Teacher not found }
 *       500: { description: Failed to fetch permissions }
 */
router.get(
  "/:teacherId/permissions",
  protect,
  checkPermission("teachers", "view"),
  teacherController.getTeacherPermissions
);

module.exports = router;
