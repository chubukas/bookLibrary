const Book = require("../models/Book");
const validateInputs = require("../utils/validateInputs");

module.exports = {
  books: async () => {
    return await Book.find();
  },

  addBook: async (_, { title, author }, { reqUser }) => {
    if (!(await reqUser)) return "You are unauthorize to access this page";

    return await Book.create({ title, author });
  },

  book: async (_, { id }) => {
    return await Book.findById(id);
  },

  updateBook: async (_, args, { reqUser }) => {
    if (!(await reqUser)) return "You are unauthorize to access this page";
    validateInputs(args);
    return await Book.findByIdAndUpdate(args.id, { ...args }, { new: true });
  },

  deleteBook: async (_, { id }, { reqUser }) => {
    if (!(await reqUser)) return "You are unauthorize to access this page";
    try {
      await Book.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};
