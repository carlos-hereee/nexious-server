import type { IOrderShema } from "@app/store";
import mongoose from "mongoose";
import { v4 } from "uuid";
const Schema = mongoose.Schema;

export const orderSchema = new Schema<IOrderShema>({
  client: {
    email: { type: Schema.Types.String },
    name: { type: Schema.Types.String },
    phone: { type: Schema.Types.String },
    userId: { type: Schema.Types.String },
    address: {
      city: { type: Schema.Types.String },
      country: { type: Schema.Types.String },
      line1: { type: Schema.Types.String },
      line2: { type: Schema.Types.String },
      postal_code: { type: Schema.Types.String },
      state: { type: Schema.Types.String },
    },
  },
  status: { type: Schema.Types.String, default: "pending" },
  statusReason: { type: Schema.Types.String },
  store: {
    storeId: { type: Schema.Types.String },
    email: { type: Schema.Types.String },
    location: { type: Schema.Types.String },
    location2: { type: Schema.Types.String },
  },
  paymentMethod: { type: Schema.Types.String, default: "in-store" },
  orderId: { type: Schema.Types.String, default: v4 },
  merch: [
    {
      paymentStatus: { type: Schema.Types.String, default: "unpaid" },
      productId: { type: Schema.Types.String, default: "" },
      priceId: { type: Schema.Types.String, default: "" },
      merchId: { type: Schema.Types.String, required: true },
      quantity: { type: Schema.Types.Number, required: true, min: 1 },
    },
  ],
});
