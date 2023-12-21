const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4 } = require("uuid");

const storeSchema = new Schema(
  {
    ownerId: { type: String, require: true },
    appId: { type: String, require: true },
    storeId: { type: String, default: v4, require: true, unique: true },
    // account id populated by stripe
    accountId: { type: String },
    name: { type: String, default: "" },
    pageName: { type: String, default: "" },
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    hero: { type: String, default: "" },
    inventory: [{ type: Schema.Types.ObjectId, ref: "Merch" }],
  },
  { timestamps: true }
);
const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
