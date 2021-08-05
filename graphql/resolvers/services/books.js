const Book = require("../../../models/Book");
const validateInputs = require("../../../utils/validateInputs");

module.exports = {
  books: async () => {
    return await Book.find();
  },

  addBook: async (_, { title, author }) => {
    return await Book.create({ title, author });
  },

  book: async (_, { id }) => {
    return await Book.findById(id);
  },

  updateBook: async (_, args) => {
    validateInputs(args);
    return await Book.findByIdAndUpdate(args.id, { ...args }, { new: true });
  },

  deleteBook: async (_, { id }) => {
    try {
      await Book.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};
