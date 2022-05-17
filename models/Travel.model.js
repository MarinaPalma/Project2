const { Schema, model } = require("mongoose");

const travelSchema = new Schema(
  {
    title: String,
    country: {
      type: String,
      required: true,
    },
    city: String,
    date: {
      type: Date,
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    description: String,
    imageUrl: {
      type: String,
      default:
        "https://s2.glbimg.com/24s5Yp9nxfU5ofQLsrIMOkG7cGg=/0x0:718x897/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/K/Y/t0iivsRlSvBtoASNaOAA/avatar.png",
    },
  },
  {
    timestamps: true,
  }
);

const Travel = model("Travel", travelSchema);

module.exports = Travel;
