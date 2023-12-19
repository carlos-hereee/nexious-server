const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4 } = require("uuid");

const merchSchema = new Schema(
  {
    hero: { type: String, default: "" },
    name: { type: String, default: "" },
    body: { type: String, default: "" },
    storeId: { type: String, require: true },
    uid: { type: String, default: v4 },
    inStock: { type: Number, default: 1 },
    cost: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const Merch = mongoose.model("Merch", merchSchema);
module.exports = Merch;
