const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    require: true,

  },
  travels: [{type: Schema.Types.ObjectId, ref: "Travel"}],
  imageUrl: {
    type: String,
    default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fhu%2Fsearch%2Fimages%3Fk%3Ddefault%2Bprofile%2Bpicture&psig=AOvVaw3xK-BkapZQRY_3-yRm8GxQ&ust=1652543320992000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJiwu9_p3PcCFQAAAAAdAAAAABAD",
  },
  email: {
    type: String,
    required: [true, "Please enter a username"],
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
