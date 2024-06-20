import type { IStoreSchema } from "@app/store";
import mongoose from "mongoose";
import { v4 } from "uuid";
import { orderSchema } from "./order";
const Schema = mongoose.Schema;

const storeSchema = new Schema<IStoreSchema>(
  {
    ownerId: { type: Schema.Types.ObjectId, require: true, ref: "Users" },
    appId: { type: Schema.Types.ObjectId, require: true, ref: "App" },
    storeId: { type: String, default: v4, require: true },
    email: { type: String, require: true },
    // account id generated by stripe
    accountId: { type: String, default: "" },
    onBoardingRequired: { type: Boolean, default: true },
    isStripeActive: { type: Boolean, default: false },
    stripeDisabledReason: { type: String },
    currency: { type: String, default: "usd" },
    storeName: { type: String, default: "" },
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    location: { type: String, default: "" },
    location2: { type: String, default: "" },
    hero: { type: String, default: "" },
    isRegistered: { type: Boolean, default: false },
    termsOfService: { type: Boolean, default: false },
    inventory: [{ type: Schema.Types.ObjectId, ref: "Merch" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    orders: [orderSchema],
    completedOrders: [orderSchema],
    inCompleteOrders: [orderSchema],
    pendingOrders: [orderSchema],
  },
  { timestamps: true }
);
const Store = mongoose.model("Store", storeSchema);
export default Store;
