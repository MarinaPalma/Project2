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
    default: "https://s2.glbimg.com/24s5Yp9nxfU5ofQLsrIMOkG7cGg=/0x0:718x897/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/K/Y/t0iivsRlSvBtoASNaOAA/avatar.png",
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
