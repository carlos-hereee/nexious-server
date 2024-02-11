import type { IStoreSchema } from "@app/store";
import mongoose from "mongoose";
import { v4 } from "uuid";
const Schema = mongoose.Schema;

const storeSchema = new Schema<IStoreSchema>(
  {
    ownerId: { type: Schema.Types.ObjectId, require: true, ref: "Users" },
    appId: { type: Schema.Types.ObjectId, require: true, ref: "App" },
    storeId: { type: String, default: v4, require: true },
    email: { type: String, require: true },
    // account id generated by stripe
    accountId: { type: String, default: "" },
    currency: { type: String, default: "usd" },
    name: { type: String, default: "" },
    pageName: { type: String, default: "" },
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    hero: { type: String, default: "" },
    isRegistered: { type: Boolean, default: false },
    termsOfService: { type: Boolean, default: false },
    inventory: [{ type: Schema.Types.ObjectId, ref: "Merch" }],
  },
  { timestamps: true }
);
const Store = mongoose.model("Store", storeSchema);
export default Store;
