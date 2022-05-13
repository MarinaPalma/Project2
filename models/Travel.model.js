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
    description: String,
    ImageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Travel = model("Travel", travelSchema);

module.exports = Travel;
