const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const { protect } = require("../middlewares/auth.middleware");
const { checkPermission } = require("../middlewares/rbac.middelware");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard analytics APIs
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get dashboard stats
 *     description: Requires "dashboard.view" permission. Returns school-wide analytics for dashboard.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data returned
 *       403:
 *         description: Forbidden (RBAC)
 *       500:
 *         description: Failed to fetch dashboard stats
 */
router.get(
  "/",
  protect,
  checkPermission("dashboard", "view"), // ✅ RBAC check
  dashboardController.getDashboardStats
);

module.exports = router;
