import type { StripeTransferEventParams } from "@app/stripe";
import stripe from "../connection";

export const getTransfer = async ({ id, listLimit }: StripeTransferEventParams) => {
  if (!id) return await stripe.transfers.list({ limit: listLimit || 30 });
  return await stripe.transfers.retrieve(id);
};
