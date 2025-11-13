const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get dashboard stats
 *     description: Returns school-wide analytics for admin dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data returned
 *       500:
 *         description: Failed to fetch dashboard stats
 */
router.get("/", protect, isAdmin, dashboardController.getDashboardStats);

module.exports = router;
