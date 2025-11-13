const express = require("express");
const router = express.Router();
const noticeController = require("../controllers/notice.controller");
const { protect } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/notices:
 *   post:
 *     tags: [Notice]
 *     summary: Create a notice
 *     description: Admin or teacher can create a notice for roles or classes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               message: { type: string }
 *               targetRoles:
 *                 type: array
 *                 items: { type: string, enum: ["admin", "teacher", "student"] }
 *               targetClasses:
 *                 type: array
 *                 items: { type: string }
 *     responses:
 *       201:
 *         description: Notice created
 *       500:
 *         description: Failed to create notice
 */
router.post("/", protect, noticeController.createNotice);

/**
 * @swagger
 * /api/notices:
 *   get:
 *     tags: [Notice]
 *     summary: Get notices for user
 *     description: Returns notices based on user's role and class
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notices
 *       500:
 *         description: Failed to fetch notices
 */
router.get("/", protect, noticeController.getNoticesForUser);

module.exports = router;
