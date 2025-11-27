const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");
const { checkPermission } = require("../middlewares/rbac.middelware");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management APIs
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
 *         fullName: { type: string, example: Ravi Kumar }
 *         email: { type: string, format: email, example: ravi@example.com }
 *         phone: { type: string, example: "9876543210" }
 *         password: { type: string, format: password, example: "securePass123" }
 *         role: { type: string, enum: [admin, teacher, student], example: student }
 *         gender: { type: string, enum: [male, female, other], example: male }
 *         dob: { type: string, format: date, example: 2005-08-15 }
 *         address:
 *           type: object
 *           properties:
 *             street: { type: string, example: "MG Road" }
 *             city: { type: string, example: "Delhi" }
 *             state: { type: string, example: "Delhi" }
 *             pincode: { type: string, example: "110001" }
 *         qualifications: { type: array, items: { type: string }, example: ["B.Ed", "M.Sc"] }
 *         subjects: { type: array, items: { type: string }, example: ["Maths", "Science"] }
 *         admissionNumber: { type: string, example: "ADM2025-001" }
 *         classId: { type: string, description: MongoDB ObjectId of Class, example: "64f1a2b3c4d5e6f7a8b9c0d1" }
 *         parentName: { type: string, example: "Rajesh Kumar" }
 *         parentPhone: { type: string, example: "9876543211" }
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [User]
 *     summary: Create a user
 *     description: Requires "users.edit" permission to create teacher or student users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201: { description: User created successfully }
 *       400: { description: Email already exists }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: User creation failed }
 */
router.post(
  "/",
  protect,
  checkPermission("users", "edit"),
  userController.createUser
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [User]
 *     summary: List all users
 *     description: Requires "users.view" permission
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of users }
 *       403: { description: Forbidden (RBAC) }
 */
router.get(
  "/",
  protect,
  checkPermission("users", "view"),
  userController.getAllUsers
);

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     tags: [User]
 *     summary: Get user by ID
 *     description: Requires "users.view" permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: User details }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: User not found }
 */
router.get(
  "/:userId",
  protect,
  checkPermission("users", "view"),
  userController.getUserById
);

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     tags: [User]
 *     summary: Update user
 *     description: Requires "users.edit" permission (admin, teacher with edit, or the user themselves)
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
 *       200: { description: User updated }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: User not found }
 */
router.put(
  "/:userId",
  protect,
  checkPermission("users", "edit"),
  userController.updateUser
);

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     tags: [User]
 *     summary: Delete user
 *     description: Requires "users.edit" permission (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: User deleted }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: User not found }
 */
router.delete(
  "/:userId",
  protect,
  checkPermission("users", "edit"),
  userController.deleteUser
);

/**
 * @swagger
 * /api/users/{userId}/permissions:
 *   put:
 *     tags: [User]
 *     summary: Assign permissions to a user
 *     description: Requires "users.edit" permission (admin only)
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
 *                 properties:
 *                   attendance: { type: object, properties: { view: { type: boolean }, edit: { type: boolean } } }
 *                   students: { type: object, properties: { view: { type: boolean }, edit: { type: boolean } } }
 *                   teachers: { type: object, properties: { view: { type: boolean }, edit: { type: boolean } } }
 *                   classes: { type: object, properties: { view: { type: boolean }, edit: { type: boolean } } }
 *                   exams: { type: object, properties: { view: { type: boolean }, edit: { type: boolean } } }
 *                   results: { type: object, properties: { view: { type: boolean }, edit: { type: boolean } } }
 *                   fees: { type: object, properties: { view: { type: boolean }, edit: { type: boolean } } }
 *                   dashboard: { type: object, properties: { view: { type: boolean }, edit: { type: boolean } } }
 *                   notices: { type: object, properties: { view: { type: boolean }, edit: { type: boolean } } }
 *                   timetable: { type: object, properties: { view: { type: boolean }, edit: { type: boolean } } }
 *                   transport: { type: object, properties: { view: { type: boolean }, edit: { type: boolean } } }
 *                   library: { type: object, properties: { view: { type: boolean }, edit: { type: boolean } } }
 *     responses:
 *       200: { description: Permissions updated }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: User not found }
 */
router.put(
  "/:userId/permissions",
  protect,
  checkPermission("users", "edit"),
  userController.assignPermissions
);

module.exports = router;
