const Book = require("../../controllers/books");
const User = require("../../controllers/user");

module.exports = {
  addBook: Book.addBook,
  updateBook: Book.updateBook,
  deleteBook: Book.deleteBook,
  signUp: User.signUp,
  signIn: User.signIn,
};
