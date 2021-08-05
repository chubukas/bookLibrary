const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
    },
    author: {
      type: String,
      required: [true, "Book author is required"],
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Books", bookSchema);

module.exports = Book;
