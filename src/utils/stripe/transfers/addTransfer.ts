import type { StripeTransferEventParams } from "@app/stripe";
import stripe from "../connection";

export const addTransfer = async ({ transferOptions }: StripeTransferEventParams) => {
  if (!transferOptions) throw Error("transferOptions is required");
  return await stripe.transfers.create(transferOptions);
};
