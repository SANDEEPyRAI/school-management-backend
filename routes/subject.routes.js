// routes/subject.routes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/subject.controller");

/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: Class-wise subject management
 *
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       required:
 *         - name
 *         - code
 *         - classId
 *       properties:
 *         _id:
 *           type: string
 *           example: 67890abc123
 *         name:
 *           type: string
 *           example: Mathematics
 *         code:
 *           type: string
 *           example: MATH
 *         classId:
 *           type: string
 *           example: 691752cf737197256606cead
 *         isActive:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     tags: [Subjects]
 *     summary: Create a new subject
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       201:
 *         description: Subject created successfully
 *       500:
 *         description: Failed to create subject
 */
router.post("/", ctrl.createSubject);

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     tags: [Subjects]
 *     summary: Get all subjects
 *     responses:
 *       200:
 *         description: List of subjects
 *       500:
 *         description: Failed to fetch subjects
 */
router.get("/", ctrl.getAllSubjects);

/**
 * @swagger
 * /api/subjects/class/{classId}:
 *   get:
 *     tags: [Subjects]
 *     summary: Get subjects by class
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         description: Class ID
 *     responses:
 *       200:
 *         description: Subjects for the given class
 *       500:
 *         description: Failed to fetch subjects
 */
router.get("/class/:classId", ctrl.getSubjectsByClass);

/**
 * @swagger
 * /api/subjects/{id}:
 *   put:
 *     tags: [Subjects]
 *     summary: Update subject
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Failed to update subject
 */
router.put("/:id", ctrl.updateSubject);

/**
 * @swagger
 * /api/subjects/{id}:
 *   delete:
 *     tags: [Subjects]
 *     summary: Delete subject (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject archived successfully
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Failed to delete subject
 */
router.delete("/:id", ctrl.deleteSubject);

module.exports = router;
