const Book = require("./services/books");

module.exports = {
  books: Book.books,
  book: Book.book,
};
