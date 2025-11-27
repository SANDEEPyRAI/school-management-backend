const express = require("express");
const router = express.Router();
const transportController = require("../controllers/transport.controller");
const { protect } = require("../middlewares/auth.middleware");
const { checkPermission } = require("../middlewares/rbac.middelware");

/**
 * @swagger
 * tags:
 *   name: Transport
 *   description: Transport management APIs
 */

/**
 * @swagger
 * /api/transport/vehicle:
 *   post:
 *     tags: [Transport]
 *     summary: Add transport vehicle
 *     description: Requires "transport.edit" permission to add a bus or van
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
 *       201: { description: Vehicle added }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to add vehicle }
 */
router.post(
  "/vehicle",
  protect,
  checkPermission("transport", "edit"),
  transportController.addVehicle
);

/**
 * @swagger
 * /api/transport/route:
 *   post:
 *     tags: [Transport]
 *     summary: Create transport route
 *     description: Requires "transport.edit" permission to define a route and assign vehicle
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
 *       201: { description: Route created }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to create route }
 */
router.post(
  "/route",
  protect,
  checkPermission("transport", "edit"),
  transportController.createRoute
);

/**
 * @swagger
 * /api/transport/route/{routeId}/assign:
 *   put:
 *     tags: [Transport]
 *     summary: Assign students to route
 *     description: Requires "transport.edit" permission to assign students to a transport route
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
 *       200: { description: Students assigned }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to assign students }
 */
router.put(
  "/route/:routeId/assign",
  protect,
  checkPermission("transport", "edit"),
  transportController.assignStudentsToRoute
);

/**
 * @swagger
 * /api/transport/route/{routeId}:
 *   get:
 *     tags: [Transport]
 *     summary: Get route details
 *     description: Requires "transport.view" permission. Returns route, vehicle, and assigned students.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: routeId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Route details }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch route }
 */
router.get(
  "/route/:routeId",
  protect,
  checkPermission("transport", "view"),
  transportController.getRouteDetails
);

module.exports = router;
