const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const { protect } = require("../middlewares/auth.middleware");
const { checkPermission } = require("../middlewares/rbac.middelware");

/**
 * @swagger
 * tags:
 *   name: Event
 *   description: Event management
 */

/**
 * @swagger
 * /api/event:
 *   post:
 *     tags: [Event]
 *     summary: Create an event
 *     description: Requires "events.edit" permission
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
 *               description: { type: string }
 *               date: { type: string, format: date }
 *               location: { type: string }
 *               classId: { type: string }
 *     responses:
 *       201: { description: Event created }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Event creation failed }
 */
router.post(
  "/",
  protect,
  checkPermission("events", "edit"),
  eventController.createEvent
);

/**
 * @swagger
 * /api/event:
 *   get:
 *     tags: [Event]
 *     summary: Get all events
 *     description: Requires "events.view" permission
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of events }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch events }
 */
router.get(
  "/",
  protect,
  checkPermission("events", "view"),
  eventController.getEvents
);

/**
 * @swagger
 * /api/event/date/{date}:
 *   get:
 *     tags: [Event]
 *     summary: Get events by date
 *     description: Requires "events.view" permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: date
 *         in: path
 *         required: true
 *         schema: { type: string, format: date }
 *     responses:
 *       200: { description: List of events }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch events }
 */
router.get(
  "/date/:date",
  protect,
  checkPermission("events", "view"),
  eventController.getEventsByDate
);

/**
 * @swagger
 * /api/event/{id}:
 *   put:
 *     tags: [Event]
 *     summary: Update an event
 *     description: Requires "events.edit" permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
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
 *               title: { type: string }
 *               description: { type: string }
 *               date: { type: string, format: date }
 *               location: { type: string }
 *               classId: { type: string }
 *     responses:
 *       200: { description: Event updated }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: Event not found }
 *       500: { description: Failed to update event }
 */
router.put(
  "/:id",
  protect,
  checkPermission("events", "edit"),
  eventController.updateEvent
);

/**
 * @swagger
 * /api/event/{id}:
 *   delete:
 *     tags: [Event]
 *     summary: Delete an event
 *     description: Requires "events.edit" permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Event deleted successfully }
 *       403: { description: Forbidden (RBAC) }
 *       404: { description: Event not found }
 *       500: { description: Failed to delete event }
 */
router.delete(
  "/:id",
  protect,
  checkPermission("events", "edit"),
  eventController.deleteEvent
);

module.exports = router;
