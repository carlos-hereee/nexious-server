import type { StripeTransferParams } from "@app/stripe";
import stripe from "../connection";

export const addTransfer = async ({ transferOptions }: StripeTransferParams) => {
  if (!transferOptions) throw Error("transferOptions is required");
  return await stripe.transfers.create(transferOptions);
};
