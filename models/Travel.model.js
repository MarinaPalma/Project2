const { Schema, model } = require("mongoose");

const travelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    countryFlag: {
      type: String,
    },
    city: String,
    month: String,
    year: Number,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    description: String,
    imageUrl: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Travel = model("Travel", travelSchema);

module.exports = Travel;
