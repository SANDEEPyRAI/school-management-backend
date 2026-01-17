const express = require("express");
const router = express.Router();
const examTypeController = require("../controllers/examType.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     ExamType:
 *       type: object
 *       required:
 *         - category
 *         - title
 *       properties:
 *         category:
 *           type: string
 *           enum: [MonthlyTest, Quarterly, Final, Custom]
 *           example: MonthlyTest
 *         title:
 *           type: string
 *           example: Monthly Test 1
 *         description:
 *           type: string
 *           example: First monthly test of the year
 *         isActive:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /api/exam-types:
 *   post:
 *     tags: [ExamTypes]
 *     summary: Create a new exam type
 *     description: Creates a new exam type (MonthlyTest, Quarterly, Final, or Custom)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExamType'
 *     responses:
 *       201:
 *         description: Exam type created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Failed to create exam type
 */
router.post("/", examTypeController.createExamType);

/**
 * @swagger
 * /api/exam-types:
 *   get:
 *     tags: [ExamTypes]
 *     summary: Get all exam types
 *     description: Fetches all active exam types
 *     responses:
 *       200:
 *         description: List of exam types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 examTypes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ExamType'
 *       500:
 *         description: Failed to fetch exam types
 */
router.get("/", examTypeController.getExamTypes);

module.exports = router;
