const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4 } = require("uuid");

const storeSchema = new Schema(
  {
    pageId: { type: Schema.Types.ObjectId, ref: "Pages", require: true },
    // userId: { type: Schema.Types.ObjectId, ref: "Users", require: true },
    userId: { type: String, require: true },
    // appId: { type: Schema.Types.ObjectId, ref: "App", require: true },
    appId: { type: String, require: true },
    storeId: { type: String, default: v4 },
    merchendise: [
      {
        hero: { type: String, default: "" },
        name: { type: String, default: "" },
        quantity: { type: Number, default: 0 },
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