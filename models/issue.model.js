const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issueDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    returned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
