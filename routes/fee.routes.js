const express = require("express");
const router = express.Router();
const feeController = require("../controllers/fee.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/fees:
 *   post:
 *     tags: [Fee]
 *     summary: Create fee structure
 *     description: Admin-only route to define fee for a class
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classId: { type: string }
 *               amount: { type: number }
 *               dueDate: { type: string, format: date }
 *               description: { type: string }
 *     responses:
 *       201:
 *         description: Fee created
 *       500:
 *         description: Failed to create fee
 */
router.post("/", protect, isAdmin, feeController.createFee);

/**
 * @swagger
 * /api/fees/payments:
 *   post:
 *     tags: [Fee]
 *     summary: Record fee payment
 *     description: Records payment made by a student
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId: { type: string }
 *               feeId: { type: string }
 *               amountPaid: { type: number }
 *               status: { type: string, enum: ["paid", "partial", "unpaid"] }
 *     responses:
 *       201:
 *         description: Payment recorded
 *       500:
 *         description: Failed to record payment
 */
router.post("/payments", protect, feeController.recordPayment);

/**
 * @swagger
 * /api/fees/student/{studentId}:
 *   get:
 *     tags: [Fee]
 *     summary: Get student payments
 *     description: Returns all fee payments made by a student
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: studentId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of payments
 *       500:
 *         description: Failed to fetch payments
 */
router.get("/student/:studentId", protect, feeController.getStudentPayments);

module.exports = router;
