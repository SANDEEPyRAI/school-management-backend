const express = require("express");
const router = express.Router();
const feeController = require("../controllers/fee.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

/**
 * @swagger
 * tags:
 *   name: Fee
 *   description: Fee and Payment management
 */

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
 * /api/fees:
 *   get:
 *     tags: [Fee]
 *     summary: Get all fees
 *     description: Admin-only route to fetch all fee structures
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all fees
 *       500:
 *         description: Failed to fetch fees
 */
router.get("/", protect, isAdmin, feeController.getAllFees);

/**
 * @swagger
 * /api/fees/class/{classId}:
 *   get:
 *     tags: [Fee]
 *     summary: Get fees for a specific class
 *     description: Admin-only route to fetch fees for a class
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: classId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of class fees
 *       500:
 *         description: Failed to fetch class fees
 */
router.get("/class/:classId", protect, isAdmin, feeController.getClassFees);

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
router.post("/payments", protect, isAdmin, feeController.recordPayment);

/**
 * @swagger
 * /api/fees/payments:
 *   get:
 *     tags: [Fee]
 *     summary: Get all payments
 *     description: Admin-only route to fetch all fee payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all payments
 *       500:
 *         description: Failed to fetch payments
 */
router.get("/payments", protect, isAdmin, feeController.getAllPayments);

/**
 * @swagger
 * /api/fees/payments/{paymentId}:
 *   get:
 *     tags: [Fee]
 *     summary: Get payment by ID
 *     description: Admin-only route to fetch a single payment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: paymentId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Payment details
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Failed to fetch payment
 */
router.get(
  "/payments/:paymentId",
  protect,
  isAdmin,
  feeController.getPaymentById
);

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

/**
 * @swagger
 * /api/fees/{feeId}:
 *   put:
 *     tags: [Fee]
 *     summary: Update fee structure
 *     description: Admin-only route to update fee details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: feeId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount: { type: number }
 *               dueDate: { type: string, format: date }
 *               description: { type: string }
 *     responses:
 *       200:
 *         description: Fee updated
 *       404:
 *         description: Fee not found
 *       500:
 *         description: Failed to update fee
 */
router.put("/:feeId", protect, isAdmin, feeController.updateFee);

/**
 * @swagger
 * /api/fees/payments/{paymentId}:
 *   put:
 *     tags: [Fee]
 *     summary: Update payment record
 *     description: Admin-only route to update payment details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: paymentId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amountPaid: { type: number }
 *               status: { type: string, enum: ["paid", "partial", "unpaid"] }
 *     responses:
 *       200:
 *         description: Payment updated
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Failed to update payment
 */
router.put(
  "/payments/:paymentId",
  protect,
  isAdmin,
  feeController.updatePayment
);

module.exports = router;
