const express = require("express");
const router = express.Router();
const noticeController = require("../controllers/notice.controller");
const { protect } = require("../middlewares/auth.middleware");
const { checkPermission } = require("../middlewares/rbac.middelware");

/**
 * @swagger
 * tags:
 *   name: Notice
 *   description: Notice management APIs
 */

/**
 * @swagger
 * /api/notices:
 *   post:
 *     tags: [Notice]
 *     summary: Create a notice
 *     description: Requires "notices.edit" permission. Admin or teacher can create a notice for roles or classes.
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
 *       201: { description: Notice created }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to create notice }
 */
router.post(
  "/",
  protect,
  checkPermission("notices", "edit"),
  noticeController.createNotice
);

/**
 * @swagger
 * /api/notices:
 *   get:
 *     tags: [Notice]
 *     summary: Get notices for user
 *     description: Requires "notices.view" permission. Returns notices based on user's role and class.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of notices }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch notices }
 */
router.get(
  "/",
  protect,
  checkPermission("notices", "view"),
  noticeController.getNoticesForUser
);

module.exports = router;
