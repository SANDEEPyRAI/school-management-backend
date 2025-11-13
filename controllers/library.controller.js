const Book = require("../models/book.model");
const Issue = require("../models/issue.model");

exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ book });
  } catch (err) {
    res.status(500).json({ message: "Failed to add book", error: err.message });
  }
};

exports.issueBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const book = await Book.findById(bookId);
    if (!book || book.availableCopies < 1) {
      return res.status(400).json({ message: "Book not available" });
    }

    await Issue.create({ bookId, userId });
    book.availableCopies -= 1;
    await book.save();

    res.status(201).json({ message: "Book issued" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to issue book", error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { issueId } = req.params;
    const issue = await Issue.findById(issueId);
    if (!issue || issue.returned) {
      return res.status(400).json({ message: "Invalid issue record" });
    }

    issue.returned = true;
    issue.returnDate = new Date();
    await issue.save();

    const book = await Book.findById(issue.bookId);
    book.availableCopies += 1;
    await book.save();

    res.status(200).json({ message: "Book returned" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to return book", error: err.message });
  }
};

exports.getIssuedBooks = async (req, res) => {
  try {
    const issues = await Issue.find({ returned: false }).populate(
      "bookId userId",
      "title fullName email"
    );
    res.status(200).json({ issues });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch issued books", error: err.message });
  }
};
