const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4 } = require("uuid");

const storeSchema = new Schema(
  {
    // userId: { type: Schema.Types.ObjectId, ref: "Users", require: true },
    userId: { type: String, require: true },
    // appId: { type: Schema.Types.ObjectId, ref: "App", require: true },
    appId: { type: String, require: true },
    storeId: { type: String, default: v4 },
    name: { type: String, default: "" },
    pageName: { type: String, default: "" },
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    hero: { type: String, default: "" },
    inventory: [
      {
        hero: { type: String, default: "" },
        name: { type: String, default: "" },
        inStock: { type: Number, default: 1 },
        cost: { type: Number, default: 0 },
        body: { type: String },
        uid: { type: String, default: v4 },
      },
    ],
  },
  { timestamps: true }
);
const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
