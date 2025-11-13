const express = require("express");
const router = express.Router();
const libraryController = require("../controllers/library.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/library/books:
 *   post:
 *     tags: [Library]
 *     summary: Add a book
 *     description: Admin-only route to add a book to the library
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
 *       201:
 *         description: Book added
 *       500:
 *         description: Failed to add book
 */
router.post("/books", protect, isAdmin, libraryController.addBook);

/**
 * @swagger
 * /api/library/issue:
 *   post:
 *     tags: [Library]
 *     summary: Issue a book
 *     description: Issues a book to a user if available
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
 *       201:
 *         description: Book issued
 *       400:
 *         description: Book not available
 *       500:
 *         description: Failed to issue book
 */
router.post("/issue", protect, libraryController.issueBook);

/**
 * @swagger
 * /api/library/return/{issueId}:
 *   put:
 *     tags: [Library]
 *     summary: Return a book
 *     description: Marks a book as returned and updates availability
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: issueId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Book returned
 *       400:
 *         description: Invalid issue record
 *       500:
 *         description: Failed to return book
 */
router.put("/return/:issueId", protect, libraryController.returnBook);

/**
 * @swagger
 * /api/library/issued:
 *   get:
 *     tags: [Library]
 *     summary: Get issued books
 *     description: Returns list of currently issued books
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of issued books
 *       500:
 *         description: Failed to fetch issued books
 */
router.get("/issued", protect, libraryController.getIssuedBooks);

module.exports = router;
