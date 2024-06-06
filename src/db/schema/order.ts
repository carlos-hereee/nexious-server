import type { IOrderShema } from "@app/store";
import mongoose from "mongoose";
import { v4 } from "uuid";
const Schema = mongoose.Schema;

export const orderSchema = new Schema<IOrderShema>({
  client: {
    email: { type: Schema.Types.String, required: true },
    phone: { type: Schema.Types.String, required: true },
    userId: { type: Schema.Types.String },
    address: { type: Schema.Types.String },
  },
  status: { type: Schema.Types.String, required: true },
  statusReason: { type: Schema.Types.String },
  store: {
    storeId: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String },
    location: { type: Schema.Types.String },
    location2: { type: Schema.Types.String },
  },
  paymentMethod: { type: Schema.Types.String, required: true },
  orderId: { type: Schema.Types.String, default: v4 },
  merch: [
    {
      merchId: { type: Schema.Types.String, required: true },
      quantity: { type: Schema.Types.Number, required: true, min: 1 },
    },
  ],
});
