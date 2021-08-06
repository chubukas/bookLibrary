const Book = require("../../controllers/books");
const User = require("../../controllers/user");

module.exports = {
  books: Book.books,
  book: Book.book,
  users: User.users,
  user: User.user,
};
