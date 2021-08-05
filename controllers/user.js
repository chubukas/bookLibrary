const jwt = require("jsonwebtoken");

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
  signUp: async (
    _,
    { inputs: { username, email, password, comfirmPassword } }
  ) => {
    // validate email
    if (!validateEmail(email))
      return { error: true, message: "Please use a valid email" };

    if (password !== comfirmPassword)
      // check if password matches
      return { error: true, message: "The passwords does not match" };

    // sanitaze the username
    const UserName = username.replace(/\s+/g, "").toLowerCase();

    let user = await User.findOne({
      $or: [{ username: UserName }, { email }],
    });

    // check if username and email exist
    if (user && user.username === UserName)
      return { error: true, message: "Username already exist" };
    if (user && user.email === email)
      return { error: true, message: "Email already exist" };

    username = username.replace(/\s+/g, "");
    const avatar = gravatar(email);

    user = await User.create({
      username,
      email,
      password,
      avatar,
    });

    return {
      success: true,
      message: `${user.username}, your registeration is successful. Thank You!!!`,
    };
  },

  signIn: async (_, { UserNameOrEmail, password }) => {
    // sanitaze the username
    const UserNameEmail = UserNameOrEmail.replace(/\s+/g, "").toLowerCase();

    const user = await User.findOne({
      $or: [{ username: UserNameEmail }, { email: UserNameEmail }],
    }).select("+password"); // select expiclity password;

    if (!user) return "Sorry you are not registered in this platform";

    if (!(await user.correctPassword(password, user.password)))
      return "Incorrect password";

    return signToken(user._id);
  },
};
