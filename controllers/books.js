const { ApolloError, AuthenticationError } = require("apollo-server-express");

const Book = require("../models/Book");
const User = require("../models/User");
const validateInputs = require("../utils/validateInputs");

module.exports = {
  // GET ALL BOOKS
  books: async () => {
    const books = await Book.find().populate("addedBy");

    if (!books.length > 0)
      throw new ApolloError(
        "No book yet, You can try again later",
        "UNAVAILABLE"
      );

    return books;
  },

  // ADD A BOOK
  addBook: async (
    _,
    { title, authorFirstname, authorLastname, authorEmail },
    { reqUser }
  ) => {
    if (!(await reqUser))
      throw new AuthenticationError("Please login before you can have access");

    const user = await reqUser;

    const author = {
      firstname: authorFirstname,
      lastname: authorLastname,
      email: authorEmail,
    };

    const book = await Book.create({ title, author, addedBy: user._id });

    await User.findByIdAndUpdate(user._id, {
      $push: { addedBooks: book._id },
    });

    return await Book.findOne({ _id: book._id }).populate(
      "author",
      "username email avatar"
    );
  },

  // GET A BOOK WITH THE ID
  book: async (_, { id }) => {
    const book = await Book.findById(id).populate("addedBy");

    if (!book)
      throw new ApolloError(
        "Book is not available or have been deleted",
        "UNAVAILABLE"
      );

    return book;
  },

  // UPDATE A BOOK
  updateBook: async (_, args, { reqUser }) => {
    if (!(await reqUser))
      throw new AuthenticationError("Please login before you can have access");

    validateInputs(args);

    return await Book.findByIdAndUpdate(args.id, { ...args }, { new: true });
  },

  // DELETE A BOOK
  deleteBook: async (_, { id }, { reqUser }) => {
    if (!(await reqUser))
      throw new AuthenticationError("Please login before you can have access");
    try {
      const book = await Book.findOneAndDelete(id);
      const author = await reqUser;
      await User.findByIdAndUpdate(author._id, {
        $pull: { addedBooks: book._id },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};
