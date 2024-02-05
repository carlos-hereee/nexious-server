import type { StripeTransferEventParams } from "@app/stripe";
import stripe from "../connection";

// This request accepts only metadata as an argument.
export const updateTransfer = async ({ updateOptions, id }: StripeTransferEventParams) => {
  // require key varaibles
  if (!id) throw Error("id is required");
  if (!updateOptions) throw Error("updateOptions is required");
  return await stripe.transfers.update(id, updateOptions);
};
