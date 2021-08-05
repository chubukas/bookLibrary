const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = res.authorization.split(" ")[1];

  if (!token) return false;

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const reqUser = await User.findById(decode.id);

  if (!reqUser) return false;

  return reqUser;
};
