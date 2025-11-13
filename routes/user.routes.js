const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [User]
 *     summary: Admin creates a user
 *     description: Admin-only route to create teacher or student users
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
 *         description: User created successfully
 *       400:
 *         description: Email already exists
 *       500:
 *         description: User creation failed
 */
router.post("/", protect, isAdmin, userController.createUser);

/**
 * @swagger
 * /api/users/{userId}/permissions:
 *   put:
 *     tags: [User]
 *     summary: Assign permissions to a teacher
 *     description: Admin-only route to assign module-wise permissions to a teacher
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissions:
 *                 type: object
 *                 additionalProperties:
 *                   type: array
 *                   items:
 *                     type: string
 *     responses:
 *       200:
 *         description: Permissions updated
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Permission assignment failed
 */
router.put(
  "/:userId/permissions",
  protect,
  isAdmin,
  userController.assignPermissions
);

module.exports = router;
