const Book = require("../../controllers/books");

module.exports = {
  books: Book.books,
  book: Book.book,
};
