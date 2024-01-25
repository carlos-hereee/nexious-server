import type { IMerchSchema } from "@app/store.js";
import mongoose from "mongoose";
import { v4 } from "uuid";
const Schema = mongoose.Schema;

const merchSchema = new Schema<IMerchSchema>(
  {
    storeId: { type: String, require: true },
    // universal id
    uid: { type: String, default: v4 },
    // unique item id
    merchId: { type: String, default: v4 },
    // productId: generated by stripe
    productId: { type: String },
    // priceId: generated by stripe
    priceId: { type: String },
    hero: { type: String, default: "" },
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    inStock: { type: Number, default: 1 },
    cost: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const Merch = mongoose.model("Merch", merchSchema);
export default Merch;
