const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Username is email"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Username is email"],
      select: false,
    },
    avatar: {
      type: String,
    },
    addedBooks: [{ type: String, ref: "Books" }],
  },
  { timestamps: true }
);

// Encrpt the password ad Presave it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);

  const hashed = await bcrypt.hash(this.password, salt);

  this.password = hashed;
  next();
});

// method to check the corect password
userSchema.methods.correctPassword = async function (
  inComingPassword,
  hashedPassword
) {
  return await bcrypt.compare(inComingPassword, hashedPassword);
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
