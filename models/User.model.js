const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    require: true,
    travels: [],
    imageUrl: {
      type: String,
      default: "",
    },
  },

  email: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  passwordHash: {
    type: String,
    required: [true, "Please enter a password"],
  },
});

const User = model("User", userSchema);

module.exports = User;
