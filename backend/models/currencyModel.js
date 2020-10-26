const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const currencySchema = mongoose.Schema(
  {
    kod: {
      type: String,
    },
    satıs: {
      type: Number,
      unique: true,
    },
    alıs: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

currencySchema.plugin(uniqueValidator);
const Currency = mongoose.model("Currency", currencySchema);

module.exports = Currency;
