const Book = require("./services/books");

module.exports = {
  addBook: Book.addBook,
  updateBook: Book.updateBook,
  deleteBook: Book.deleteBook,
};
