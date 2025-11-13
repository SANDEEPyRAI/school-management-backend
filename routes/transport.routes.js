const express = require("express");
const router = express.Router();
const transportController = require("../controllers/transport.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/transport/vehicle:
 *   post:
 *     tags: [Transport]
 *     summary: Add transport vehicle
 *     description: Admin-only route to add a bus or van
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numberPlate: { type: string }
 *               type: { type: string, enum: ["bus", "van"] }
 *               capacity: { type: number }
 *               driverName: { type: string }
 *               driverPhone: { type: string }
 *     responses:
 *       201:
 *         description: Vehicle added
 *       500:
 *         description: Failed to add vehicle
 */
router.post("/vehicle", protect, isAdmin, transportController.addVehicle);

/**
 * @swagger
 * /api/transport/route:
 *   post:
 *     tags: [Transport]
 *     summary: Create transport route
 *     description: Admin-only route to define a route and assign vehicle
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               stops: { type: array, items: { type: string } }
 *               vehicleId: { type: string }
 *     responses:
 *       201:
 *         description: Route created
 *       500:
 *         description: Failed to create route
 */
router.post("/route", protect, isAdmin, transportController.createRoute);

/**
 * @swagger
 * /api/transport/route/{routeId}/assign:
 *   put:
 *     tags: [Transport]
 *     summary: Assign students to route
 *     description: Admin-only route to assign students to a transport route
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: routeId
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
 *               studentIds: { type: array, items: { type: string } }
 *     responses:
 *       200:
 *         description: Students assigned
 *       500:
 *         description: Failed to assign students
 */
router.put(
  "/route/:routeId/assign",
  protect,
  isAdmin,
  transportController.assignStudentsToRoute
);

/**
 * @swagger
 * /api/transport/route/{routeId}:
 *   get:
 *     tags: [Transport]
 *     summary: Get route details
 *     description: Returns route, vehicle, and assigned students
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: routeId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Route details
 *       500:
 *         description: Failed to fetch route
 */
router.get("/route/:routeId", protect, transportController.getRouteDetails);

module.exports = router;
