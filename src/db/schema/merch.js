const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4 } = require("uuid");

const merchSchema = new Schema(
  {
    storeId: { type: String, require: true },
    uid: { type: String, default: v4 },
    merchId: { type: String, default: v4 },
    // productId: populated by stripe's generated id
    productId: { type: String },
    hero: { type: String, default: "" },
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    inStock: { type: Number, default: 1 },
    cost: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const Merch = mongoose.model("Merch", merchSchema);
module.exports = Merch;
