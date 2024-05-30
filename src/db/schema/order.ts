import type { IOrderShema } from "@app/store";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const orderSchema = new Schema<IOrderShema>({
  client: {
    email: { type: Schema.Types.String, required: true },
    phone: { type: Schema.Types.String, required: true },
    userId: { type: Schema.Types.String },
    address: { type: Schema.Types.String },
  },
  status: { type: Schema.Types.String, required: true },
  store: {
    storeId: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String },
    location: { type: Schema.Types.String },
    location2: { type: Schema.Types.String },
  },
  paymentMethod: { type: Schema.Types.String, required: true },
  merch: [
    {
      merchId: { type: Schema.Types.String, required: true },
      quantity: { type: Schema.Types.Number, required: true, min: 1 },
    },
  ],
});
