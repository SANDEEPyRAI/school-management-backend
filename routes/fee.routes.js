const express = require("express");
const router = express.Router();
const feeController = require("../controllers/fee.controller");
const { protect } = require("../middlewares/auth.middleware");
const { checkPermission } = require("../middlewares/rbac.middelware");

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
 *     description: Requires "fees.edit" permission
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
 *       201: { description: Fee created }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to create fee }
 */
router.post(
  "/",
  protect,
  checkPermission("fees", "edit"),
  feeController.createFee
);

/**
 * @swagger
 * /api/fees:
 *   get:
 *     tags: [Fee]
 *     summary: Get all fees
 *     description: Requires "fees.view" permission
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of all fees }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch fees }
 */
router.get(
  "/",
  protect,
  checkPermission("fees", "view"),
  feeController.getAllFees
);

/**
 * @swagger
 * /api/fees/class/{classId}:
 *   get:
 *     tags: [Fee]
 *     summary: Get fees for a specific class
 *     description: Requires "fees.view" permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: classId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of class fees }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch class fees }
 */
router.get(
  "/class/:classId",
  protect,
  checkPermission("fees", "view"),
  feeController.getClassFees
);

/**
 * @swagger
 * /api/fees/payments:
 *   post:
 *     tags: [Fee]
 *     summary: Record fee payment
 *     description: Requires "fees.edit" permission
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
 *       201: { description: Payment recorded }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to record payment }
 */
router.post(
  "/payments",
  protect,
  checkPermission("fees", "edit"),
  feeController.recordPayment
);

/**
 * @swagger
 * /api/fees/payments:
 *   get:
 *     tags: [Fee]
 *     summary: Get all payments
 *     description: Requires "fees.view" permission
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of all payments }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch payments }
 */
router.get(
  "/payments",
  protect,
  checkPermission("fees", "view"),
  feeController.getAllPayments
);

/**
 * @swagger
 * /api/fees/payments/{paymentId}:
 *   get:
 *     tags: [Fee]
 *     summary: Get payment by ID
 *     description: Requires "fees.view" permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: paymentId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Payment details }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: Payment not found }
 *       500: { description: Failed to fetch payment }
 */
router.get(
  "/payments/:paymentId",
  protect,
  checkPermission("fees", "view"),
  feeController.getPaymentById
);

/**
 * @swagger
 * /api/fees/student/{studentId}:
 *   get:
 *     tags: [Fee]
 *     summary: Get student payments
 *     description: Requires "fees.view" permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: studentId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of payments }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch payments }
 */
router.get(
  "/student/:studentId",
  protect,
  checkPermission("fees", "view"),
  feeController.getStudentPayments
);

/**
 * @swagger
 * /api/fees/{feeId}:
 *   put:
 *     tags: [Fee]
 *     summary: Update fee structure
 *     description: Requires "fees.edit" permission
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
 *       200: { description: Fee updated }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: Fee not found }
 *       500: { description: Failed to update fee }
 */
router.put(
  "/:feeId",
  protect,
  checkPermission("fees", "edit"),
  feeController.updateFee
);

/**
 * @swagger
 * /api/fees/payments/{paymentId}:
 *   put:
 *     tags: [Fee]
 *     summary: Update payment record
 *     description: Requires "fees.edit" permission
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
 *       200: { description: Payment updated }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: Payment not found }
 *       500: { description: Failed to update payment }
 */
router.put(
  "/payments/:paymentId",
  protect,
  checkPermission("fees", "edit"),
  feeController.updatePayment
);

module.exports = router;
