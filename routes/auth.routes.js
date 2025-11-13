const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT

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
 *           example: Sandeep Rai
 *         email:
 *           type: string
 *           format: email
 *           example: sandeep@example.com
 *         phone:
 *           type: string
 *           example: 9876543210
 *         password:
 *           type: string
 *           format: password
 *           example: secret123
 *         role:
 *           type: string
 *           enum: [admin, teacher, student]
 *           example: teacher
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *         dob:
 *           type: string
 *           format: date
 *         address:
 *           type: object
 *           properties:
 *             street: { type: string }
 *             city: { type: string }
 *             state: { type: string }
 *             pincode: { type: string }
 *         qualifications:
 *           type: array
 *           items: { type: string }
 *         subjects:
 *           type: array
 *           items: { type: string }
 *         admissionNumber: { type: string }
 *         classId: { type: string }
 *         parentName: { type: string }
 *         parentPhone: { type: string }

 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: sandeep@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: secret123
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Registers a new user (admin, teacher, or student)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Registration failed
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     description: Logs in a user and returns JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
router.post("/login", authController.login);

module.exports = router;
