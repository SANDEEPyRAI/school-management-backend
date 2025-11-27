const express = require("express");
const router = express.Router();
const classController = require("../controllers/class.controller");
const { protect } = require("../middlewares/auth.middleware");
const { checkPermission } = require("../middlewares/rbac.middelware");

/**
 * @swagger
 * tags:
 *   name: Class
 *   description: Class and section management APIs
 */

/**
 * @swagger
 * /api/classes:
 *   post:
 *     tags: [Class]
 *     summary: Create a class
 *     description: Requires "classes.edit" permission
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
 *       201: { description: Class created }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Class creation failed }
 */
router.post(
  "/",
  protect,
  checkPermission("classes", "edit"),
  classController.createClass
);

/**
 * @swagger
 * /api/classes/{classId}:
 *   get:
 *     tags: [Class]
 *     summary: Get class by ID
 *     description: Requires "classes.view" permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Class details }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: Class not found }
 *       500: { description: Failed to fetch class }
 */
router.get(
  "/:classId",
  protect,
  checkPermission("classes", "view"),
  classController.getClassById
);

/**
 * @swagger
 * /api/classes:
 *   get:
 *     tags: [Class]
 *     summary: Get all classes
 *     description: Requires "classes.view" permission
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of classes }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch classes }
 */
router.get(
  "/",
  protect,
  checkPermission("classes", "view"),
  classController.getAllClasses
);

/**
 * @swagger
 * /api/classes/{classId}/students:
 *   put:
 *     tags: [Class]
 *     summary: Assign students to class
 *     description: Requires "classes.edit" permission
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:classId/students",
  protect,
  checkPermission("classes", "edit"),
  classController.assignStudents
);

/**
 * @swagger
 * /api/classes/{classId}/teachers:
 *   put:
 *     tags: [Class]
 *     summary: Assign teachers to class
 *     description: Requires "classes.edit" permission
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:classId/teachers",
  protect,
  checkPermission("classes", "edit"),
  classController.assignTeachers
);

/**
 * @swagger
 * /api/classes/{classId}:
 *   put:
 *     tags: [Class]
 *     summary: Update class
 *     description: Requires "classes.edit" permission
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:classId",
  protect,
  checkPermission("classes", "edit"),
  classController.updateClass
);

/**
 * @swagger
 * /api/classes/{classId}:
 *   delete:
 *     tags: [Class]
 *     summary: Delete class
 *     description: Requires "classes.edit" permission
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:classId",
  protect,
  checkPermission("classes", "edit"),
  classController.deleteClass
);

module.exports = router;
