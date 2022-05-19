const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "Please enter a username"]

  },
  travels: [{type: Schema.Types.ObjectId, ref: "Travel"}],
  imageUrl: {
    type: String,
    default: "/images/mystery.jpg",
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    // unique: true,
    trim: true,
    lowercase: true,
    // match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  passwordHash: {
    type: String,
    required: [true, "Please enter a password"],
  },
});

const User = model("User", userSchema);

module.exports = User;
