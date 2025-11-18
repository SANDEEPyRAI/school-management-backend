const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");
const {
  canReadUsers,
  canEditUsers,
} = require("../middlewares/ability.middleware");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - phone
 *         - password
 *         - role
 *       properties:
 *         fullName:
 *           type: string
 *           example: Ravi Kumar
 *         email:
 *           type: string
 *           format: email
 *           example: ravi@example.com
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         password:
 *           type: string
 *           format: password
 *           example: "securePass123"
 *         role:
 *           type: string
 *           enum: [admin, teacher, student]
 *           example: student
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           example: male
 *         dob:
 *           type: string
 *           format: date
 *           example: 2005-08-15
 *         address:
 *           type: object
 *           properties:
 *             street: { type: string, example: "MG Road" }
 *             city: { type: string, example: "Delhi" }
 *             state: { type: string, example: "Delhi" }
 *             pincode: { type: string, example: "110001" }
 *         qualifications:
 *           type: array
 *           items: { type: string }
 *           example: ["B.Ed", "M.Sc"]
 *         subjects:
 *           type: array
 *           items: { type: string }
 *           example: ["Maths", "Science"]
 *         admissionNumber:
 *           type: string
 *           example: "ADM2025-001"
 *         classId:
 *           type: string
 *           description: MongoDB ObjectId of Class
 *           example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *         parentName:
 *           type: string
 *           example: "Rajesh Kumar"
 *         parentPhone:
 *           type: string
 *           example: "9876543211"
 */

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
 * /api/users:
 *   get:
 *     tags: [User]
 *     summary: List all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", protect, canReadUsers, userController.getAllUsers);

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     tags: [User]
 *     summary: Get user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get("/:userId", protect, canReadUsers, userController.getUserById);

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     tags: [User]
 *     summary: Update user
 *     description: Admin, teacher with 'users:edit', or the user themselves
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.put("/:userId", protect, canEditUsers, userController.updateUser);

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     tags: [User]
 *     summary: Delete user (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete("/:userId", protect, isAdmin, userController.deleteUser);

/**
 * @swagger
 * /api/users/{userId}/permissions:
 *   put:
 *     tags: [User]
 *     summary: Assign permissions to a teacher (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
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
 */
router.put(
  "/:userId/permissions",
  protect,
  isAdmin,
  userController.assignPermissions
);

module.exports = router;
