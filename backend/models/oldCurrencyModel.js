const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const oldCurrencySchema = mongoose.Schema(
  {
    kod: {
      type: String,
    },
    eski: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

oldCurrencySchema.plugin(uniqueValidator);
const oldCurrency = mongoose.model("oldCurrency", oldCurrencySchema);

module.exports = oldCurrency;
