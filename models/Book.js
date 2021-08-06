const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
    },
    author: {
      firstname: { type: String },
      lastname: { type: String },
      email: { type: String },
    },
    addedBy: {
      type: String,
      required: [true, "Book author is required"],
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Books", bookSchema);

module.exports = Book;
