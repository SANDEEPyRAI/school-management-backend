const express = require("express");
const router = express.Router();
const libraryController = require("../controllers/library.controller");
const { protect } = require("../middlewares/auth.middleware");
const { checkPermission } = require("../middlewares/rbac.middelware");

/**
 * @swagger
 * tags:
 *   name: Library
 *   description: Library management APIs
 */

/**
 * @swagger
 * /api/library/books:
 *   post:
 *     tags: [Library]
 *     summary: Add a book
 *     description: Requires "library.edit" permission
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
 *               author: { type: string }
 *               isbn: { type: string }
 *               category: { type: string }
 *               totalCopies: { type: number }
 *               availableCopies: { type: number }
 *     responses:
 *       201: { description: Book added }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to add book }
 */
router.post(
  "/books",
  protect,
  checkPermission("library", "edit"),
  libraryController.addBook
);

/**
 * @swagger
 * /api/library/issue:
 *   post:
 *     tags: [Library]
 *     summary: Issue a book
 *     description: Requires "library.edit" permission
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId: { type: string }
 *               userId: { type: string }
 *     responses:
 *       201: { description: Book issued }
 *       400: { description: Book not available }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to issue book }
 */
router.post(
  "/issue",
  protect,
  checkPermission("library", "edit"),
  libraryController.issueBook
);

/**
 * @swagger
 * /api/library/return/{issueId}:
 *   put:
 *     tags: [Library]
 *     summary: Return a book
 *     description: Requires "library.edit" permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: issueId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Book returned }
 *       400: { description: Invalid issue record }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to return book }
 */
router.put(
  "/return/:issueId",
  protect,
  checkPermission("library", "edit"),
  libraryController.returnBook
);

/**
 * @swagger
 * /api/library/issued:
 *   get:
 *     tags: [Library]
 *     summary: Get issued books
 *     description: Requires "library.view" permission
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of issued books }
 *       403: { description: Forbidden (RBAC) }
 *       500: { description: Failed to fetch issued books }
 */
router.get(
  "/issued",
  protect,
  checkPermission("library", "view"),
  libraryController.getIssuedBooks
);

module.exports = router;
