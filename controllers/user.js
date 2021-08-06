const jwt = require("jsonwebtoken");
const {
  UserInputError,
  ApolloError,
  AuthenticationError,
} = require("apollo-server-express");

const User = require("../models/User");
const validateEmail = require("../utils/validateEmail");
const gravatar = require("../utils/gravatar");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // payload + secret + expire time
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  // REGISTER A USER
  signUp: async (
    _,
    { inputs: { username, email, password, comfirmPassword } }
  ) => {
    // validate email
    if (!validateEmail(email))
      throw new UserInputError("Please use a valid email");

    // check if password matches
    if (password !== comfirmPassword)
      throw new UserInputError("The passwords does not match");

    // sanitaze the username
    const UserName = username.replace(/\s+/g, "").toLowerCase();

    let user = await User.findOne({
      $or: [{ username: UserName }, { email }],
    });

    // check if username and email exist
    if (user && user.username === UserName)
      throw new UserInputError("Username already exist");

    if (user && user.email === email)
      throw new UserInputError("Email already exist");

    username = username.replace(/\s+/g, "");
    const avatar = gravatar(email);

    user = await User.create({
      username,
      email,
      password,
      avatar,
    });

    return `your registeration is successful. Thank You!!!`;
  },

  // SIGNIN A USER
  signIn: async (_, { UserNameOrEmail, password }) => {
    // sanitaze the username
    const UserNameEmail = UserNameOrEmail.replace(/\s+/g, "").toLowerCase();

    const user = await User.findOne({
      $or: [{ username: UserNameEmail }, { email: UserNameEmail }],
    }).select("+password"); // select expiclity password;

    if (!user)
      throw new UserInputError("Sorry you are not registered in this platform");

    if (!(await user.correctPassword(password, user.password)))
      throw new UserInputError("Incorrect user details");

    return signToken(user._id);
  },

  //GET ALL USERS
  users: async (_, arges, { reqUser }) => {
    if (!(await reqUser))
      throw new AuthenticationError("Please login before you can have access");

    const users = await User.find().populate("addedBooks");

    if (!users.length > 0)
      throw new ApolloError(
        "No users yet, Please try again later",
        "UNAVAILABLE"
      );

    return users;
  },

  // GET A USER
  user: async (_, { id }, { reqUser }) => {
    if (!(await reqUser))
      throw new AuthenticationError("Please login before you can have access");

    const user = await User.findById(id).populate("addedBooks");

    if (!user)
      throw new ApolloError(
        "User is not available or have been deleted",
        "UNAVAILABLE"
      );

    return user;
  },
};
