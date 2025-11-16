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
 * /api/classes/{classId}:
 *   get:
 *     tags: [Class]
 *     summary: Get class by ID
 *     description: Returns class details with students and teachers populated
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the class to fetch
 *     responses:
 *       200:
 *         description: Class details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 class:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     section:
 *                       type: string
 *                     teacherIds:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id: { type: string }
 *                           fullName: { type: string }
 *                           email: { type: string }
 *                           role: { type: string }
 *                     studentIds:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id: { type: string }
 *                           fullName: { type: string }
 *                           email: { type: string }
 *                           role: { type: string }
 *       404:
 *         description: Class not found
 *       500:
 *         description: Failed to fetch class
 */
router.get("/classes/:classId", protect, classController.getClassById);

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

/**
 * @swagger
 * /api/classes/{classId}/students:
 *   put:
 *     tags: [Class]
 *     summary: Assign students to class
 *     description: Admin-only route to assign students to a class
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
 */
router.put(
  "/:classId/teachers",
  protect,
  isAdmin,
  classController.assignTeachers
);

/**
 * @swagger
 * /api/classes/{classId}:
 *   put:
 *     tags: [Class]
 *     summary: Update class
 *     description: Admin-only route to update class details
 */
router.put("/:classId", protect, isAdmin, classController.updateClass);

/**
 * @swagger
 * /api/classes/{classId}:
 *   delete:
 *     tags: [Class]
 *     summary: Delete class
 *     description: Admin-only route to delete a class
 */
router.delete("/:classId", protect, isAdmin, classController.deleteClass);

module.exports = router;
